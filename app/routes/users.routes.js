import express from 'express';
import * as usersController from '../controllers/users.controller.js'

var router = express.Router();

// User Profile
router.get('/:userId', usersController.getUserProfile);

// Pantry
router.get('/:userId/pantry', usersController.getPantry);
router.get('/:userId/pantry/receipts', usersController.getReceipts);

// Meals
router.get('/:userId/meals', usersController.getMeals);
router.get('/:userId/meals/:date', usersController.getMealsByDate);

// Shopping List
router.get('/:userId/shopping-list', usersController.getShoppingList);

// Meal Suggestions
router.get('/:userId/suggestions/meals', usersController.getMealSuggestions);


// // Receipt & Barcode Scanning
// router.post('/:userId/receipts/scan', usersController.scanReceipt);
// router.post('/:userId/pantry/barcode', usersController.addPantryByBarcode);

export default router;
