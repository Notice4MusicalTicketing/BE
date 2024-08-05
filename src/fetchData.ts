import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;

export async function fetchData() {
    try {
        console.log('Starting API request...');
        const response = await axios.get('http://www.kopis.or.kr/openApi/restful/pblprfr', {
            params: {
                service: apiKey,
                stdate: '20241001', // 시작 날짜를 2024년 3월 1일로 설정
                eddate: '20250320', // 종료 날짜를 2024년 7월 20일로 설정
                cpage: 1,
                rows: 6,

                shcate: 'GGGA', // 장르 코드 (뮤지컬)
                signgucode: '11', // 서울특별시 코드
                prfstate: '01' // 공연 상태 (01: 공연 예정)
                
            },
        });

        const xml = response.data;
        console.log('Fetched XML Data:', xml);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
