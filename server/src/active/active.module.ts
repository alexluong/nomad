import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActiveController } from './active.controller';
import { ActiveRepository } from './active.repository';
import { ActiveService } from './active.service';
import { ActiveSchema } from './schemas/active.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Active', schema: ActiveSchema}])],
    controllers: [ActiveController],
    components: [ActiveRepository, ActiveService]
})
export class ActiveModule {

}