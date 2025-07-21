import { Router } from "express";
import { loginUser, logOut, register } from "../Controller/userController.js";
import { verifyJwt } from "../Middleware/authMiddleWare.js";

const router = Router();


router.route('/signup').post(register)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJwt, logOut)


export default router;

