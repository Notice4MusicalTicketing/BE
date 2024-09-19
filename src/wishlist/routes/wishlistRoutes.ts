import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/wishlistController';

const router = Router();

router.post('/add', addFavorite);
router.delete('/remove/:memberId/:musicalId', removeFavorite);
router.get('/:memberId', getFavorites);

export default router;
