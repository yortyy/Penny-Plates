import { OpenFoodFacts } from "@openfoodfacts/openfoodfacts-nodejs";
const client = new OpenFoodFacts(fetch);

// GET /food
// Retrieve foods filtered on foodID, name, brand, etc.
export async function getFood(req, res, next) {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.USDA_API_KEY}`;
  const search = encodeURIComponent(req.query.search.trim());
  // const { data, error } = await client.getProductV3(foodID); //To-do: user agent authentication
  // if (!data) {
  //   console.error("Error fetching product:", error);
  //   return;
  // }
  
  let data = await fetch(url + `&pageSize=5&query=${search}&dataType=Foundation`);
  data = await data.json();

  return res.send(data);
}