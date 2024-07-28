import axios from 'axios';
import { parseString } from 'xml2js';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

export async function storeData(data: any): Promise<void> {
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
