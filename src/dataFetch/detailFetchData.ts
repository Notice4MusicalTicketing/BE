// detailFetchData.ts
import axios from 'axios';
import qs from 'qs';

const apiKey = process.env.API_KEY;

export async function fetchDetailData(mt20id: string) {
    try {
        const params = {
            service: apiKey,
            id: mt20id,
        };

        const url = `http://www.kopis.or.kr/openApi/restful/pblprfr/${mt20id}?${qs.stringify(params)}`;
        console.log('Request URL:', url);

        const response = await axios.get(url);
        const xml = response.data;
        console.log('Fetched Detail XML Data:', xml);

        return xml;
    } catch (error) {
        console.error('Error fetching detail data:', error);
        throw error;
    }
}
