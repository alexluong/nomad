import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { environment } from './environment/environment';
import { ValidationPipe } from './shared/pipes/validation.pipe';

const port = process.env.PORT || environment.express.port;

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    const swaggerOptions = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Api Documentation')
        .setVersion('1.0.0')
        .addTag('System', 'System/Authentication APIs')
        .setBasePath('/api')
        .setSchemes('http', 'https')
        .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('/api/docs', app, swaggerDoc);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);
}

bootstrap();
