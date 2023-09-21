import { IsPostalCode, IsString } from "class-validator";


export class AddressDTO
{
    @IsString()
    address_line_1: string;

    @IsString()
    address_line_2: string;

    @IsString()
    city:           string;

    @IsString()
    state:          string;

    @IsPostalCode()
    postal_code:    string;
}
