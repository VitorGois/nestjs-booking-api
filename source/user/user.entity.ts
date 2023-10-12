import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity()
@Unique([ 'email' ])
@Unique([ 'tax_id' ])
export class User {

  @PrimaryGeneratedColumn('uuid')
  public id: string = uuidV4();

  @Column()
  public name!: string;

  @Column({ unique: true })
  public email!: string;

  @Column({ unique: true })
  public tax_id!: string;

  @Column()
  public phone!: string;

  @Column({ type: 'timestamp' })
  public birthdate!: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Date;

}
