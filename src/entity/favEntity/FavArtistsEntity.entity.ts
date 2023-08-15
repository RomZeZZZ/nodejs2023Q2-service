import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ArtistEntity } from '../Artist.entity';

@Entity()
export class FavArtistsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  artistId: string;

  @OneToOne(() => ArtistEntity, (artistEntity) => artistEntity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
