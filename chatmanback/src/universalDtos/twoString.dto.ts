import { ApiProperty } from '@nestjs/swagger';

export class TwoStringDto {
  @ApiProperty()
  firstString: string;
  @ApiProperty()
  secondString: string;
}
