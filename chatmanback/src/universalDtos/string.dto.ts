import { ApiProperty } from '@nestjs/swagger';

export class StringDto {
  @ApiProperty()
  text: string;
}
