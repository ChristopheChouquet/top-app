import express from "express";
import { 
    getAllTops,
    saveTop,
} from "../controllers/TopController.js";
import auth from '../middleware/auth.js';
 
const router = express.Router();
 
router.get('/tops', auth, getAllTops);
router.post('/tops', auth, saveTop);
 
export default router;