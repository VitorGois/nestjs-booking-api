import { Column, Entity, Unique } from 'typeorm';

import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
@Unique([ 'email' ])
@Unique([ 'tax_id' ])
export class User extends OrmUuidTimestampEntity {

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public email!: string;

  @Column({
    type: 'varchar',
    length: 14,
    unique: true,
  })
  public tax_id!: string;

  @Column({ type: 'varchar', length: 11 })
  public phone!: string;

  @Column({ type: 'timestamp' })
  public birthdate!: Date;

}
