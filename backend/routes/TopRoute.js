import express from "express";
import { 
    getAllTops,
    saveTop,
    getTopById,
    UpdatedTopsLikes,
    saveComm,
    getComms,
} from "../controllers/TopController.js";
 
const router = express.Router();
 
router.get('/tops', getAllTops);
router.get('/tops/:topId', getTopById);
router.post('/topsupdatedlikes/:topId', UpdatedTopsLikes);
router.post('/tops', saveTop);
router.post('/commentaires/:topId', saveComm);
router.get('/commentaires/:topId', getComms);
 
export default router;