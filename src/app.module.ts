import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://thiag0coelho:kec7Q66Z3vyEfEg@7180-ou3jv.azure.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
