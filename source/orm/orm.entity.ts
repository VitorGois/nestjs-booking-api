import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsISO8601, IsUUID } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class OrmTimestampEntity {

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

}

export class OrmUuidEntity {

  @ApiProperty({ example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096' })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

}

export class OrmUuidTimestampEntity extends IntersectionType(OrmTimestampEntity, OrmUuidEntity) {

  @ApiProperty({ example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096' })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

}
