
async function getFood() {
    let search = document.getElementById("foodsearch-input").value;
    let res = await fetch('/api/food/?' + "foodID=" + search);
    let foodsJSON = await res.json();
    let imgURL = "https://images.openfoodfacts.org/images/products/" + getImagePath(foodsJSON._id) + "/1.jpg";
    console.log(foodsJSON);

    document.getElementById("foodsearch-output").innerHTML = `
        <p>${foodsJSON.product_name}</p>
        <p>Nutrition Grade: ${foodsJSON.nutrition_grades}</p>
        <img src="${imgURL}"/>
    `;
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