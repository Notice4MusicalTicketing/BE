import { parseString } from 'xml2js';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export async function storeData(xmlData: string): Promise<void> {
    try {
        // XML 데이터를 JSON으로 파싱
        const parsedData = await new Promise<any>((resolve, reject) => {
            parseString(xmlData, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // JSON 데이터에서 필요한 정보 추출
        const musicals = parsedData.dbs.db;
        for (const musical of musicals) {
            // mt20id에서 숫자만 추출 후 BigInt로 변환
            const mt20id = BigInt(musical.mt20id[0].replace(/\D/g, ''));
            const prfnm = musical.prfnm[0];
            const prfpdfrom = new Date(musical.prfpdfrom[0]);
            const prfpdto = new Date(musical.prfpdto[0]);
            const fcltynm = musical.fcltynm[0];
            const poster = musical.poster[0];
            const genrenm = musical.genrenm[0];
            const prfstate = musical.prfstate[0];
            const cast = musical.cast ? musical.cast[0] : '';
            const runtime = musical.runtime ? parseInt(musical.runtime[0], 10) : 0; // 기본값으로 0을 사용
            const age_rating = musical.age_rating ? musical.age_rating[0] : '';
            const production_company = musical.production_company ? musical.production_company[0] : '';
            const ticket_price = musical.ticket_price ? musical.ticket_price[0] : '';
            const synopsis = musical.synopsis ? musical.synopsis[0] : '';
            const intro_images = musical.intro_images ? JSON.parse(musical.intro_images[0]) : [];
            const showtimes = musical.showtimes ? musical.showtimes[0] : '';
            const facility_details = musical.facility_details ? musical.facility_details[0] : '';

            // 데이터베이스에 저장
            await prisma.musical.upsert({
                where: { musical_id: mt20id },
                update: {
                    name: prfnm,
                    start_date: prfpdfrom,
                    end_date: prfpdto,
                    status: prfstate,
                    details: {
                        update: {
                            facility_name: fcltynm,
                            poster_image_path: poster,
                            genre: genrenm,
                            cast: cast,
                            runtime: runtime,
                            age_rating: age_rating,
                            production_company: production_company,
                            ticket_price: ticket_price,
                            synopsis: synopsis,
                            intro_images: intro_images,
                            showtimes: showtimes,
                            facility_details: facility_details
                        }
                    }
                },
                create: {
                    musical_id: mt20id,
                    name: prfnm,
                    start_date: prfpdfrom,
                    end_date: prfpdto,
                    status: prfstate,
                    details: {
                        create: {
                            facility_name: fcltynm,
                            poster_image_path: poster,
                            genre: genrenm,
                            cast: cast,
                            runtime: runtime,
                            age_rating: age_rating,
                            production_company: production_company,
                            ticket_price: ticket_price,
                            synopsis: synopsis,
                            intro_images: intro_images,
                            showtimes: showtimes,
                            facility_details: facility_details
                        }
                    }
                }
            });
        }

        console.log('Data stored successfully');
    } catch (error) {
        console.error('Error storing data:', error);
        console.log('storeData.ts');
    } finally {
        await prisma.$disconnect();
    }
}
