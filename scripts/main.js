
// Initial lists construction: id vs
// ---------------------------------- 
// function iuaVsRecipeId()
//    ingredients: listOfIngredients, 
//    ustensils: listOfUstensils, 
//    appliances: listOfAppliances

// data returned from mainbar search:
// Search in Recipes fields: 
//    - name
//    - description
//    - ingredients
// function retrieveRecipes(input)  
// - triggered when input is at least 3 letters 
// - return 
// 


//const ingredientVsRecipe = []
let selectedRecipesIngredients = [];
let selectedRecipesUstensils = [];
let selectedRecipesAppliances = [];
//

// For each ingredient retreive associate recipe ID 
// =================================================
/* 
function ingredientsVsRecipeId() {
  const listOfIngredients = {};
  recipes.forEach((recipe) => {
    let ingredients = recipe.ingredients;
    ingredients.map((ingredient) => {
      if(!listOfIngredients[ingredient.ingredient.toLowerCase()]) {
        listOfIngredients[ingredient.ingredient.toLowerCase()] = [recipe.id]
      } else {
        listOfIngredients[ingredient.ingredient.toLowerCase()].push(recipe.id);
      }
    })
  })
  return listOfIngredients;
}

function ustensilsVsRecipeId() {
  const listOfUstensils = {};
  recipes.forEach((recipe) => {
    let ustensils = recipe.ustensils;
    ustensils.map((ustensil) => {
      if(!listOfUstensils[ustensil.toLowerCase()]) {
        listOfUstensils[ustensil.toLowerCase()] = [recipe.id];
      } else {
        listOfUstensils[ustensil.toLowerCase()].push(recipe.id);
      }
    })
  })
return listOfUstensils;
}

function appliancesVsRecipeId() {
  const listOfAppliances = {};
  recipes.forEach((recipe) => {
    let appliance = recipe.appliance
    if(!listOfAppliances[appliance.toLowerCase()]) {
      listOfAppliances[appliance.toLowerCase()] = [recipe.id]; 
    } else {
      listOfAppliances[appliance.toLowerCase()].push(recipe.id)
    }
  })
  return listOfAppliances;
}

console.log("-----------------------------------------");
console.log('L O Ingredients: ', ingredientsVsRecipeId());
console.log('L O Ustensils: ', ustensilsVsRecipeId());
console.log('L O Appliances: ', appliancesVsRecipeId());
console.log("-----------------------------------------");

 */

// All in one
function iuaVsRecipeId(){   // iua: i ngredients  u stensils  a ppliance
  const listOfIngredients = {};
  const listOfUstensils = {};
  const listOfAppliances = {};

  recipes.forEach((recipe) => {
    let ingredients = recipe.ingredients;
    let ustensils = recipe.ustensils;
    let appliance = recipe.appliance;

    ingredients.map((ingredient) => {
      if(!listOfIngredients[ingredient.ingredient.toLowerCase()]) {
        listOfIngredients[ingredient.ingredient.toLowerCase()] = [recipe.id]
      } else {
        listOfIngredients[ingredient.ingredient.toLowerCase()].push(recipe.id);
      }
    });

    ustensils.map((ustensil) => {
      if(!listOfUstensils[ustensil.toLowerCase()]) {
        listOfUstensils[ustensil.toLowerCase()] = [recipe.id];
      } else {
        listOfUstensils[ustensil.toLowerCase()].push(recipe.id);
      }
    });

    if(!listOfAppliances[appliance.toLowerCase()]) {
      listOfAppliances[appliance.toLowerCase()] = [recipe.id]; 
    } else {
      listOfAppliances[appliance.toLowerCase()].push(recipe.id)
    };
  })
return {listOfIngredients, listOfUstensils, listOfAppliances}
};

const alls = iuaVsRecipeId();
const {listOfIngredients, listOfUstensils, listOfAppliances} = alls;
console.log("A L L s: ", Object.keys(alls.listOfIngredients).length);
console.log("A L L s: ", listOfIngredients);

// == End of iuaVsRecipeId ======================================

/* 

 */

/* 
const myTest = {
  myArray: [1, 3],
  yourArray: [5, 9] 
}
console.log("=================================");
myTest.myArray.push(77);
console.log("My Test:", myTest.myArray);
console.log("=================================");
 */

/* lists */
const selectedRecipes = [];
const ingredientsVsRecipes = []
const initialSelectedRecipes = new Set([2, 3, 40, 60, 99]); // Recipes selected from the main search bar
const refinedCriteriaRecipes = new Set([1, 12, 13, 199]); // Recipes selected according to selected criterias (Ingredients/Appliances/Ustensil)

const actualSelectedRecipes = [];
/* 
intersection = function(initialSelectedRecipes, refinedCriteriaRecipes) {
    const toto = [];
    initialSelectedRecipes.forEach((item) => {
        if (refinedCriteriaRecipes.includes(item)) {
            toto.push(item)
        }
    })
    console.log('T O T O : ', toto);
};
 */

intersection = function(initialSelectedRecipes, refinedCriteriaRecipes) {
    const inters = [...initialSelectedRecipes].filter(a => refinedCriteriaRecipes.has(a));
    console.log('T O T O : ', inters);
}

intersection(initialSelectedRecipes, refinedCriteriaRecipes) 


/*  - M A I N  S E A R C H  B A R -  */
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

// let listOfIngredients = [];
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
// console.log("====> Set of ingredients: ", setOfIngredients);
// console.log("====> Sorted ingredients: ", uniqueSortedIngredient);



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



function updateCriteriaSelector(selector, data) {
    const selectorTitle = document.querySelector(`.${selector}`);
    // console.log("querySelector: ", selectorTitle)
    selectorTitle.replaceChildren();

    data.forEach((item) => {
        const itemDetails = document.createElement("li");
        itemDetails.classList.add("itemDetails");
        itemDetails.textContent = item;
        selectorTitle.appendChild(itemDetails);
    });

}




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


// Retrieve Ingredients / Ustensils / Appliances from recipes
// get from mainbar search
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
  selectedRecipesAppliances = [...setOfAppliances].sort();
  console.log(
    "listIndex: ",
    listID,
    selectedRecipesIngredients,
    selectedRecipesUstensils,
    selectedRecipesAppliances
  );
  // listToDisplay(selectedRecipesIngredients);
  updateCriteriaSelector("Ingrédients", selectedRecipesIngredients);
  updateCriteriaSelector("Ustensiles", selectedRecipesUstensils);
  updateCriteriaSelector("Appareils", selectedRecipesAppliances);
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
  console.log("key pressed: ", input);
  if (input.length > 0) {
    clearInput.style.display = "inline-flex";
  } else {
    clearInput.style.display = "none";
  }
  if (input.length >= 3) {
    let listIndex = retrieveRecipes(input);
    console.log("list index: ", listIndex)
    displayRecipes(listIndex);
    createCriteriaList(listIndex);
  } else {
    createCriteriaList([]);
    recipesSelected.innerHTML = "Aucune recette sélectionnée...";
  }
};










/* Search Fields */
/* 
const displaySearch = document.querySelectorAll(".displaySearch");
displaySearch.forEach(item => {
    item.addEventListener('click', event => {
        console.log(displaySearch.length)
        criteria__search.style = "flex";
    })
});
 */


/* Criteria Search Template */
