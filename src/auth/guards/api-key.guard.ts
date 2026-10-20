import {  CanActivate,  ExecutionContext,  Injectable,  UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { timingSafeEqual } from 'node:crypto';
import type { Request } from 'express';
import { Role } from '../../generated/prisma/enums.js';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';
import type { AuthPrincipal } from '../interfaces/principal.interface.js';

//GUARD PARA IDENTIFICAR AUTENTICACION
@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly keys: ReadonlyMap<string, Role>;

  constructor(private readonly reflector: Reflector) {
    const entries: Array<[string | undefined, Role]> = [
      [process.env.API_KEY_GESTOR, Role.gestor],
      [process.env.API_KEY_USUARIO, Role.usuario],
    ];

    this.keys = new Map(
      entries.filter((entry): entry is [string, Role] => Boolean(entry[0])),
    );
  }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers['x-api-key'];
    const provided = Array.isArray(header) ? header[0] : header;
    const role = provided ? this.resolveRole(provided) : undefined;

    if (!role) {
      throw new UnauthorizedException('API key ausente o inválida');
    }

    (request as Request & { user: AuthPrincipal }).user = {
      role,
      authenticator: 'api-key',
    };

    return true;
  }

  private resolveRole(provided: string): Role | undefined {
    const providedBuffer = Buffer.from(provided);
    let matched: Role | undefined;

    for (const [key, role] of this.keys) {
      const keyBuffer = Buffer.from(key);

      if (
        keyBuffer.length === providedBuffer.length &&
        timingSafeEqual(keyBuffer, providedBuffer)
      ) {
        matched = role;
      }
    }

    return matched;
  }
}
