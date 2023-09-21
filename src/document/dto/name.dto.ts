import { IsString } from "class-validator";


export class NameDTO
{
    @IsString()
    first_name: string;

    @IsString()
    last_name:  string;
}
