import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://thiag0coelho:kec7Q66Z3vyEfEg@7180-ou3jv.azure.mongodb.net/test?retryWrites=true&w=majority'),
    BackofficeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
