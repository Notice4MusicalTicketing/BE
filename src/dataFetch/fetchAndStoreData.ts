import { fetchData } from './fetchData';
import { storeData } from './storeData';

export async function fetchAndStoreData(startDate: string, endDate: string, genre: string, region: string, status: string) {
    try {
        // OpenAPI로부터 데이터를 가져옵니다.
        const data = await fetchData(startDate, endDate, genre, region, status);
        
        // 데이터를 데이터베이스에 저장합니다.
        await storeData(data);
        console.log('Data fetched and stored successfully_fetchASD');
    } catch (error) {
        console.error('Error fetching and storing data:', error);
    }
}