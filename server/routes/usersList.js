import Router from "express";
import { getUsersList, followUser, unfollowUser } from "../controllers/usersList.js";

import { checkAuth } from "../utils/check.js";


const router = new Router();

//Get All Users
//http://localhost:3001/api/users
router.get('/', checkAuth, getUsersList)

//Follow User
//http://localhost:3001/api/users/follow
router.post('/follow', checkAuth, followUser)

//Unfollow User
//http://localhost:3001/api/users/follow
router.post('/unfollow', checkAuth, unfollowUser)



export default router;