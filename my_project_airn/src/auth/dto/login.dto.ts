import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@tech.test' })
  email: string;

  @ApiProperty({
    example: 'Prueba1234!',
    format: 'password',
  })
  password: string;
}