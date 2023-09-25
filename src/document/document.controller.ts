import { Body, Controller, Post, Res, Get } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentCreateDTO } from "./dto/document-create.dto";
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class DocumentController
{
    constructor(
        private readonly documentService: DocumentService
    ) {}
    
    // note to self: ran when doc is submitted to firestore
    // for our purposes, this is raw json data from insomnia
    @Post()
    create(
        @Body()
        documentCreateDTO: DocumentCreateDTO
    )
    {
        this.documentService.create(documentCreateDTO);
    }

    @Get()
    getHello(
      @Res()
      response: Response
      
    ) {
      const file = createReadStream(join(process.cwd(), 'test_output.pdf'));
  
      file.pipe(response);
    }
}