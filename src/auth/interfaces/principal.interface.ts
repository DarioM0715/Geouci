import { Role } from '../../generated/prisma/enums.js';

export interface AuthPrincipal {
  role: Role;
  authenticator: 'api-key';
}
