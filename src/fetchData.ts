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
                stdate: '20240601', // 시작 날짜를 2024년 6월 1일로 설정
                eddate: '20240630', // 종료 날짜를 2024년 6월 30일로 설정
                cpage: 1,
                rows: 5,
                prfstate: '02',
                signgucode: '11',
                signgucodesub: '1111',
                kidstate: 'Y',
                newsql: 'Y',
            },
        });

        const xml = response.data;
        console.log('Fetched XML Data:', xml);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
