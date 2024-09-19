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
            const cast = detail.prfcast ? detail.prfcast[0] : '';
            const runtime = detail.prfruntime && detail.prfruntime[0] ? parseInt(detail.prfruntime[0], 10) : 0;
            const ageRating = detail.prfage ? detail.prfage[0] : '';
            const productionCompany = detail.entrpsnm ? detail.entrpsnm[0] : '';
            const ticketPrice = detail.pcseguidance ? detail.pcseguidance[0] : '';
            const synopsis = detail.sty ? detail.sty[0] : '';
            const introImages = detail.styurls ? JSON.parse(JSON.stringify(detail.styurls[0])) : [];
            const showtimes = detail.dtguidance ? detail.dtguidance[0] : '';
            const facilityDetails = detail.fcltynm ? detail.fcltynm[0] : '';

            // 예매처 정보 처리
            const agencies = detail.relates && detail.relates[0] ? detail.relates[0].relate : [];
            
            if (!agencies || !Array.isArray(agencies)) {
                console.error('No ticket agencies data found for musical ID:', musical.mt20id[0]);
                continue;
            }
            const ticketAgencies = agencies.map((agency: any) => ({
                name: agency.relatenm ? agency.relatenm[0] : '',
                url: agency.relateurl ? agency.relateurl[0] : ''
            })); 
            //console.log('Ticket Agencies:', ticketAgencies);

            // 데이터베이스에 저장
            await prisma.musical.upsert({
                where: { musicalId: mt20id },
                update: {
                    name: prfnm,
                    startDate: prfpdfrom,
                    endDate: prfpdto,
                    status: prfstate,
                    details: {
                        upsert: {
                            where: { musicalId: mt20id },
                            update: {
                                facilityName: fcltynm,
                                posterImagePath: poster,
                                genre: genrenm,
                                cast: cast,
                                runtime: runtime,
                                ageRating: ageRating,
                                productionCompany: productionCompany,
                                ticketPrice: ticketPrice,
                                synopsis: synopsis,
                                introImages: introImages,
                                showtimes: showtimes,
                                facilityDetails: facilityDetails,
                                ticketAgencies: ticketAgencies // JSON field 업데이트
                            },
                            create: {
                                facilityName: fcltynm,
                                posterImagePath: poster,
                                genre: genrenm,
                                cast: cast,
                                runtime: runtime,
                                ageRating: ageRating,
                                productionCompany: productionCompany,
                                ticketPrice: ticketPrice,
                                synopsis: synopsis,
                                introImages: introImages,
                                showtimes: showtimes,
                                facilityDetails: facilityDetails,
                                ticketAgencies: ticketAgencies // JSON field 생성
                            }
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
                            runtime: runtime,
                            ageRating: ageRating,
                            productionCompany: productionCompany,
                            ticketPrice: ticketPrice,
                            synopsis: synopsis,
                            introImages: introImages,
                            showtimes: showtimes,
                            facilityDetails: facilityDetails,
                            ticketAgencies: ticketAgencies // JSON field 생성
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
