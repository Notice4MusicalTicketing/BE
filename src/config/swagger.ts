import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notice4MusicalTicketing',
            version: '1.0.0',
            description: '야호 ^_^',
        },
    },
    apis: [
        './src/**/routes/*.ts',
        './src/**/controllers/*.ts',
        './src/**/dtos/*.ts',
        './src/**/entities/*.ts'
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;