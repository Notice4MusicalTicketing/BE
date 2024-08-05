// src/services/fetchAndStoreData.ts

import { fetchData } from './fetchData';
import { storeData } from './storeData';

export async function fetchAndStoreData() {
    try {
        // OpenAPI로부터 데이터를 가져옵니다.
        const data = await fetchData();
        
        // 데이터를 데이터베이스에 저장합니다.
        await storeData(data);
        
        console.log('Data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching and storing data:', error);
    }
}
