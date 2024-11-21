"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma.service");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.App1Module);
    const prismaService = app.get(prisma_service_1.PrismaService);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await prismaService.enableShutdownHooks(app);
    await app.listen(15001);
}
bootstrap();
//# sourceMappingURL=main.js.map