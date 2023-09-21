import { Module } from '@nestjs/common';

import { DocumentModule } from './document/document.module';
import { NotificationModule } from './notification/notification.module';


@Module({
    imports: [
        DocumentModule,
        NotificationModule,
    ],
})
export class AppModule {}
