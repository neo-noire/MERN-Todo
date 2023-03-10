import Router from "express";
import { getDialog, sendMessage } from "../controllers/message.js";

import { checkAuth } from "../utils/check.js";


const router = new Router();

//Fetch Messages
//http://localhost:3001/api/dialog/get
router.get('/get', checkAuth, getDialog)

//Send Message
//http://localhost:3001/api/dialog/send
router.post('/send', checkAuth, sendMessage)




export default router;