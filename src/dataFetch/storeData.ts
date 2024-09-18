import { parseString } from 'xml2js';
import prisma from "../config/database";
import { fetchDetailData } from "../dataFetch/fetchData";

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
            const mt20id = BigInt(musical.mt20id[0].replace(/\D/g, ''));
            const prfnm = musical.prfnm[0];
            const prfpdfrom = new Date(musical.prfpdfrom[0]);
            const prfpdto = new Date(musical.prfpdto[0]);

            // 상세 정보 가져오기
            const detailData = await fetchDetailData(musical.mt20id[0]);
            if (!detailData) {
                console.error('No detail data found for musical ID: ' + musical.mt20id[0]);
                continue; // 데이터를 못 가져왔으면 건너뜀
            }

            const parsedDetail = await new Promise<any>((resolve, reject) => {
                parseString(detailData, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            const detail = parsedDetail.dbs.db[0];
            const fcltynm = detail.fcltynm ? detail.fcltynm[0] : '';
            const poster = detail.poster ? detail.poster[0] : '';
            const genrenm = detail.genrenm ? detail.genrenm[0] : '';
            const prfstate = detail.prfstate ? detail.prfstate[0] : '';
            const cast = detail.prfcast ? detail.prfcast[0] : ''; // 필드명 확인
            const runtime = detail.prfruntime && detail.prfruntime[0] ? parseInt(detail.prfruntime[0], 10) : 0;
            const age_rating = detail.prfage ? detail.prfage[0] : ''; // 필드명 확인
            const production_company = detail.entrpsnm ? detail.entrpsnm[0] : ''; // 필드명 확인
            const ticket_price = detail.pcseguidance ? detail.pcseguidance[0] : ''; // 필드명 확인
            const synopsis = detail.sty ? detail.sty[0] : ''; // 필드명 확인
            const intro_images = detail.styurls ? JSON.parse(JSON.stringify(detail.styurls[0])) : []; // 필드명 확인 및 JSON 변환
            const showtimes = detail.dtguidance ? detail.dtguidance[0] : '';
            const facility_details = detail.fcltynm ? detail.fcltynm[0] : '';

            // 데이터베이스에 저장
            await prisma.musical.upsert({
                where: { musicalId: mt20id },
                update: {
                    name: prfnm,
                    startDate: prfpdfrom,
                    endDate: prfpdto,
                    status: prfstate,
                    details: {
                        update: {
                            facilityName: fcltynm,
                            posterImagePath: poster,
                            genre: genrenm,
                            cast: cast,
                            runtime: runtime,  // 여기서 runtime 값이 제대로 설정됨
                            ageRating: age_rating,
                            productionCompany: production_company,
                            ticketPrice: ticket_price,
                            synopsis: synopsis,
                            introImages: intro_images,
                            showtimes: showtimes,
                            facilityDetails: facility_details
                        }
                    }
                },
                create: {
                    musicalId: mt20id,
                    name: prfnm,
                    startDate: prfpdfrom,
                    endDate: prfpdto,
                    status: prfstate,
                    details: {
                        create: {
                            facilityName: fcltynm,
                            posterImagePath: poster,
                            genre: genrenm,
                            cast: cast,
                            runtime: runtime,  // 여기서도 runtime 값이 있어야 함
                            ageRating: age_rating,
                            productionCompany: production_company,
                            ticketPrice: ticket_price,
                            synopsis: synopsis,
                            introImages: intro_images,
                            showtimes: showtimes,
                            facilityDetails: facility_details
                        }
                    }
                }
            });
            
        }

        console.log('Data stored successfully');
    } catch (error) {
        console.error('Error storing data:', error);
    } finally {
        await prisma.$disconnect();
    }
}
