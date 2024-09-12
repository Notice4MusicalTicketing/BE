import axios from 'axios';
// import * as dotenv from 'dotenv';
//
// dotenv.config();

console.log("API Key:", process.env.API_KEY); // API 키가 제대로 출력되는지 확인

export async function fetchData(
    startDate: string,
    endDate: string,
    genre: string,
    region: string,
    status: string
): Promise<string> {
    const API_URL = 'http://kopis.or.kr/openApi/restful/pblprfr';

    try {
        const response = await axios.get(API_URL, {
            params: {
                service: process.env.API_KEY,
                stdate: startDate, // 시작 날짜 (YYYYMMDD)
                eddate: endDate, // 종료 날짜 (YYYYMMDD)
                cpage: 1, // 페이지 번호
                rows: 100, // 페이지당 항목 수
                genre: genre, // 장르 (필요 시 매핑)
                region: region, // 지역 (필요 시 매핑)
                prfstate: status, // 공연 상태 (진행 중, 종료 등)
            }
        });

        //console.log(response);
        console.log('fetchData.ts')
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
