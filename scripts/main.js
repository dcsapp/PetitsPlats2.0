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

let listOfIngredients = [];
/* const toto = recipes.forEach((item) => {
    console.log(item.ingredients)
    //.forEach((ing) => {ing.ingredient}))
})
 */
/* 
let toto = [];
recipes.forEach((item) => {
  let tempo = item.ingredients;
  toto = [...toto, ...tempo];

  console.log(tempo);
 
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
 */

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

function getSelectedRecipes(recipeList) {}
/* 
const {ingredients: listeOfIngredients } = recipes[0];
console.log("AAAAA: ", listeOfIngredients)
listeOfIngredients.forEach((elem) => {
    console.log(elem.ingredient, elem.quantity, elem.unit)
})
console.log("Recette: ", recipes[0]);
 */

function displayRecipes(listID) {
  const recipeDisplaySection = document.getElementById("recipesSelected");
  recipeDisplaySection.replaceChildren();
  listID.forEach((id) => {
    const recipeModel = recipeCardTemplate(id);
    const recipeCard = recipeModel.getRecipeCard();
    recipeDisplaySection.appendChild(recipeCard);
  });
};

const criterias = ["Ingrédients", "Appareils", "Ustensiles"];
const selCriteria = [["a", "b", "c"], [1, 2, 3], ["z", "y", "x"]]
function displayCriteriaSelectors(criteriaType, data) {
    // ingredients
  const selectorsSection = document.getElementById("selectors");

for (let i = 0; i<3; i++) {
    const criteriaModel = criteriaSelectorTemplate(criteriaType[i], data[i]);
    const criteriaList =criteriaModel.getCriteriaSelector();
    selectorsSection.appendChild(criteriaList);
}

}
displayCriteriaSelectors(criterias, selCriteria);


// const data = [1, 2, 3, 4];
function updateCriteriaSelector(selector, data) {
    const selectorTitle = document.querySelector(`.${selector}`);
    // console.log("querySelector: ", selectorTitle)

    data.forEach((item) => {
        const itemDetails = document.createElement("li");
        itemDetails.classList.add("itemDetails");
        itemDetails.textContent = item;
        selectorTitle.appendChild(itemDetails);
    });

}
// updateCriteriaSelector("Ingrédients", data);


function listToDisplay(selectedRecipesIngredients) {
  // const ingCriteria = document.querySelector(".testList");
  const ingCriteria = document.querySelector(".itemList");
  
  let liste = "";
  selectedRecipesIngredients.map((item) => {
    liste += `<li>${item}</li>`;
  });
  console.log("list li:", liste);
    // ingCriteria.innerHTML = liste;
    ingCriteria.appendChild(liste);

    selectedRecipesIngredients.forEach((item) => {
        const itemDetails = document.createElement("li");
        itemDetails.classList.add("itemDetails");
        itemDetails.textContent = item;

        //.appendChild(itemDetails);
})
};

function createCriteriaList(listID) {
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();

  listID.forEach((id) => {
    let currentRecipe = recipes.filter((currentRecipe) => currentRecipe.id === id); //[recipeIndex];
    // list of Appliances
    setOfAppliances.add(currentRecipe[0].appliance);
    // list of Ustensils
    currentRecipe[0].ustensils.forEach((ustensil) => {
      setOfUstensils.add(ustensil);
    });
    // list of ingredients
    currentRecipe[0].ingredients.forEach((ingredient) => {
      setOfIngredients.add(ingredient.ingredient);
    });
  });

  selectedRecipesIngredients = [...setOfIngredients].sort();
  selectedRecipesUstensils = [...setOfUstensils].sort();
  selectedRecipesAppliance = [...setOfAppliances].sort();
  console.log(
    "listIndex: ",
    listID,
    selectedRecipesIngredients,
    selectedRecipesUstensils,
    selectedRecipesAppliance
  );
  // listToDisplay(selectedRecipesIngredients);
  updateCriteriaSelector("Ingrédients", selectedRecipesIngredients);
  updateCriteriaSelector("Ustensiles", selectedRecipesUstensils);
  updateCriteriaSelector("Appareils", selectedRecipesAppliance);
}

function retrieveRecipes(input) {
  let recipeID = []; // ID list of selected recipes

  let searchString = input;
  searchString.toLocaleLowerCase();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      if (item.ingredient.toLowerCase().includes(searchString)) {
        if (!recipeID.includes(recipe.id)) {
          recipeID.push(recipe.id);
        }
      }
    });
    if (
      recipe.name.toLowerCase().includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString)
    ) {
      if (!recipeID.includes(recipe.id)) {
        recipeID.push(recipe.id);
      }
    }
  });
  const totalRecipes = document.querySelector(".total_recipes");
  totalRecipes.innerHTML = recipeID.length + " recettes";
  return recipeID;
};

// Retrieve recipes from Main search bar
const mainInputBox = document.getElementById("mainSearchInput");
mainInputBox.onkeyup = function () {
  let input = mainInputBox.value;
  if (input.length > 0) {
    clearInput.style.display = "inline-flex";
  } else {
    clearInput.style.display = "none";
  }

  if (input.length >= 3) {
    let listIndex = retrieveRecipes(input);
    displayRecipes(listIndex);
    createCriteriaList(listIndex);
  } else {
    recipesSelected.innerHTML = "Aucune recette sélectionnée...";
  }
};
