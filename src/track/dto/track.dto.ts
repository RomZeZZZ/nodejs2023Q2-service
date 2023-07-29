import { IsNotEmpty } from "class-validator";
export class TrackReq {
    @IsNotEmpty()    
    name: string; 
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    @IsNotEmpty()
    duration: number; // integer number
}
export class UpdateTrackDto {
    @IsNotEmpty()    
    name: string; 
    @IsNotEmpty()
    duration: number; 
}
