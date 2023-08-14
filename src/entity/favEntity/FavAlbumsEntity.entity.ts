import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AlbumEntity } from '../Albums.entity';

@Entity()
export class FavAlbumsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  albumId: string;

  @OneToOne(() => AlbumEntity, (albumEntity) => albumEntity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;
}
