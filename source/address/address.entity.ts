import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsUUID } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Address extends OrmUuidTimestampEntity {

  @ApiProperty({ example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096' })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @IsISO8601()
  @Index()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt!: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @IsISO8601()
  @Index()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt!: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', nullable: true })
  @IsISO8601()
  @Index()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;

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
