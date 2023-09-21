import { Module } from '@nestjs/common';

import { EmailModule } from 'src/notification/email/email.module';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';


@Module({
    imports:     [EmailModule],
    controllers: [DocumentController],
    providers:   [DocumentService]
})
export class DocumentModule {}
