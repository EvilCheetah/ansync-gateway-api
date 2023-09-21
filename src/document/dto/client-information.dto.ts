import { IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

import { NameDTO } from "./name.dto";
import { AddressDTO } from "./address.dto";


export class ClientInformationDTO
{
    @IsObject()
    @ValidateNested()
    @Type(() => NameDTO)
    name:    NameDTO;

    @IsObject()
    @ValidateNested()
    @Type(() => AddressDTO)
    address: AddressDTO
}
