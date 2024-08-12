// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notice4MusicalTicketing',
            version: '1.0.0',
            description: 'API documentation for Notice4MusicalTicketing',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: [
        './src/**/routes/*.ts',
        './src/**/controllers/*.ts',
        './src/**/dtos/*.ts',
        './src/**/entities/*.ts',
        './src/index.ts'  // Swagger 주석이 포함된 파일 경로
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
