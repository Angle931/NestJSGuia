import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'nuevo@tech.test' })
  email: string;

  @ApiPropertyOptional({ example: 'Usuario de prueba' })
  name?: string;

  @ApiProperty({ example: 'Prueba1234!', format: 'password' })
  password: string;

  @ApiPropertyOptional({ example: '88887777' })
  telephone?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de un tenant existente',
  })
  tenantId: number;
}