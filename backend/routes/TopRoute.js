import express from "express";
import { 
    getAllTops,
    saveTop,
    getTopById,
    UpdatedTopsLikes,
} from "../controllers/TopController.js";
 
const router = express.Router();
 
router.get('/tops', getAllTops);
router.get('/tops/:topId', getTopById);
router.post('/topsupdatedlikes/:topId', UpdatedTopsLikes);
router.post('/tops', saveTop);
 
export default router;