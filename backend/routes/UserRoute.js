import express from "express";
import { 
    getUsers,
    getUsersById,
    getUserProfil,
    saveUser,
    updateUser,
    updateAvatarUser,
    addUserAbo,
    delUserAbo,
    login,
    logout,
} from "../controllers/UserController.js";
 
const router = express.Router();
 
router.get('/recherche', getUsers);
router.get('/user/:userId', getUsersById);
router.post('/updateuser', updateUser);
router.post('/updateavataruser/:userId', updateAvatarUser);
router.get('/profil/:tagName', getUserProfil);
router.post('/signup', saveUser);
router.post('/addUserAbo', addUserAbo);
router.post('/delUserAbo', delUserAbo);
router.post('/login', login );
router.post('/logout', logout);

 
export default router;