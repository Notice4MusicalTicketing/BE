import YAML from "yamljs";

const authDocument = YAML.load('./src/docs/auth.docs.yaml');
const postDocument = YAML.load('./src/docs/post.docs.yaml');
const securitySchemes = {
    ...(authDocument.components?.securitySchemes || {}),
    ...(postDocument.components?.securitySchemes || {})
};
const swaggerDocument = {
    ...authDocument,
    paths: {
        ...authDocument.paths,
        ...postDocument.paths,
    },
    components: {
        ...authDocument.components,
        ...postDocument.components,
        securitySchemes,  // Include merged security schemes here
    },
    tags: [
        ...authDocument.tags,
        ...postDocument.tags,
    ],
    security: [
        {
            apiKeyAuth: [],
        },
    ], // Apply security globally
};

export default swaggerDocument;