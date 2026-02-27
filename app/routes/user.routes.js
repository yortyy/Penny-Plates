import express from 'express';
import * as userController from '../controllers/user.controller.js'

var router = express.Router();

// User Redirects (To-do: replace test-ID with authenticated user ID)
router.get('/', (req, res) => res.redirect('/api/users/test-ID'));
router.get('/meals', (req, res) => res.redirect('/api/users/test-ID/meals'));
router.get('/meals/:date', (req, res) => res.redirect(`/api/users/test-ID/meals/${req.params.date}`));
router.get('/shopping-list', (req, res) => res.redirect('/api/users/test-ID/shopping-list'));
router.get('/suggestions/meals', (req, res) => res.redirect('/api/users/test-ID/suggestions/meals'));
router.get('/pantry/receipts', (req, res) => res.redirect('/api/users/test-ID/pantry/receipts'));

// Update user info
router.post('/', userController.updateUserProfile);

// Update Pantry
router.patch('/pantry', userController.addPantryItem);
router.patch('/pantry/:foodId', userController.updatePantryItem);
router.delete('/pantry/:foodId', userController.removePantryItem);
router.patch('/pantry/barcode', userController.addPantryByBarcode);
router.post('/pantry/reciepts', userController.addReceipt);

// Update Meals
router.post('/meals', userController.addOrUpdateMeal);
router.delete('/meals/:mealId', userController.removeMeal);

// Update Shopping List
router.post('/shopping-list', userController.addToShoppingList);
router.delete('/shopping-list/:foodId', userController.removeFromShoppingList);

export default router;
