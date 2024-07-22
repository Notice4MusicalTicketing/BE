import axios from 'axios';
import { parseString } from 'xml2js';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

async function fetchData(): Promise<void> {
    try {
        const response = await axios.get('https://api.example.com/data', {
            params: {
                key: apiKey,
            },
        });

        const xml = response.data;

        parseString(xml, { explicitArray: false }, async (err, result) => {
            if (err) {
                throw err;
            }

            const data = result;
            await storeData(data);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function storeData(data: any): Promise<void> {
    const connection = await mysql.createConnection(dbConfig);

    const query = 'INSERT INTO your_table_name (field1, field2) VALUES (?, ?)';
    const values = [data.field1, data.field2];

    try {
        await connection.execute(query, values);
        console.log('Data stored successfully');
    } catch (error) {
        console.error('Error storing data:', error);
    } finally {
        await connection.end();
    }
}

fetchData();
