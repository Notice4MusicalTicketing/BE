import dotenv from 'dotenv';

export const loadEnv = () => {
    const result = dotenv.config();
    console.log(result);
    if (result.error) {
        console.error("Failed to load .env file", result.error);
    }
};

export default loadEnv;
