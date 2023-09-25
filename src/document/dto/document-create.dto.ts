import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { TemplateDTO } from "./template.dto";
import { ClientInformationDTO } from "./client-information.dto";
import { TransactionDTO } from "./transaction.dto";
import { Type } from 'class-transformer';


export class DocumentCreateDTO
{
    @IsString()
    @Type(() => TemplateDTO)
    template_name:    TemplateDTO;

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
