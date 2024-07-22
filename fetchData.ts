import axios from 'axios';
import { parseString } from 'xml2js';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;

async function fetchData(): Promise<void> {
    try {
        const response = await axios.get('https://www.kopis.or.kr/openApi/restful/pblprfr', {
            params: {
                key: apiKey,
            },
        });

        const xml = response.data;

        parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                throw err;
            }

            const json = JSON.stringify(result, null, 4);
            console.log(json);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
