import Router from "express";
import { getMe, login, register } from "../controllers/auth.js";
import { checkAuth } from "../utils/check.js";

const router = new Router();

//Reguister
//http://localhost:3001/api/auth/register
router.post('/register', register)

//
//http://localhost:3001/api/auth/login
router.post('/login', login)

// Get Me
//http://localhost:3001/api/auth/register
router.get('/me', checkAuth, getMe)


export default router;