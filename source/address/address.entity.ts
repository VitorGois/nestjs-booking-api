import { Column, Entity } from 'typeorm';

import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Address extends OrmUuidTimestampEntity {

  @Column({ type: 'varchar', length: 255 })
  public street: string;

  @Column({ type: 'int2', nullable: true })
  public number: number;

  @Column({ type: 'varchar', length: 255 })
  public district: string;

  @Column({ type: 'varchar', length: 255 })
  public city: string;

  @Column({ type: 'varchar', length: 255 })
  public state: string;

  @Column({ type: 'varchar', length: 8 })
  public zipcode: string;

}
