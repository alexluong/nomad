import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule, Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { environment } from './environment/environment';
import { UserModule } from './user/user.module';

const routes: Routes = [
    {
        path: '/api',
        children: [
            {
                path: '/',
                module: UserModule
            }
        ]
    }
];

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        MongooseModule.forRoot(process.env.MONGO_URI || environment.mongoConnectionString),
        AuthModule,
        UserModule
    ],
    controllers: [],
    components: [],
})
export class ApplicationModule {
}
