import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule, Routes } from 'nest-router';
import { ActiveModule } from './active/active.module';
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
            },
            {
                path: '/',
                module: ActiveModule
            }
        ]
    }
];

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        MongooseModule.forRoot(process.env.MONGO_URI || environment.mongoConnectionString),
        AuthModule,
        UserModule,
        ActiveModule
    ],
    controllers: [],
    components: [],
})
export class ApplicationModule {
}
