import YAML from "yamljs";

// 각 YAML 문서를 로드합니다.
const authDocument = YAML.load('./src/docs/auth.docs.yaml');
const postDocument = YAML.load('./src/docs/post.docs.yaml');
const commentDocument = YAML.load('./src/docs/comment.docs.yaml');
const dataFetchDocument = YAML.load('./src/docs/dataFetch.docs.yaml');  // 새로 추가된 부분

// 보안 스키마 통합 (각 문서에서 존재하는 보안 스키마를 병합)
const securitySchemes = {
    ...(authDocument.components?.securitySchemes || {}),
    ...(postDocument.components?.securitySchemes || {}),
    ...(commentDocument.components?.securitySchemes || {}),
};

// Swagger 문서를 구성합니다.
const swaggerDocument = {
    ...authDocument,  // auth 문서를 기본으로 설정
    paths: {
        ...authDocument.paths,        // auth 문서 경로
        ...postDocument.paths,        // post 문서 경로
        ...commentDocument.paths,     // comment 문서 경로
        ...dataFetchDocument.paths,   // 새로 추가된 dataFetch 문서 경로
    },
    components: {
        ...authDocument.components,   // auth 문서의 구성 요소
        ...postDocument.components,   // post 문서의 구성 요소
        ...commentDocument.components,// comment 문서의 구성 요소
        securitySchemes,              // 통합된 보안 스키마
    },
    tags: [
        ...authDocument.tags,         // auth 문서의 태그
        ...postDocument.tags,         // post 문서의 태그
        ...commentDocument.tags,      // comment 문서의 태그
        ...dataFetchDocument.tags,    // 새로 추가된 dataFetch 문서의 태그
    ],
    security: [
        {
            apiKeyAuth: [],           // 모든 경로에 보안 적용 (예: apiKeyAuth)
        },
    ], // 글로벌 보안 설정
};

export default swaggerDocument;
