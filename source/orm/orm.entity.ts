import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class OrmTimestampEntity {

  @Index()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

}

export abstract class OrmUuidEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

}

export abstract class OrmUuidTimestampEntity extends OrmTimestampEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

}
