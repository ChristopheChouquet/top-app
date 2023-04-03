import express from "express";
import { 
    getUsers,
    getUsersById,
    getUserProfil,
    saveUser,
    login,
    logout,
} from "../controllers/UserController.js";
 
const router = express.Router();
 
router.get('/recherche', getUsers);
router.get('/user/:userId', getUsersById);
router.get('/profil', getUserProfil);
router.post('/signup', saveUser);
router.post('/login', login );
router.post('/logout', logout);

 
export default router;
