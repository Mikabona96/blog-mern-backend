import express from 'express';
import {blogController} from '../controllers/blog.js';
const router = express.Router();


router.get('/', blogController)


export default router









