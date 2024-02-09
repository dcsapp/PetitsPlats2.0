// L I S T S  D E F I N I T I O N
// Current list recipe IDs to be displayed
// let actualListOfRecipesIdToBeDisplayed = [];
//
//const ingredientVsRecipe = []
let selectedRecipesIngredients = [];
let selectedRecipesUstensils = [];
let selectedRecipesAppliances = [];
//
let localSearch = [];
//
// const recipesName = [];

// let tagRecipeIdList = [];

// S E A R C H  I N P U T  L I S T S
// Recipe IDs from main bar search:
// let mainTagList = [];
let mainSearchInputIdList = [];
// Recipe IDs from selectors item / ID

// let tryTest = {};
let fullTagsList = {};

// R E S U L T  O F  S E A R C H E S  I N P U T  B O X E S
// List of recipes IDs to be displayed
// let selectedRecipes = []; 
let recipesListIds = [];

// let selectedTagList = [];

// U P D A T E D  R E C I P E S  L I S T S ============================
// Reorganized Recipes data
// searchRecipe[index= recipe.id].ingredients  .ustensils  .appliance
function updateRecipes(recipe) {
  newRec = {};
  ingredientsList = [];
  let uptd = recipe.ingredients.forEach((ing) => {
    ingredientsList.push(ing.ingredient);
  });
  newRec["ingredients"] = ingredientsList;
  newRec["ustensils"] = recipe.ustensils;
  newRec["appliance"] = [recipe.appliance];
  // console.log("recipe.appliance;", recipe.appliance)
  return newRec;
}
//
const newRecipes = recipes.reduce((acc, recipe) => {
  let uptdRecipe = updateRecipes(recipe);
  return { ...acc, [recipe.id]: uptdRecipe };
}, {});
/* return 
  2: {
    "ingredients": [
      "Lait de coco",
      "Jus de citron",
      "Crème de coco",
      "Sucre",
      "Glaçons"
  ],
  "ustensils": [
      "Cuillère à Soupe",
      "Verres",
      "Presse citron"
  ],
  "appliance": [
      "Blender"
  ]
}
*/

// All in one
// Create lists of item and associated ID
//
function iuaVsRecipeId() {
  // iua: i ngredients  u stensils  a ppliance
  const getListOfIngredients = {};
  const getListOfUstensils = {};
  const getListOfAppliances = {};

  recipes.forEach((recipe) => {
    let ingredients = recipe.ingredients;
    let ustensils = recipe.ustensils;
    let appliance = recipe.appliance;

    // ingredients
    ingredients.map((ingredient) => {
      if (!getListOfIngredients[ingredient.ingredient]) {
        getListOfIngredients[ingredient.ingredient] = [recipe.id];
      } else {
        getListOfIngredients[ingredient.ingredient].push(recipe.id);
      }
    });
    // ustensils
    ustensils.map((ustensil) => {
      if (!getListOfUstensils[ustensil]) {
        getListOfUstensils[ustensil] = [recipe.id];
      } else {
        getListOfUstensils[ustensil].push(recipe.id);
      }
    });
    // appliances
    if (!getListOfAppliances[appliance]) {
      getListOfAppliances[appliance] = [recipe.id];
    } else {
      getListOfAppliances[appliance].push(recipe.id);
    }
  });
  return { getListOfIngredients, getListOfUstensils, getListOfAppliances };
}

const alls = iuaVsRecipeId();
const { getListOfIngredients, getListOfUstensils, getListOfAppliances } = alls;
const listOfIngredients = getListOfIngredients;
const listOfUstensils = getListOfUstensils;
const listOfAppliances = getListOfAppliances;
//
// 3 lists merged in one
fullList = { ...listOfIngredients, ...listOfUstensils, ...listOfAppliances };
//
//
function retrieveRecipes(inputValue, inputBox) {
  let currentRecipes = new Set();
  let searchString = inputValue;
  //
  switch (inputBox) {
    case "ingredients":
      if (selectedRecipesIngredients.length === 0) {
        selectedRecipesIngredients = [...Object.keys(listOfIngredients).sort()];
      }
      // Search in selector ingredients / starst from the first caracter
      // and search in available items in the list
      localSearch = [];
      selectedRecipesIngredients.forEach((item) => {
        if (item.toLowerCase().startsWith(searchString.toLowerCase())) {
          localSearch.push(item);
          updateCriteriaList("ingredients", localSearch);
        }
      });
      displayNumberOfRecipes(recipesListIds);
      break;

    case "ustensils":
      if (selectedRecipesUstensils.length === 0) {
        selectedRecipesUstensils = [...Object.keys(listOfUstensils).sort()];
      }
      currentRecipes.clear();
      localSearch = [];
      selectedRecipesUstensils.forEach((item) => {
        if (item.toLowerCase().startsWith(searchString.toLowerCase())) {
          localSearch.push(item);
          updateCriteriaList("ustensils", localSearch);
        }
      });
      displayNumberOfRecipes([...currentRecipes].length);
      break;

    case "appliances":
      if (selectedRecipesAppliances.length === 0) {
        selectedRecipesAppliances = [...Object.keys(listOfAppliances).sort()];
      }
      currentRecipes.clear();
      localSearch = [];
      selectedRecipesAppliances.forEach((item) => {
        if (item.toLowerCase().startsWith(searchString.toLowerCase())) {
          localSearch.push(item);
          updateCriteriaList("appliances", localSearch);
        }
      });
      displayNumberOfRecipes([...currentRecipes].length);
      break;

    case "mainSearchInput":
      currentRecipes.clear();
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
          // Retrieve ingredients
          recipe.ingredients.forEach((item) => {
            if (
              item.ingredient.toLowerCase().includes(searchString.toLowerCase())
            ) {
              currentRecipes.add(recipe.id);
            }
          });
        });
        if (
          recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchString.toLowerCase())
        ) {
          currentRecipes.add(recipe.id);
        }
      });
      displayNumberOfRecipes([...currentRecipes].length);
      break;

    default:
      console.log("Error...");
  }
  return [...currentRecipes];
}



function displayNumberOfRecipes(nbrRecipes) {
  const nbrTxt =
    nbrRecipes > 1 ? `${nbrRecipes} recettes` : `${nbrRecipes} recette`;
  const totalRecipes = document.querySelector(".total_recipes");
  // totalRecipes.innerHTML = nbrRecipes + " recette(s)";
  totalRecipes.innerHTML = nbrTxt;
}

// R E T R I E V E  D A T A  F R O M  R E C I P E S
// Feed differents lists according to input box used (crit):
//    mainSearch / ingredients / appliances / ustensils
//
// Retrieve Ingredients / Ustensils / Appliances from recipes
// get from mainbar search
function createCriteriaList(listID) {
  //
  if (listID === 0) {
    return;
  }
  //
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();
  //
  let updtIngredientsList = [];
  let updtUstensilsList = [];
  //
  listID.forEach((id) => {
    updtIngredientsList = [
      ...updtIngredientsList,
      ...newRecipes[id].ingredients,
    ];
    updtUstensilsList = [...updtUstensilsList, ...newRecipes[id].ustensils];
    setOfAppliances.add(...newRecipes[id].appliance);
  });
  selectedRecipesIngredients = [...new Set(updtIngredientsList)].sort();
  selectedRecipesUstensils = [...new Set(updtUstensilsList)].sort();
  selectedRecipesAppliances = [...setOfAppliances].sort();
  //
  // in template.js:
  updateCriteriaList("ingredients", selectedRecipesIngredients);
  updateCriteriaList("appliances", selectedRecipesAppliances);
  updateCriteriaList("ustensils", selectedRecipesUstensils);
}
