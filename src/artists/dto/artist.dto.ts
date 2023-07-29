import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
export class ArtistReq {
    @IsNotEmpty()    
    name: string;
    @IsNotEmpty()
    grammy: boolean;
}
export class UpdateArtistDto {
    @IsNotEmpty()
    @IsString()    
    name: string; 
    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean; 
}
