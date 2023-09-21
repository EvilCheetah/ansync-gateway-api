import { Injectable, Logger } from "@nestjs/common";


@Injectable()
export class EmailService
{
    private readonly logger = new Logger(EmailService.name);


    send_document(document_uri: string)
    {
        this.logger.debug(`Retreiving the document...`);
        this.logger.debug(`Structuring an email...`)
        this.logger.debug(`Sending document with ${document_uri}...`)
    }
}