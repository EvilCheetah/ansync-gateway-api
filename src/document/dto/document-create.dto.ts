import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { ClientInformationDTO } from "./client-information.dto";
import { TransactionDTO } from "./transaction.dto";
import { Type } from 'class-transformer';


export class DocumentCreateDTO
{
    @IsObject()
    @ValidateNested()
    @Type(() => ClientInformationDTO)
    client_information: ClientInformationDTO;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => TransactionDTO)
    transactions:       TransactionDTO[];
}
