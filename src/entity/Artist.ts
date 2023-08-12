import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class ArtistEntity {
    @PrimaryColumn("uuid")
    id: string
    
    @Column()
    name: string

    @Column()
    grammy: boolean
}