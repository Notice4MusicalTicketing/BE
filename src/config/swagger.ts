import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notice4MusicalTicketing',
            version: '1.0.0',
            description: 'Description of API',
        },
    },
    apis: [
        './src/**/routes/*.ts',
        './src/**/controllers/*.ts',
        './src/**/dtos/*.ts',
        './src/**/entities/*.ts'
    ],
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],
};



const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;