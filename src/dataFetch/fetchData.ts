// fetchData.ts
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv'; 
dotenv.config(); 

const apiKey = process.env.API_KEY; // .env 파일에서 API_KEY를 가져옴

export async function fetchData(startDate: string, endDate: string, genre: string, region: string, status: string): Promise<string> {
    
    try {
        const params = {
                service: process.env.API_KEY,
                stdate: '20240910',
                eddate: '20241010', 
                cpage: 1, 
                rows: 100, 
                genre: 'GGGA', 
                region: '11',
                prfstate: '01', 
        };
        const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${apiKey}&stdate=20240910&eddate=20241010&cpage=1&rows=100&prfstate=01&signgucode=11&shcate=GGGA`;

        const response = await axios.get(url);
        
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
       // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching detail data:', error);
        throw error;
    }
}


 export async function fetchAgencyData(shcate: string) {
    try {
        const params = {
            service: apiKey,
            shcate:'GGGA'
        };

        const url = `http://www.kopis.or.kr/openApi/restful/mnfct?service=${apiKey}&shcate=GGGA`;
        const response = await axios.get(url);

        //console.log(url);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching agency data:', error);
        throw error;
    }
}

