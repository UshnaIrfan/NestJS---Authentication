import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const port = process.env.PORT || 3030;
import * as bodyParser from 'body-parser';
import { urlencoded, json } from 'express';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().addBearerAuth()
    .setTitle('My app')
    .setDescription('My app API description')
    .setVersion('1.0')
    .addTag('Tags')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
   const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('api', app, document);

   app.use(bodyParser.json({limit: '50mb'}));
   app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
   app.enableCors();

   await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}
bootstrap();
