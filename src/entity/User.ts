import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class UserEntity {
    @PrimaryColumn("uuid")
    id: string

    @Column()
    login: string

    @Column()
    password: string

    @Column()
    version: number

    @Column("bigint")
    createdAt: number

    @Column("bigint")
    updatedAt: number
}
