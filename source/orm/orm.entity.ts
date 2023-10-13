import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class OrmTimestampEntity {

  @Index()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;

}

export abstract class OrmUuidEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

}

export abstract class OrmUuidTimestampEntity extends OrmTimestampEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

}
