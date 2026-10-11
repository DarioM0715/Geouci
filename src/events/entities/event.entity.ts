import { ApiProperty } from "@nestjs/swagger"

export class Event {
    @ApiProperty({ description: 'The unique identifier of the event' })
    id: number;
    @ApiProperty({ description: 'The name of the event' })
    name: string;
    @ApiProperty({ description: 'The description of the event' })
    description: string;
    @ApiProperty({ description: 'The start date of the event' })
    start_date: Date;
    @ApiProperty({ description: 'The end date of the event' })
    end_date: Date;
    @ApiProperty({ description: 'The category of the event' })
    category: string;
    @ApiProperty({ description: 'Indicates if the event is official' })
    its_official: boolean;
}
