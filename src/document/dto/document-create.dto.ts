import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { ClientInformationDTO } from "./client-information.dto";
import { TransactionDTO } from "./transaction.dto";
import { Type } from 'class-transformer';


export class DocumentCreateDTO
{
    @ValidateNested()
    @Type(() => ClientInformationDTO)
    client_information: ClientInformationDTO;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Array<TransactionDTO>)
    transactions:       TransactionDTO[];
}
