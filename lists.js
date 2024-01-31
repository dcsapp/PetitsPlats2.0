// L I S T S  D E F I N I T I O N
// Current list recipe IDs to be displayed
let actualListOfRecipesIdToBeDisplayed = [];
//
//const ingredientVsRecipe = []
let selectedRecipesIngredients = [];
let selectedRecipesUstensils = [];
let selectedRecipesAppliances = [];
//
//
const recipesName = [];

let tagRecipeIdList = [];

// S E A R C H  I N P U T  L I S T S
// Recipe IDs from main bar search:
let mainTagList = [];
let mainSearchInputIdList = [];
// Recipe IDs from selectors item / ID
let selectorsTagsList = {}; //[];

// R E S U L T  O F  S E A R C H E S  I N P U T  B O X E S
// List of recipes IDs to be displayed
let selectedRecipes = []; // 52
let recipesListIds = [];

let selectedTagList = [];

// U P D A T E D  R E C I P E S  L I S T  ============================
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
// console.log("recipe.appliance;", newRecipes)
// ===================================================================

// L I S T  H A N D L I N G
// =============================================================
//
// R E T R I E V E  D A T A  F R O M  R E C I P E S
// Feed differents lists according to input box used (crit):
//    mainSearch / ingredients / appliances / ustensils
//
function retrieveRecipes(inputValue, inputBox) {
  console.log(
    "E N T E R I N G  R E T R I E V E  R E C I P E S : ",
    inputBox,
    " / ",
    inputValue
  );

  let currentRecipes = new Set();

  let searchString = inputValue;

  switch (inputBox) {
    case "ingredients":
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
      });
      console.log("// Retrieve ingredients", inputBox);
      displayNumberOfRecipes([...currentRecipes].length);
      // createCriteriaList([...currentRecipes]);
      return [...currentRecipes];

    case "ustensils":
      currentRecipes.clear();
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((item) => {
          if (item.toLowerCase().includes(searchString.toLowerCase())) {
            currentRecipes.add(recipe.id);
          }
        });
        console.log("// Retrieve ustensils", inputBox);
        displayNumberOfRecipes([...currentRecipes].length);
        // createCriteriaList([...currentRecipes]);
        return [...currentRecipes];
      });

    case "appliances":
      currentRecipes.clear();
      recipes.forEach((recipe) => {
        if (
          recipe.appliance.toLowerCase().includes(searchString.toLowerCase())
        ) {
          currentRecipes.add(recipe.id);
        }
      });
      console.log("// Retrieve appliances", inputBox);
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
      return [...currentRecipes];
    default:
      console.log("Error...");
  }
}

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
/* 
console.log("const listOfIngredients", listOfIngredients);
console.log("vbgfdrtyyyy: =======> ", Object.keys(listOfIngredients)[0]);
console.log("saladier: =======> ", listOfAppliances["Saladier"]);
 */
//
// 3 lists merged in one
fullList = { ...listOfIngredients, ...listOfUstensils, ...listOfAppliances };
// console.log("full list: ", fullList)

/*  */
function retrieveItems(inputValue, inputBox) {
  console.log("I N S I D E  retrieve  I T E M", inputBox);
  let recipeID = new Set();
  let searchString = inputValue;
  switch (inputBox) {
    case "ingredients":
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
          // Retrieve ingredients
          recipe.ingredients.forEach((item) => {
            if (
              item.ingredient.toLowerCase().includes(searchString.toLowerCase())
            ) {
              recipeID.add(recipe.id);
            }
          });
        });
      });
      return [...recipeID];

    case "ustensils":
      console.log("U S T E N S I L S =======>");
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((item) => {
          if (item.toLowerCase().includes(searchString.toLowerCase())) {
            recipeID.add(recipe.id);
          }
        });
      });
      return [...recipeID];

    case "appliances":
      console.log("A P P L I A N C E S =======>");
      recipes.forEach((recipe) => {
        if (
          recipe.appliance.toLowerCase().includes(searchString.toLowerCase())
        ) {
          recipeID.add(recipe.id);
        }
      });
      return [...recipeID];

    default:
      console.log("error");
  }
  console.log("selected ingredients: ", [...selectedIngredients]);
}

/* 

      selectedIngredients = new Set();
      console.log("Y Y Y Y Y Y ", Object.keys(listOfIngredients));
      console.log("Y Y Y Y Y Y ", listOfIngredients);
      Object.keys(listOfIngredients).forEach((ing) => {
        // listOfIngredients.forEach((ing) => {
        if (ing.toLowerCase().includes(inputValue)) {
          let currentIng = ing;
          console.log("currentIng: ", currentIng);
          selectedIngredients.add(
            `{${currentIng}: [${listOfIngredients[currentIng]}]}`
          );
        }
      });
      console.log("type of: ", typeof [...selectedIngredients]);
      return [...selectedIngredients];
 */

/*  listOfIngredients.forEach((ing) => {
        if()
      }) 
    case ustensils:
      statements
    case appliances:
      statements */

function displayNumberOfRecipes(nbrRecipes) {
  const totalRecipes = document.querySelector(".total_recipes");
  totalRecipes.innerHTML = nbrRecipes + " recette(s)";
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
  console.log("L I S T   I D: ", listID);
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();

  let updtIngredientList = [];
  let updtUstensilsList = [];

  listID.forEach((id) => {
    updtIngredientList = [...updtIngredientList, ...newRecipes[id].ingredients];
    updtUstensilsList = [...updtUstensilsList, ...newRecipes[id].ustensils];
    setOfAppliances.add(...newRecipes[id].appliance);
  //  setOfUstensils.add(...newRecipes[id].ustensils);
  //  setOfIngredients.add(newRecipes[id].ingredients);
    // setOfIngredients(ingrTest = [...ingrTest, ...newRecipes[id].ingredients])
  });
//
  // selectedRecipesIngredients = [...setOfIngredients].sort(); //.sort();
  selectedRecipesIngredients = [...new Set(updtIngredientList)].sort()
  // selectedRecipesUstensils = [...setOfUstensils].sort();
  selectedRecipesUstensils = [...new Set(updtUstensilsList)].sort()
  selectedRecipesAppliances = [...setOfAppliances].sort();
  //
  // in template.js:
  updateCriteriaList("ingredients", selectedRecipesIngredients);
  updateCriteriaList("appliances", selectedRecipesAppliances);
  updateCriteriaList("ustensils", selectedRecipesUstensils);
}

// =========== T R A S H ================================================= //
// ======================================================================= //

// console.log("selectedRecipesIngredients);", selectedRecipesIngredients);
/*  
  listItems.forEach((id) => {
    let currentRecipe = recipes.filter(
      (currentRecipe) => currentRecipe.id === id
    );
}
currentRecipe[0].ingredients.forEach((ingredient) => {
  setOfIngredients.add(ingredient.ingredient);
}))}
 */

/*

// console.log("fullList: ", typeof fullList[0]["ail"]);

// console.log("fullList: ", fullList);
// console.log("fullList2: ", fullList2);

// console.log("merge: ", merged);

/* 
const dataz = [15, 12, 2, 12, 3, 4, 9, 3, 4, 12, 15]
console.log("dddd: ", dataz)
const dddd = getDuplicatesRecipesID(dataz);
console.log("test duplicate", dddd)
 */
/* 
function toFindDuplicates(arry) {
  const uniqueElements = new Set(arry);
  console.log("unique: ", uniqueElements, "arry: ", arry);
  const filteredElements = arry.filter((item) => {
    console.log(item);
    if (uniqueElements.has(item)) {
      uniqueElements.delete(item);
    } else {
      return item;
    }
  });
  console.log("filtered: ", filteredElements);
  return [...new Set(filteredElements)];
  // return [...new Set(uniqueElements)];
}
 */
/* 
    let index = Object.keys(tagsList).indexOf(itemSelected);
    tagsList.splice(index, 1);
    console.log("Tags list: ", tagsList[0])
 */
// console.log("Object.keys= ", Object.keys(tagsList))
//console.log(tagsList.findIndex(itemSelected));
// console.log("index: ",tagsList.indexOf(Object.keys(itemSelected)));

// console.log("itemSelecteda", itemSelected);
// 1 - Add the new item to the list
// const tagDetail = fullList[0][itemSelected];
/* console.log("tagDetail: ", tagDetail);
  tagsList[`${itemSelected}`] = tagDetail;
  console.log("tag List ===> : ", tagsList);
  console.log("tag List ===> type of : ", typeof tagsList);
  console.log("tag list: ", tagsList);
  console.log("tag list length: ", Object.keys(tagsList).length);
  const tyty = Object.keys(tagsList).length - 1;
  console.log("tag list - key - 0: ", Object.keys(tagsList)[tyty]);
  console.log("tag list - value - 0: ", Object.values(tagsList)[tyty]);
 */
/* 
  // 2 - Compare the new item with current selectedRecipe list
  if (selectedRecipes.length === 0) {
    // if the selectedRecipes is empty the new tag id array is added to the list
    console.log("vide");
    // selectedRecipes = [...Object.values(tagsList)[tyty]]; 
    selectedRecipes = [...tagDetail];
    // display the recipes
    console.log("selected recipes - vide: ", selectedRecipes);
  } else {
    // if the selectedRecipes is NOT empty
    // compare the new tag with actual selectedRecipe
    const trtr = [];
    selectedRecipes.forEach((elem) => {
      console.log(" ====================== ", selectedRecipes);
      console.log("ind / tagDetail: ", elem, tagDetail, trtr);
      console.log("elem[ind]: ", elem);
      if (tagDetail.includes(elem)) {
        console.log("Y E S");
        trtr.push(elem);
        console.log("trtr: ", trtr);
      }
      console.log(elem);
      console.log("trtr: ", trtr);
    });
    console.log("selected recipes: ", selectedRecipes);
  }
  console.log("tag list: ", tagsList);

 */
/* ================================================================== */

/* 
  const recipesList = tagsList.reduce((acc, recipeId) => {
    console.log("acc: ", acc);
    console.log("recipeId: ", recipeId);
    console.log("recipeId - key: ", Object.keys(recipeId)[0]);
    const recip = Object.values(recipeId)[0];
    // console.log("recipeId - value: ", Object.values(recipeId)[0]);
    console.log("recipeId - value: ", recip);
    recip.forEach((elem) => {
      return acc.push(elem);
    });

    // const arr = Object.entries(recipeId);
    console.log("arr: ", arr);
  }, []);
  console.log("reduce: ", recipesList);
 */

// let tagDetail = fullList[0].find(key =>fullList[key] === itemSelected)

// const tagDetail = fullList.filter(checkValue)
/* var tagDetail = jsObjects.find(obj => {
        return obj.b === 6
      }) */
/*    
    for (const [key, value] of Object.entries(fullList)) {
        if(key === itemSelected) {
    console.log(`${key}: ${value}`);
}
  }
     */

/* .filter((item) => 
        Object.keys(item) === itemSelected)
 */
/* 

var tagDetail = jsObjects.find(obj => {
  return obj.b === 6
})

        console.log("++++++++++",Object.keys(item));
        if(Object.keys(item) === "'ail'") {
            console.log("++++++++++",Object.keys(item));
        } else {
            console.log("false")
        } */
/* console.log("itemSelecteda", itemSelected, item)
        Object.keys(item) === itemSelected;
        console.log("=====", Object.keys(item)) */

//  console.log("tagDetail =====", tagDetail, typeof tagDetail);
// tagsList.push(`{${itemSelected}: [${tagDetail}]}`);

/* recipesList = tagsList.reduce((acc, recipeId) => {
    console.log("acc: ", acc);
    console.log("recipeId: ", typeof recipeId);
    console.log("recipeId - key: ", Object.keys(recipeId));
    console.log("recipeId - value: ", Object.values(recipeId))



    const arr = Object.entries(recipeId);
    console.log("arr: ", arr);
    return acc.push(arr)
  }, []) */

// console.log("tag list last: ", tagsList[tagsList.length - 1]);
// console.log("tag list last: ", tagsList[tagsList.length - 1].values);
// console.log("reduce: ", recipesList);
// }

// ===================================

/* 
    if (criteriaBox === "mainSearchInput") {
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
    }
  */
// =========================
// let setToArray = [...recipeID];
// console.log("set to array", setToArray)
// const totalRecipes = document.querySelector(".total_recipes");
// totalRecipes.innerHTML = [...recipeID].length + " recettes";

/* 
const fullList2 = [
     ...listOfIngredients, ...listOfUstensils, ...listOfAppliances
  ];
 */
/*
const merged = []
  .concat(listOfIngredients, listOfUstensils, listOfAppliances)
  .flat();
 */

// console.log("listOfIngredients: ", listOfIngredients);
//console.log("listOfUstensils: ", listOfUstensils);
// console.log("listOfAppliances: ", listOfAppliances);

// console.log("------ selected R E C I P E S: ", recipesListIds);
// console.log("------ item S E L E C T E D: ", itemSelected);

/* 
  const setOfIngredients = new Set();
  listItems.forEach((id) => {
    let currentRecipe = recipes.filter(
      (currentRecipe) => currentRecipe.id === id
    ); //[recipeIndex];
    console.log("currentRecipe[0]", currentRecipe[0]);
    // list of ingredients
    currentRecipe[0].ingredients.forEach((ing) => {
      // console.log("I N G R E D I E N T =", ing)
      // item.ingredient.toLowerCase().includes(searchString.toLowerCase())
      if (ing.ingredient.toLowerCase().includes(inputValue.toLowerCase())) {
        setOfIngredients.add(ing.ingredient);
      }
    });

 */
/* if(setOfIngredients.size === 1) {
      updateCriteriaSelectedItem(inputBox, [...setOfIngredients])
    } */
// ----------
// Recipe Name

// });
// console.log("zzzzzzzzzzz==========> ", setOfIngredients)

// 1 - Get index of tag to be removed:
/* 
    let index = selectorsTagsList.findIndex(
      (elem) => elem["item"] === itemSelected.toLowerCase()
    );
 */

/* 
  if (selectorsTagsList.length === 1) {
    recipesListIds = [...selectorsTagsList];
    console.log("selected Recipes: ", selectedRecipes);
  }
  updateSelectedRecipes();
   */

/* 
function retrieveRecipes2(inputValue, inputBox) {
  console.log("inputValue: ", inputValue);
  console.log("inputBox: ", inputBox);
  // Input Box:
  // mainSearchInput: ingredients / name / description
  // ingredients: ingredients
  // appliances: appliances
  // ustensils: ustensils

  let recipeID = new Set(); // ID list of selected recipes / unique
  let searchString = inputValue;
  console.log("searchSring: ", searchString);
  let criteriaBox = inputBox;
  searchString.toLocaleLowerCase();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      // Retrieve ingredients

      recipe.ingredients.forEach((item) => {
        if (
          item.ingredient.toLowerCase().includes(searchString.toLowerCase())
        ) {
          recipeID.add(recipe.id);
        }
      });

      // If search comes from main search bar
      if (criteriaBox === "mainSearchInput") {
        if (
          recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchString.toLowerCase())
        ) {
          recipeID.add(recipe.id);
        }
      }
    });
  });
  displayNumberOfRecipes([...recipeID].length);
  return [...recipeID];
}
 */

/* 
function activateLiSelectedTag(tag) {
  console.log("ttt aaa ggg :", tag);
  // let temp = document.querySelector([`data-criteria-li=${tag}`])
}
 */
/* 
  tempoArr = [];
  selectorsTagsList.forEach((elem) => {
    console.log("rec ID", elem["recID"]);
    tempoArr = [...tempoArr, ...elem["recID"]];
  });
 */
/* 
    const duplicatesId = (tempoArr) => tempoArr.filter((item, index) => {
        tempoArr.indexOf(item !== index)
    })
 */
/* 
  console.log("tempo: ", tempoArr);
  // const duplicateElements = toFindDuplicates(tempoArr);
  const duplicateElements = getDuplicatesRecipesID(tempoArr);
  console.log("tempo duplicated: ", duplicateElements);
  //tagsList = [...duplicateElements];

  //console.log("tempo: ", duplicatesId);
 */

/*    
// ingredients
    ingredients.map((ingredient) => {
      if (!getListOfIngredients[ingredient.ingredient.toLowerCase()]) {
        getListOfIngredients[ingredient.ingredient.toLowerCase()] = [recipe.id];
      } else {
        getListOfIngredients[ingredient.ingredient.toLowerCase()].push(
          recipe.id
        );
      }
    });
// ustensils
    ustensils.map((ustensil) => {
      if (!getListOfUstensils[ustensil.toLowerCase()]) {
        getListOfUstensils[ustensil.toLowerCase()] = [recipe.id];
      } else {
        getListOfUstensils[ustensil.toLowerCase()].push(recipe.id);
      }
    });
// appliances
    if (!getListOfAppliances[appliance.toLowerCase()]) {
      getListOfAppliances[appliance.toLowerCase()] = [recipe.id];
    } else {
      getListOfAppliances[appliance.toLowerCase()].push(recipe.id);
    }
 */

/* 
function createCriteriaList_old(listID) {
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();
  // -------

  console.log("list_________ID >>>: ", listID);

  listID.forEach((id) => {
    let currentRecipe = recipes.filter(
      (currentRecipe) => currentRecipe.id === id
    ); //[recipeIndex];
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
    // ----------
    // Recipe Name

    recipesName.push(currentRecipe[0].name);
  });

  console.log("selectedRecipesIngredients", selectedRecipesIngredients);
  selectedRecipesIngredients = [...setOfIngredients].sort();
  selectedRecipesUstensils = [...setOfUstensils].sort();
  selectedRecipesAppliances = [...setOfAppliances].sort();

  
  // templateSelectorUpdate("ingredients", selectedRecipesIngredients);
  // templateSelectorUpdate("appliances", selectedRecipesAppliances);
  // templateSelectorUpdate("ustensils", selectedRecipesUstensils);

  updateCriteriaList("ingredients", selectedRecipesIngredients);
  updateCriteriaList("appliances", selectedRecipesAppliances);
  updateCriteriaList("ustensils", selectedRecipesUstensils);

//  console.log("Ingrédients", selectedRecipesIngredients);
//  console.log("Ustensiles", selectedRecipesUstensils);
//  console.log("Appareils", selectedRecipesAppliances);

//  console.log("Recipe Name: ", recipesName);
} 
*/
