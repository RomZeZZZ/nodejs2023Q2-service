import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column('bigint', {
    transformer: { from: (value) => parseInt(value), to: (value) => value },
  })
  createdAt: number;

  @Column('bigint', {
    transformer: { from: (value) => parseInt(value), to: (value) => value },
  })
  updatedAt: number;
}
