import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ArtistEntity } from './Artist.entity';
import { AlbumEntity } from './Albums.entity';

@Entity()
export class TrackEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;
  @ManyToOne(() => AlbumEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;
}
