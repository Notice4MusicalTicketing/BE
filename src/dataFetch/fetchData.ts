// fetchData.ts
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv'; // 추가
dotenv.config(); // 추가

const apiKey = process.env.API_KEY; // .env 파일에서 API_KEY를 가져옴

export async function fetchData(startDate: string, endDate: string, genre: string, region: string, status: string): Promise<string> {
    const API_URL = 'http://kopis.or.kr/openApi/restful/pblprfr';
    try {
        const response = await axios.get(API_URL, {
            params: {
                service: process.env.API_KEY,
                stdate: startDate, 
                eddate: endDate, 
                cpage: 1, 
                rows: 100, 
                genre: genre, 
                region: region,
                prfstate: status, 
            }
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function fetchDetailData(mt20id: string) {
    try {
        const params = {
            service: apiKey,
            id: mt20id,
        };

        const url = `http://www.kopis.or.kr/openApi/restful/pblprfr/${mt20id}?service=${apiKey}`;
        const response = await axios.get(url);
        //console.log(url);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching detail data:', error);
        throw error;
    }
}

