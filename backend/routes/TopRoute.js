import express from "express";
import { 
    getAllTops,
    saveTop,
} from "../controllers/TopController.js";
 
const router = express.Router();
 
router.get('/tops', getAllTops);
router.post('/tops', saveTop);
 
export default router;