import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TrackEntity } from '../Track.entity';

@Entity()
export class FavTracksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trackId: string;

  @OneToOne(() => TrackEntity, (trackEntity) => trackEntity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId', referencedColumnName: 'id' })
  track: TrackEntity;
}
