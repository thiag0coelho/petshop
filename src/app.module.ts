import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://thiag0coelho:kec7Q66Z3vyEfEg@7180-ou3jv.azure.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
