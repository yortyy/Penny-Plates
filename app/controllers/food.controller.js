import { OpenFoodFacts } from "@openfoodfacts/openfoodfacts-nodejs";
const client = new OpenFoodFacts(fetch);

// GET /food
// Retrieve foods filtered on foodID, name, brand, etc.
export async function getFood(req, res, next) {
  const foodID = req.query.foodID
  const { data, error } = await client.getProductV3(foodID); //To-do: user agent authentication
  if (!data) {
    console.error("Error fetching product:", error);
    return;
  }

  return res.send(data.product);
}