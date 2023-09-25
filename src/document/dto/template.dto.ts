import { IsString } from "class-validator";


export class TemplateDTO
{
    @IsString()
    template_name: string; 
}
