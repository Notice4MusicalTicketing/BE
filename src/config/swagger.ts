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
                description: 'Local server'
            },
            {
                url: 'http://ec2-52-78-180-65.ap-northeast-2.compute.amazonaws.com:3000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'JWT token without Bearer prefix',
                },
            },
        },
        security: [
            {
                apiKeyAuth: [],
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
