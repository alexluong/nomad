import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtMiddleware } from '../auth/middleware/jwt.middleware';
import { ActiveController } from './active.controller';
import { ActiveRepository } from './active.repository';
import { ActiveService } from './active.service';
import { ActiveSchema } from './schemas/active.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Active', schema: ActiveSchema}])],
    controllers: [ActiveController],
    components: [ActiveRepository, ActiveService]
})
export class ActiveModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({
            path: '/api/lists/create', method: RequestMethod.POST
        });
    }
}