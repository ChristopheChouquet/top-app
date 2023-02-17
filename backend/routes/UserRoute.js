import express from "express";
import { 
    getUsers, 
    getUserByemail,
    saveUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
 
const router = express.Router();
 
router.get('/users', getUsers);
router.get('/users/:email', getUserByemail);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
 
export default router;