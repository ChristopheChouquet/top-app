import express from "express";
import { 
    getUsers,
    saveUser,
    login,
    logout,
} from "../controllers/UserController.js";
 
const router = express.Router();
 
router.get('/recherche', getUsers);
router.post('/signup', saveUser);
router.post('/login', login );
router.post('/logout', logout);

 
export default router;