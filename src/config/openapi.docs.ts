import YAML from "yamljs";

const authDocument = YAML.load('./src/docs/auth.docs.yaml');
const postDocument = YAML.load('./src/docs/post.docs.yaml');
const commentDocument = YAML.load('./src/docs/comment.docs.yaml');
const dataFetchDocument = YAML.load('./src/docs/dataFetch.docs.yaml');  // 새로 추가된 부분
const reviewDocument = YAML.load('./src/docs/review.docs.yaml');

const securitySchemes = {
    ...(authDocument.components?.securitySchemes || {}),
    ...(postDocument.components?.securitySchemes || {}),
    ...(commentDocument.components?.securitySchemes || {}),
    ...(reviewDocument.components?.securitySchemes || {}),
};
const swaggerDocument = {
    ...authDocument,  // auth 문서를 기본으로 설정
    paths: {
        ...authDocument.paths,
        ...postDocument.paths,
        ...commentDocument.paths,
        ...dataFetchDocument.paths,   // Data Fetch 경로 추가
        ...reviewDocument.paths,
    },
    components: {
        ...authDocument.components,
        ...postDocument.components,
        ...commentDocument.components,
        ...reviewDocument.components,
        securitySchemes,  // Include merged security schemes here
    },
    tags: [
        ...authDocument.tags,
        ...postDocument.tags,
        ...commentDocument.tags,
        ...(dataFetchDocument.tags || []),  // Data Fetch 태그 추가
        ...reviewDocument.tags,
    ],
    security: [
        {
            apiKeyAuth: [],
        },
    ], // Apply security globally
};

export default swaggerDocument;