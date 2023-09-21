import { Injectable, Logger } from "@nestjs/common";
import { EmailService } from "src/notification/email/email.service";
import { DocumentCreateDTO } from "./dto/document-create.dto";


@Injectable()
export class DocumentService
{
    private readonly logger = new Logger(DocumentService.name);


    constructor(
        private readonly emailService: EmailService
    ) {}


    create(documentCreateDTO: DocumentCreateDTO)
    {
        this.logger.debug(documentCreateDTO);

        this.logger.debug(`Generating the document...`);
        this.logger.debug(`Saving the document...`);
        this.logger.debug(`Sending an email...`);

        this.emailService.send_document(`FILE_URI`);
    }
}