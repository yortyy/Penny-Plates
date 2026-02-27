async function getFood() {
    const search = document.getElementById("foodsearch-input").value;
    const res = await fetch('/api/food/?search=' + encodeURIComponent(search.trim()));
    const foodsJSON = await res.json();

    const outputContainer = document.getElementById("foodsearch-output");
    outputContainer.innerHTML = ""; // Clear previous results

    if (!foodsJSON.foods || foodsJSON.foods.length === 0) {
        outputContainer.innerHTML = "<p>No foods found.</p>";
        return;
    }

    // Loop through all foods and create a card for each
    foodsJSON.foods.forEach(food => {
        const foodCard = createFoodCard(food);
        outputContainer.appendChild(foodCard);
    });
}

/**
 * Resolves the GitHub path for a given USDA food item.
 * @param {number} fdcId - The unique USDA FoodData Central ID
 */
function getPaths(fdcId) {
  const partition = Math.floor(fdcId / 1000);
  return `catalog/images/${partition}/${fdcId}.jpg`;
}

// Helper function to create a food card
function createFoodCard(foodJSON) {
    const imageURL = "https://raw.githubusercontent.com/baditaflorin/usda-food-visual-catalog-v1/main/" + getPaths(foodJSON.fdcId)
    const foodDiv = document.createElement('div');
    foodDiv.className = 'food-item';
    foodDiv.innerHTML = `
        <h3>${foodJSON.description}</h3>
        <img src=${imageURL} alt="food image credit to baditaflorin" />
        <p><strong>Category:</strong> ${foodJSON.foodCategory || "N/A"} | 
           <strong>Type:</strong> ${foodJSON.dataType || "N/A"} | 
           <strong>Published:</strong> ${foodJSON.publishedDate || "N/A"}</p>
        <ul>
            ${foodJSON.foodNutrients?.map(n => 
                `<li>${n.nutrientName}: ${n.value} ${n.unitName}</li>`).join('') || "<li>No nutrient data</li>"}
        </ul>
    `;
    return foodDiv;
}

function getImagePath(barcode) {
    const code = String(barcode);
    if (code.length !== 13) {
        throw new Error("Barcode must be 13 digits");
    }
    const part1 = code.substring(0, 3);
    const part2 = code.substring(3, 6);
    const part3 = code.substring(6, 9);
    const part4 = code.substring(9, 13);
    const path = `${part1}/${part2}/${part3}/${part4}`;
    return path;
}