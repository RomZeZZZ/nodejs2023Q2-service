import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
import { TrackEntity } from "./Track";
import { AlbumEntity } from "./Albums";
import { FavArtistsEntity } from "./favEntity/FavArtistsEntity";

@Entity()
export class ArtistEntity {
    @PrimaryColumn("uuid")
    id: string
    
    @Column()
    name: string

    @Column()
    grammy: boolean
}