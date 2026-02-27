import express from 'express';
import * as foodController from '../controllers/food.controller.js'

var router = express.Router();

router.get('/', foodController.getFood);

export default router;
