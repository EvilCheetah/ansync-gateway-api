import { ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

import { NameDTO } from "./name.dto";
import { AddressDTO } from "./address.dto";


export class ClientInformationDTO
{
    @ValidateNested()
    @Type(() => NameDTO)
    name:    NameDTO;

    @ValidateNested()
    @Type(() => AddressDTO)
    address: AddressDTO
}
