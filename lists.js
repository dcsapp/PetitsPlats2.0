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
const recipesName = [];

let tagRecipeIdList = [];

// S E A R C H  I N P U T  L I S T S
// Recipe IDs from main bar search:
let mainTagList = [];
let mainSearchInputIdList = [];
// Recipe IDs from selectors item / ID

let tryTest = {};
let fullTagsList = {};

// R E S U L T  O F  S E A R C H E S  I N P U T  B O X E S
// List of recipes IDs to be displayed
let selectedRecipes = []; // 52
let recipesListIds = [];

let selectedTagList = [];

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
// console.log("full list: ", fullList)
//
//
function retrieveRecipes(inputValue, inputBox) {
  console.log(
    "E N T E R I N G  R E T R I E V E  R E C I P E S : ",
    inputBox,
    " / ",
    inputValue,
    " / recipes id list",
    recipesListIds
    //
    /* 
  updateCriteriaList("ingredients", selectedRecipesIngredients);
  updateCriteriaList("appliances", selectedRecipesAppliances);
  updateCriteriaList("ustensils", selectedRecipesUstensils);
 */
  );
  let currentRecipes = new Set();
  let searchString = inputValue;
  //
  switch (inputBox) {
    case "ingredients":
      if (selectedRecipesIngredients.length === 0) {
        selectedRecipesIngredients = [...Object.keys(listOfIngredients).sort()];
      }
      console.log("list of ingredients: ", listOfIngredients);
      console.log("=================================================");
      console.log("current list of ingredients: ", selectedRecipesIngredients);
      console.log("current searchString : ", searchString);
      // currentRecipes.clear();
      localSearch = [];
      selectedRecipesIngredients.forEach((item) => {
        if (item.toLowerCase().startsWith(searchString.toLowerCase())) {
          localSearch.push(item);
          updateCriteriaList("ingredients", localSearch);
          console.log("Y E S !!: ", localSearch);
        }
      });
      console.log("// Retrieve ingredients", inputBox, "/", [
        ...currentRecipes,
      ]);
      displayNumberOfRecipes(recipesListIds);
      // createCriteriaList([...currentRecipes]);
      return [...currentRecipes];

    case "ustensils":
      if (selectedRecipesUstensils.length === 0) {
        selectedRecipesUstensils = [...Object.keys(listOfUstensils).sort()];
      }
      console.log("list of ustensils: ", listOfUstensils);
      console.log("=================================================");
      console.log("current list of ustensils: ", selectedRecipesUstensils);
      console.log("current searchString : ", searchString);
      currentRecipes.clear();
      localSearch = [];
      selectedRecipesUstensils.forEach((item) => {
        if (item.toLowerCase().startsWith(searchString.toLowerCase())) {
          localSearch.push(item);
          updateCriteriaList("ustensils", localSearch);
          console.log("Y E S ustensils !!: ", localSearch);
        }
      });
      console.log("// Retrieve ingredients", inputBox);
      displayNumberOfRecipes([...currentRecipes].length);
      // createCriteriaList([...currentRecipes]);
      return [...currentRecipes];

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
          console.log("Y E S ustensils !!: ", localSearch);
        }
      });
      console.log("// Retrieve ingredients", inputBox);
      displayNumberOfRecipes([...currentRecipes].length);
      // createCriteriaList([...currentRecipes]);
      return [...currentRecipes];

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
          // recipeIDmain.add(recipe.id);
        }
      });
      console.log("// mainSearchInput", inputBox);
      displayNumberOfRecipes([...currentRecipes].length);
      // createCriteriaList([...currentRecipes]);
      console.log("R E T R I E V E  R E C I P E S - mainSearchInput", [
        ...currentRecipes,
      ]);
      return [...currentRecipes];
    default:
      console.log("Error...");
  }
}

// L I S T  H A N D L I N G
// =============================================================
//
// R E T R I E V E  D A T A  F R O M  R E C I P E S
// Feed differents lists according to input box used (crit):
//    mainSearch / ingredients / appliances / ustensils
//

function createCriteriaListByItems(listItems, inputBox, inputValue) {
  console.log(
    "----  E N T E R I N G  C R E A T E  C R I T E R I A  L I S T  B Y  N A M E -----"
  );
  console.log("createCriteriaListByItems ==> 1,", listItems);
  console.log("createCriteriaListByItems ==> 2,", inputBox);
  console.log("createCriteriaListByItems ==> 3,", inputValue);

  const ingList = document.querySelectorAll(".recipeItem");
  console.log("ingList: ", ingList);
  ingList.forEach((ing) => {
    if (ing.parentElement.classList.contains(`ul-${inputBox}`)) {
      // (`${inputBox}`)){
      console.log(ing.textContent, " / ", ing.parentElement);
    } else {
      console.log("nothoing");
    }
  });

  const setOfIngredients = new Set();
  const setOfUstensils = new Set();
  const setOfAppliances = new Set();

  switch (inputBox) {
    case "ingredients":
      for (const [key, value] of Object.entries(listOfIngredients)) {
        if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
          console.log(
            "// ingredient added to the list Ingredients =================="
          );
          setOfIngredients.add(`${key}`);
        }
      }
      break;

    case "ustensils":
      for (const [key, value] of Object.entries(listOfUstensils)) {
        if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
          console.log(
            "// ingredient added to the list Ustensils =================="
          );
          setOfUstensils.add(`${key}`);
        }
      }
      break;

    case "appliances":
      for (const [key, value] of Object.entries(listOfAppliances)) {
        if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
          console.log(
            "// ingredient added to the list Appliances =================="
          );
          setOfAppliances.add(`${key}`);
        }
      }
      break;

    default:
      console.log("erreur");
  }

  selectedRecipesIngredients = [...setOfIngredients].sort();
  updateCriteriaList("ingredients", selectedRecipesIngredients);
  selectedRecipesUstensils = [...setOfUstensils].sort();
  updateCriteriaList("ustensils", selectedRecipesUstensils);
  selectedRecipesAppliances = [...setOfAppliances].sort();
  updateCriteriaList("appliances", selectedRecipesAppliances);
}
// ====================================================================================
function displayNumberOfRecipes(nbrRecipes) {
  const nbrTxt =
    nbrRecipes > 1 ? `${nbrRecipes} recettes` : `${nbrRecipes} recette`;
  const totalRecipes = document.querySelector(".total_recipes");
  // totalRecipes.innerHTML = nbrRecipes + " recette(s)";
  totalRecipes.innerHTML = nbrTxt;
}

function displayRecipes(listID) {
  const recipeDisplaySection = document.getElementById("recipesSelected");
  recipeDisplaySection.replaceChildren();
  if (listID > 0) {
    listID.forEach((id) => {
      const recipeModel = recipeCardTemplate(id);
      const recipeCard = recipeModel.getRecipeCard();
      recipeDisplaySection.appendChild(recipeCard);
    });
  }
}

// Retrieve Ingredients / Ustensils / Appliances from recipes
// get from mainbar search
function createCriteriaList(listID) {
  console.log("E N T E R I N G  C R E A T E  C R I T E R I A  L I S T ");
  console.log("L I S T   I D: ", listID);
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
