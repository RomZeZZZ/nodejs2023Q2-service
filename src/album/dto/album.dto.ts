import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class AlbumReq {
    @IsNotEmpty()
    @IsString()    
    name: string;
    @IsNotEmpty()
    @IsNumber()
    year: number;
    artistId: string | null;
}
export class UpdateAlbumDto {
    @IsNotEmpty()
    @IsString()    
    name: string;
    @IsNotEmpty()
    @IsNumber()
    year: number;
    artistId: string | null;
}
