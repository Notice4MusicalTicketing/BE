import express from 'express';
import prisma from "../../config/database";
import {fetchDetailData} from "../../dataFetch/fetchData";
import {fetchAndStoreData} from "../../dataFetch/fetchAndStoreData";
const router = express.Router();

router.get('/musicals', async (req, res) => {
    try {
        const musicals = await prisma.musical.findMany();
        res.render('musicals', { musicals });
    } catch (error) {
        res.status(500).send('Error fetching musicals');
    }
});

// 뮤지컬 상세 페이지 라우트
router.get('/musicals/:id', async (req, res) => {
    const musicalId = Number(req.params.id);
    try {
        const musical = await prisma.musical.findUnique({
            where: { musicalId: musicalId }
        });
        if (musical) {
            res.render('musical-detail', { musical });
        } else {
            res.status(404).send('Musical not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching musical details');
    }
});


/**
 * @swagger
 * /api/performance/{mt20id}:
 *   get:
 *     summary: Get detailed performance data
 *     parameters:
 *       - in: path
 *         name: mt20id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the musical
 *     responses:
 *       200:
 *         description: Detailed information about the musical
 *       500:
 *         description: Error fetching detail data
 */

router.get('/api/performance/:mt20id', async (req, res) => {
    const { mt20id } = req.params;
    try {
        const detailData = await fetchDetailData(mt20id);
        res.send(detailData);
    } catch (error) {
        res.status(500).send('Error fetching detail data');
    }
});

router.post('/api/sync', async (req, res) => {
    try {
        const startDate = '20240101'; // 원하는 시작 날짜
        const endDate = '20240131'; // 원하는 종료 날짜
        const genre = '뮤지컬'; // 원하는 장르
        const region = '서울'; // 원하는 지역
        const status = '공연중'; // 원하는 공연 상태

        await fetchAndStoreData(startDate, endDate, genre, region, status); // 인수를 제공
        res.status(200).json({ message: 'Data synchronization completed.' });
    } catch (error) {
        res.status(500).json({ message: 'Error during data synchronization.', error });
    }
});

export default router;