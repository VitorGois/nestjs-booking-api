import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Address extends OrmUuidTimestampEntity {

  @ApiProperty({
    type: String,
    example: 'Rodovia Senador José Ermírio de Moraes - Castelinho km 1,5',
    description: 'Address street.',
  })
  @Column({ type: 'varchar', length: 255 })
  public street: string;

  @ApiProperty({
    type: Number,
    example: 1425,
    description: 'Address number.',
  })
  @Column({ type: 'int2', nullable: true })
  public number: number;

  @ApiProperty({
    type: String,
    example: 'Alto da Boa Vista',
    description: 'Address district.',
  })
  @Column({ type: 'varchar', length: 255 })
  public district: string;

  @ApiProperty({
    type: String,
    example: 'Sorocaba',
    description: 'Address city.',
  })
  @Column({ type: 'varchar', length: 255 })
  public city: string;

  @ApiProperty({
    type: String,
    example: 'São Paulo',
    description: 'Address state.',
  })
  @Column({ type: 'varchar', length: 255 })
  public state: string;

  @ApiProperty({
    type: String,
    example: '18087125',
    description: 'Address zipcode.',
  })
  @Column({ type: 'varchar', length: 8 })
  public zipcode: string;

}
