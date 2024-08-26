import YAML from "yamljs";

const authDocument = YAML.load('./src/docs/auth.docs.yaml');
const postDocument = YAML.load('./src/docs/post.docs.yaml');
const commentDocument = YAML.load('./src/docs/comment.docs.yaml');

const securitySchemes = {
    ...(authDocument.components?.securitySchemes || {}),
    ...(postDocument.components?.securitySchemes || {}),
    ...(commentDocument.components?.securitySchemes || {}),
};
const swaggerDocument = {
    ...authDocument,
    paths: {
        ...authDocument.paths,
        ...postDocument.paths,
        ...commentDocument.paths,
    },
    components: {
        ...authDocument.components,
        ...postDocument.components,
        ...commentDocument.components,
        securitySchemes,  // Include merged security schemes here
    },
    tags: [
        ...authDocument.tags,
        ...postDocument.tags,
        ...commentDocument.tags,
    ],
    security: [
        {
            apiKeyAuth: [],
        },
    ], // Apply security globally
};

export default swaggerDocument;