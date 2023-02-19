import express from "express";
import { 
    saveUser,
    login,
    logout,
} from "../controllers/UserController.js";
 
const router = express.Router();
 
router.post('/signup', saveUser);
router.post('/login', login );
router.post('/logout', logout);
 
export default router;