import { IsArray, IsObject, ValidateNested } from "class-validator";
import { ClientInformationDTO } from "./client-information.dto";
import { TransactionDTO } from "./transaction.dto";
import { Type } from 'class-transformer';


export class DocumentCreateDTO
{
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ClientInformationDTO)
    client_information: ClientInformationDTO;

    @IsArray()
    @ValidateNested()
    @Type(() => Array<TransactionDTO> )
    transactions:       TransactionDTO[];
}
