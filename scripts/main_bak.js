/* lists */
const selectedRecipes = [];
//const ingredientVsRecipe = []
let selectedRecipesIngredients = [];
let selectedRecipesUstensils = [];
let selectedRecipesAppliance = [];
//
const ingredientsVsRecipes = {};

/* Main Search bar */
const clearInput = document.querySelector(".clearSearch");
clearInput.addEventListener("click", () => {
  mainInputBox.value = "";
});

/* ------------------------------------------------- */
function returnUniqueSortedList(arr = "", elem = "") {
  const setOfUniqueValue = new Set();
  const tutu = [];
  // console.log("tyope of", typeof(value(recipes[arr])))
  let with_id = "";
  recipes.forEach((recipe) => {
    let tempo = recipe[arr];
    tempo.forEach((item) => {
      if (!elem) {
        with_id = `${item}+${recipe.id}`;
        tutu.push(with_id);
        setOfUniqueValue.add(item);
      } else {
        let ingt = item[elem];
        if (!ingredientsVsRecipes[ingt]) {
          ingredientsVsRecipes[ingt] = [recipe.id];
        } else {
          ingredientsVsRecipes[ingt].push(recipe.id);
        }
        setOfUniqueValue.add(item[elem]);
      }
    });
  });
  return [...setOfUniqueValue].sort();
}
//console.log("zzzzzzzzzzzz ===>: ", ingredientsVsRecipes);

console.log(
  "####+++==== INGREDIENTS >: ",
  returnUniqueSortedList("ingredients", "ingredient")
);

console.log("####+++==== USTENSILS >: ", returnUniqueSortedList("ustensils"));
// console.log("####+++==== APPLIANCE >: ", returnUniqueSortedList("appliance"));

/* 
const ingredientsVsRecipes = {}
ingredientsVsRecipes.sucre = [1, 15, 17, 21];
ingredientsVsRecipes.pomme = [6, 15, 21, 34];
console.log("-----------------------------------");
console.log('"A+A+A+A===>', ingredientsVsRecipes);
console.log("-----------------------------------");
ingredientsVsRecipes.sucre.push(45);
console.log('"B+B+B+B===>', ingredientsVsRecipes);
console.log("-----------------------------------");
 */

let listOfIngredients = [];
/* const toto = recipes.forEach((item) => {
    console.log(item.ingredients)
    //.forEach((ing) => {ing.ingredient}))
})
 */
let toto = [];
recipes.forEach((item) => {
  let tempo = item.ingredients;
  toto = [...toto, ...tempo];

  console.log(tempo);
  //.forEach((ing) => {ing.ingredient}))
  /* }) */
  toto.forEach((item) => {
    if (listOfIngredients.includes(item.ingredient)) {
      listOfIngredients;
    } else {
      listOfIngredients.push(item.ingredient);
    }
  });
});

console.log("toto", toto);
console.log("list of ingredients", listOfIngredients.sort());

const setOfIngredients = new Set();

let tyty = [];
recipes.forEach((item) => {
  let tempo = item.ingredients;
  tempo.forEach((ing) => {
    setOfIngredients.add(ing.ingredient);
  });
});
const uniqueSortedIngredient = [...setOfIngredients].sort();
console.log("====> Set of ingredients: ", setOfIngredients);
console.log("====> Sorted ingredients: ", uniqueSortedIngredient);

//const specificRecipes =

/* 
recipes.filter((item) => {
    // item.name === "Frangipane"
    item[0]
})
 */
//console.log("rrr", specificRecipes)
// console.log("specificRecipes", recipeID);

function retrieveData(input) {
  let recipeID = [];
  let recipeINDX = [];

  let searchString = input;
  searchString.toLocaleLowerCase();
  console.log("search: ", searchString);

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      if (item.ingredient.toLowerCase().includes(searchString)) {
        console.log(
          "Ingredient: ",
          item.ingredient.toLowerCase(),
          recipe.id,
          "Recette: ",
          recipe.name
        );
        if (!recipeID.includes(recipe.id)) {
          recipeID.push(recipe.id);
          recipeINDX.push(recipes.indexOf(recipe));
        }
      }
    });
    if (
      recipe.name.toLowerCase().includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString)
    ) {
      if (!recipeID.includes(recipe.id)) {
        recipeID.push(recipe.id);
        recipeINDX.push(recipes.indexOf(recipe));
      }
    }
  });
  //console.log("List of Recipes", recipeID, recipeID.length, recipeINDX);
  const totalRecipes = document.querySelector(".total_recipes");
  totalRecipes.innerHTML = recipeID.length + " recettes";
  return recipeINDX;
}

function getSelectedRecipes(recipeList) {}
/* 
const {ingredients: listeOfIngredients } = recipes[0];
console.log("AAAAA: ", listeOfIngredients)
listeOfIngredients.forEach((elem) => {
    console.log(elem.ingredient, elem.quantity, elem.unit)
})
console.log("Recette: ", recipes[0]);
 */

function displayRecipes(listIndex) {
  const recipeDisplaySection = document.getElementById("recipesSelected");
  recipeDisplaySection.replaceChildren();
  listIndex.forEach((indx) => {
    const recipeModel = recipeCardTemplate(indx);
    const recipeCard = recipeModel.getRecipeCard();
    recipeDisplaySection.appendChild(recipeCard);
    //recipeCardTemplate(indx))
  });
}

function displayCriteriaSelectors() {
  const selectorsSection = document.getElementById("selectors");
  const selectorModel = criteriaSelectorTemplate("Ingredients", [
    "a",
    "b",
    "c",
  ]);
  const selector = selectorModel.getCriteriaSelector();
  selectorsSection.appendChild(selector);
}
displayCriteriaSelectors();

function listToDisplay(selectedRecipesIngredients) {
    const ingCriteria = document.querySelector(".testList");
    let liste = "";
    selectedRecipesIngredients.map((item) => {
        liste += `<li>${item}</li>`
    });
    console.log("list des ingredients: ", liste)
    // ingCriteria.appendChild(liste);
    ingCriteria.innerHTML = liste;
}

function createCriteriaList(listIndex) {
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();

  listIndex.forEach((ind) => {
    // list of Appliances
    setOfAppliances.add(recipes[ind].appliance);
    // list of Ustensils
    recipes[ind].ustensils.forEach((ust) => {
      setOfUstensils.add(ust);
    });
    // list of ingredients
    recipes[ind].ingredients.forEach((ingredient) => {
      setOfIngredients.add(ingredient.ingredient);
    });
  });

  selectedRecipesIngredients = [...setOfIngredients].sort();
  selectedRecipesUstensils = [...setOfUstensils].sort();
  selectedRecipesAppliance = [...setOfAppliances].sort();
  console.log(
    "listIndex: ",
    listIndex,
    selectedRecipesIngredients,
  selectedRecipesUstensils,
  selectedRecipesAppliance 
  );
  listToDisplay(selectedRecipesIngredients)
}



const mainInputBox = document.getElementById("mainSearchInput");
mainInputBox.onkeyup = function () {
  let input = mainInputBox.value;
  if (input.length > 0) {
    clearInput.style.display = "inline-flex";
  } else {
    clearInput.style.display = "none";
  }

  if (input.length >= 3) {
    let listIndex = retrieveData(input);
    displayRecipes(listIndex);
    createCriteriaList(listIndex);

    console.log("Liste index: ", listIndex);
  } else {
    recipesSelected.innerHTML = "Aucune recette sélectionnée...";
  }
};
