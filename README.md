# Penny Plates
By: Lance Santos

## Project Description

### Who is the target audience?

The target audience are people who want to optimize what food they eat and buy in regards to budget and nutrition.

### Why does our audience want to use our application?

The target audience would want to keep track of what food they have, keep track of nutrition, budget for meals, plan meals for the food they have, and keep a shopping list. There are many other options for this on the market- Cronometer and MyFitnessPal. But, none of them track the price of the food you buy. People may have to juggle different apps: one for the shopping list, one for keeping track of calories, one for budgeting. I hope to target this audience with one app that aims to do it all, in a seamless and easy experience.

### Why do we as developers want to build this application?

I wanted to make something that I myself would use. As a college student, I don't have tons of money to spend on food. I also don't know how much things cost in terms of meal prep or cooking compared to eating out. I would like to know that, so that I could plan around it.

On the developing side, this is a strong app that has multiple components (front-end, back-end, OCR, API calls, databases, etc.). This gives me the chance to put together an app that displays all of my skills, while also (hopefully) making an impact on food budgeting.


## Technical Description

### Architectural Diagram


### Data Flow Diagram


### User Stories

| Priority | User | Description | Technical Implementation |
| :---- | :---- | :---- | :---- |
| P0 | As a user | I want to login to an account to save my data | Using user authentication, users can sign up or login and is put into our Users database |
| P0 | As a user | I want to see the food I have in my pantry | A get endpoint will retrieve the foodIDs from the Users.pantry database. |
| P0 | As a user | I want to add/remove food to my pantry with prices | A post endpoint will add/remove foodIDs to the Users.pantry database. |
| P1 | As a user | I want to add/remove my meals for the day and future | A post endpoint will add/remove the meal of food IDs with ratios to the Users.meals.date database. |
| P1 | As a user | I want to see the nutrition score of my meals. | A get end point will get data from open food facts and produce a total nutrition score. |
| P1 | As a user | I want to get my shopping list | A get endpoint will get foodIDs from the Users.shoppinglist database. |
| P1 | As a user | I want to add/remove to my shopping list | A post endpoint will add/remove foodIDs to the Users.shoppinglist database. |
| P2 | As a user | I want to get suggested meals based on my pantry | A get endpoint is used to retrieve a randomized pack of cards out of a set and is given to the user. |
| P3 | As a user | I want to add other people to my shopping list, pantry and home | A post endpoint will add user to the Users.shoppinglist.users database, for the pantry as well. |
| P4 | As a user | I want to scan grocery reciepts that adds food to my pantry | A get endpoint will retrieve the cards an account has from the Users mongodb database. |
| P4 | As a user | I want to add food to my pantry by scanning a barcode | react-native-scan-barcode will used to retrieve a randomized pack of cards out of a set and is given to the user. |

### Endpoints

#### Auth
- **POST /auth/register** – Create a new user account and store it in the Users database.
- **POST /auth/login** – Authenticate user credentials and return a session or JWT.
- **POST /auth/logout** – Log out the user and invalidate their session/token.

#### User
- **GET /users/:userId** – Retrieve user profile data (pantry, meals, shopping list, shared users).
- **POST /users/:userId** – Update user information (username, email, preferences).

#### Pantry
- **GET /users/:userId/pantry** – Retrieve all food items (foodIDs, quantity, price) in the user’s pantry.
- **PATCH /users/:userId/pantry** – Add a food item to the pantry with quantity and price.
- **PATCH /users/:userId/pantry/:foodId** – Update quantity or price of an existing pantry item.
- **DELETE /users/:userId/pantry/:foodId** – Remove a food item from the pantry.

#### Meals
- **GET /users/:userId/meals** – Retrieve all meals (optionally filter by date).
- **GET /users/:userId/meals/:date** – Retrieve meals for a specific date.
- **POST /users/:userId/meals** – Add or update a meal (foodIDs with ratios) for a specific date.
- **DELETE /users/:userId/meals/:mealId** – Remove a meal entry.

#### Nutrition
- **GET /users/:userId/meals/:date/nutrition** – Calculate and return the total nutrition score using external food data (e.g., Open Food Facts).

#### Shopping List
- **GET /users/:userId/shopping-list** – Retrieve all food items in the user’s shopping list.
- **POST /users/:userId/shopping-list** – Add a food item to the shopping list.
- **DELETE /users/:userId/shopping-list/:foodId** – Remove a food item from the shopping list.

#### Meal Suggestions
- **GET /users/:userId/suggestions/meals** – Retrieve suggested meals based on current pantry items.

#### Sharing / Household
- **POST /users/:userId/share** – Add another user to shared pantry, shopping list, and home group.
- **GET /users/:userId/shared-users** – Retrieve users who have access to shared resources.
- **DELETE /users/:userId/share/:sharedUserId** – Remove a user from shared access.

#### Receipt Scanning
- **POST /users/:userId/receipts/scan** – Upload and process a grocery receipt to extract and add food items to the pantry.

#### Barcode Scanning
- **GET /foods/barcode/:barcode** – Retrieve food information from external APIs using a scanned barcode.
- **POST /users/:userId/pantry/barcode** – Add a food item to the pantry using scanned barcode data.

### Database Schema

* Users:
  * userID: number
  * username: String
  * email: String
  * passwordHash: String
  * createdAt: Date
  * householdID: number
  * pantry:
    * foodID: number
    * name: String
    * quantity: number
    * unit: String
    * price: number
  * shoppingList:
    * foodID: number
    * name: String
    * quantity: number
    * unit: String
    * checked: Boolean
  * sharedUsers:
    * userID: number
    * role: String

* Food:
  * foodID: number
  * name: String
  * nutrition (Open food facts data):
    * calories: number
    * carbohydrates: number
    * fats: number
    * proteins: number
    * nutritionScore: number

* Meals:
  * mealID: number
  * userID: number
  * date: Date
  * foods:
    * foodID: number
    * name: String
    * quantity: number
    * ratio: number

* Household:
  * householdID: number
  * name: String
  * ownerUserID: number
  * members:
    * userID: number
    * role: String
  * createdAt: Date

* Receipt:
  * receiptID: number
  * userID: number
  * imageURL: String
  * items:
    * name: String
    * quantity: number
    * price: number
    * matchedFoodID: number
  * total: number
  * scannedAt: Date

