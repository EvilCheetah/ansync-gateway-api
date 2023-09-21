import { Body, Controller, Post } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentCreateDTO } from "./dto/document-create.dto";


@Controller()
export class DocumentController
{
    constructor(
        private readonly documentService: DocumentService
    ) {}

    @Post()
    create(
        @Body()
        documentCreateDTO: DocumentCreateDTO
    )
    {
        return this.documentService.create(documentCreateDTO);
    }
}