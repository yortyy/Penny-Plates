// GET /food
// Retrieve foods filtered on foodID, name, brand, etc.
export function getFood(req, res, next) {
  return res.send(`${getFood.name} called`);
}