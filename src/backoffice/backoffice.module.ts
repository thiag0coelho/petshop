import { Module } from '@nestjs/common';
import { CustomerController } from './Controllers/customer.controller';

@Module({
    controllers:[CustomerController]
})
export class BackofficeModule {}
