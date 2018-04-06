import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtMiddleware } from '../auth/middleware/jwt.middleware';
import { UserModule } from '../user/user.module';
import { ActiveController } from './active.controller';
import { ActiveRepository } from './active.repository';
import { ActiveService } from './active.service';
import { ActiveSchema } from './schemas/active.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Active', schema: ActiveSchema}]), UserModule],
    controllers: [ActiveController],
    components: [ActiveRepository, ActiveService]
})
export class ActiveModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(
            {path: '/api/lists/create', method: RequestMethod.GET},
            {path: 'api/lists/update', method: RequestMethod.GET},
            {path: 'api/lists/ignoreList', method: RequestMethod.GET},
            {path: 'api/lists/current', method: RequestMethod.GET}
        );
    }
}