import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ArtistEntity } from './Artist.entity';

@Entity()
export class AlbumEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
