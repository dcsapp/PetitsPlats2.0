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

// S E A R C H  I N P U T  L I S T S
// Recipe IDs from main bar search:
let mainTagList = [];
let mainSearchInputIdList = [];
// Recipe IDs from selectors item / ID
let selectorsTagsList = {}; //[];

// R E S U L T  O F  S E A R C H E S  I N P U T  B O X E S
// List of recipes IDs to be displayed
let selectedRecipes = []; // 52
let listIndex = [];

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
    inputBox, " / ", inputValue);
  
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

// console.log("Full list as array: ", Array.from(fullList));

function dispatchItemBySelectorFromRecipeId(listId) {
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();
  listId.forEach((item) => {
    // ingredient
    fullList(item.toLowerCase);
  });
}

function updateTagList(option, itemSelected) {
  console.log("--  E N T E R I N G  U P D A T E  T A G  L I S T  -- ");
  // option: add or remove the tag info from the tagsList
  //
  // Get the item from full array
  console.log("item list ===>", selectedTagList);
  console.log("fullList ===>", fullList);
  console.log("item selected ===>", itemSelected);
  let tagDetails = fullList[itemSelected];
  // const tagDetails = fullList[0][itemSelected];
  // const tagDetail = fullList[0][itemSelected.toLowerCase()];
  // console.log("tag Detail===>", tagDetail);

  if (option === "add") {
    console.log("++++++++++++ ADDing", itemSelected);
    // 1 - Add the new item to the tagsList array
    console.log("tagDetail: ", tagDetails);

    selectedTagList.push(itemSelected);
    console.log("item list: ", selectedTagList);
    //newTag[itemSelected.toLowerCase()] = tagDetails;
    // console.log("new taaag: ", newTag, typeof newTag)
    // selectorsTagsList.push(newTag);
    selectorsTagsList[itemSelected.toLowerCase()] = tagDetails;

    console.log("tag List ADD ===> : ", selectorsTagsList);
    // 2 - Update list of recipes
    // => get intersection of current recipes and new tag recipe(s)
    // updateSelectedRecipes();
    updateSelectedRecipes(tagDetails);
  }

  if (option === "remove") {
    console.log("++++++++++++ REMOVing", itemSelected, selectorsTagsList);
    // 1 - Delele the tag from selectorsTagsList:
    // console.log("selectorsTagsList BEFORE: ", selectorsTagsList);
    delete selectorsTagsList[`${itemSelected.toLowerCase()}`];
    console.log("selectorsTagsList AFTER: ", selectorsTagsList);
    console.log(
      "selectorsTagsList AFTER length: ",
      Object.keys(selectorsTagsList).length
    );
    // 2 - remove from tagsList
    // selectorsTagsList.splice(index, 1);
    if (Object.keys(selectorsTagsList).length === 0) {
      console.log("E M P T Y ");
      tagDetails.length = 0;
    }
    if (Object.keys(selectorsTagsList).length === 1) {
      console.log("tagDetails :", Object.values(selectorsTagsList)[0]);
      tagDetails = Object.values(selectorsTagsList)[0];

      //tagDetails = fullList[itemSelected.toLowerCase()];
      // console.log("TTTTT ============== TTTTTTTT", tagDetails, "item", itemSelected, "tytyty: ", tytyty)
    }
    console.log("selectorsTagsList: ", selectorsTagsList); // [`${itemSelected.toLowerCase()}`]);
    console.log("tagDetails :", tagDetails);

    // get items in item lists
    // delete selectedTagList[`${itemSelected.toLowerCase()}`];
    // console.log("item list after deletion: ", selectedTagList)

    updateSelectedRecipes(tagDetails);
    closeAllSelectors();
  }
}


function compare (mergedArray){
  console.log("M E R GE D A R R A Y", mergedArray)
  const intersection = new Set();
      for (id1 in mergedArray) {
        for (id2 in mergedArray) {
          if (id1 === id2) {
            continue;
          } else {
            if (mergedArray[id1] === mergedArray[id2]) {
              intersection.add(mergedArray[id1]);
            }
          }
        }
      }
     console.log("listIndex =", [...intersection]);
     return [...intersection];
}


function updateSelectedRecipes(tagDetails) {
  console.log(
    "----  E N T E R I N G  U P D A T E  S E L E C T E D  R E C I P E S -----"
  );
  // tagDetail: recipe(s) ID of the current selected tag
  //
  // Search starting from selectors
  // tagDetails feeds listIndex
  //
  // Case - search from main bar
  
  if (listIndex.length === 0 || Object.keys(selectorsTagsList).length === 1) {
    console.log("list index: ", listIndex, "hhhh",  Object.keys(selectorsTagsList).length)
    // listIndex = [...selectorsTagsList];
    if(mainSearchInputIdList.length > 0 && listIndex.length >= 1) {
      const mergedArray = [...listIndex, ...tagDetails];
      console.log("merged", mergedArray)
      // duplicated ID(s) are retrieve o get the new listIndex
      listIndex = compare(mergedArray)
    }
    console.log("list compred", listIndex)
    // listIndex = [...tagDetails];
    console.log(
      "<<<<<<<<<<<< == Search starting at selector 1st tag ==== >>>>>>>>>>",
      listIndex,
      selectorsTagsList
    );
    //  createCriteriaList(listIndex);
    //  displayRecipes(listIndex);
  } else {
    // A listIndex already exists:
    // - from a mainSearchBox or
    // - from a previous tag selection
    // ==> Get only recipe(s) IDs with the same ID
    // listIndex is always update and it is compared with the new ID
    //
    // tagDetails are added to the current listIndex
    console.log("...listIndex, ...tagDetails", listIndex, tagDetails);
    if (tagDetails.length === 0) {
      // If no tag get id from main searchbar if any
      listIndex = [...mainSearchInputIdList];
      console.log("list index updated", listIndex);
    } else {
      const mergedArray = [...listIndex, ...tagDetails];
      // duplicated ID(s) are retrieve o get the new listIndex
      const intersection = new Set();
      for (id1 in mergedArray) {
        for (id2 in mergedArray) {
          if (id1 === id2) {
            continue;
          } else {
            if (mergedArray[id1] === mergedArray[id2]) {
              intersection.add(mergedArray[id1]);
            }
          }
        }
      }
      listIndex = [...intersection]; // listIndex = array from set intersection
      console.log("mergedArray", mergedArray);
      console.log("intersection:", [...intersection]);
      console.log("listIndex:", listIndex);
    }
  }
  console.log("S I Z E  O F  C R I T E R I A ", listIndex.length);
  createCriteriaList(listIndex);
  if (listIndex.length === 0) {
    updateAllCriteriaLists();
  }
  displayRecipes(listIndex);
  displayNumberOfRecipes(listIndex.length);
  closeAllSelectors();
}

function getDuplicatesRecipesID(dataArray) {
  console.log("I N  get dup ");
  let uniqueItemsList = new Set();
  let duplicated = [];
  for (let i = 0; i < dataArray.length; i++) {
    if (uniqueItemsList.has(dataArray[i])) {
      duplicated.push(dataArray[i]);
      console.log("zzzz ===>: ", duplicated);
    }
    uniqueItemsList.add(dataArray[i]);
    console.log("unique ===>: ", uniqueItemsList);
  }
  return [...new Set(duplicated)];
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
  listID.forEach((id) => {
    const recipeModel = recipeCardTemplate(id);
    const recipeCard = recipeModel.getRecipeCard();
    recipeDisplaySection.appendChild(recipeCard);
  });
}






// Retrieve Ingredients / Ustensils / Appliances from recipes
// get from mainbar search
function createCriteriaList(listID) {
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();

  listID.forEach((id) => {
    setOfAppliances.add(...newRecipes[id].appliance);
    setOfUstensils.add(...newRecipes[id].ustensils);
    setOfIngredients.add(newRecipes[id].ingredients);
  });

  selectedRecipesIngredients = [...setOfIngredients].flat().sort();
  selectedRecipesUstensils = [...setOfUstensils].flat().sort();
  selectedRecipesAppliances = [...setOfAppliances].sort();
  updateCriteriaList("ingredients", selectedRecipesIngredients);
  updateCriteriaList("appliances", selectedRecipesAppliances);
  updateCriteriaList("ustensils", selectedRecipesUstensils);
}






function createCriteriaList_includingTags(listID) {
  console.log(
    "++++++++++++++++++ createCriteriaList_includingTags +++++++++++++++++++++++"
  );
  const setOfIngredients = new Set();
  const setOfAppliances = new Set();
  const setOfUstensils = new Set();
  // -------
  const recipesName = [];
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

  /* 
  templateSelectorUpdate("ingredients", selectedRecipesIngredients);
  templateSelectorUpdate("appliances", selectedRecipesAppliances);
  templateSelectorUpdate("ustensils", selectedRecipesUstensils);
 */

  updateCriteriaList("ingredients", selectedRecipesIngredients);
  updateCriteriaList("appliances", selectedRecipesAppliances);
  updateCriteriaList("ustensils", selectedRecipesUstensils);
  /* 
  console.log("Ingrédients", selectedRecipesIngredients);
  console.log("Ustensiles", selectedRecipesUstensils);
  console.log("Appareils", selectedRecipesAppliances);
   */
  //
  console.log("Recipe Name: ", recipesName);
}





function createCriteriaListByItems(listItems, inputBox, inputValue) {
  console.log(
    "----  E N T E R I N G  C R E A T E  C R I T E R I A  L I S T  B Y  N A M E -----"
  );
  console.log("createCriteriaListByItems ==> 1,", listItems);
  console.log("createCriteriaListByItems ==> 2,", inputBox);
  console.log("createCriteriaListByItems ==> 3,", inputValue);

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
    // selectedRecipesIngredients = [...setOfIngredients].sort();
    // updateCriteriaList("ingredients", selectedRecipesIngredients);

    case "ustensils":
      for (const [key, value] of Object.entries(listOfUstensils)) {
        if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
          console.log(
            "// ingredient added to the list Ustensils =================="
          );
          setOfUstensils.add(`${key}`);
        }
      }
    // selectedRecipesUstensils = [...setOfUstensils].sort();
    // updateCriteriaList("ustensils", selectedRecipesUstensils);

    case "appliances":
      for (const [key, value] of Object.entries(listOfAppliances)) {
        if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
          console.log(
            "// ingredient added to the list Appliances =================="
          );
          setOfAppliances.add(`${key}`);
        }
      }
    // selectedRecipesAppliances = [...setOfAppliances].sort();
    // updateCriteriaList("appliances", selectedRecipesAppliances);

    default:
      console.log("erreur");
  }

  selectedRecipesIngredients = [...setOfIngredients].sort();
  updateCriteriaList("ingredients", selectedRecipesIngredients);
  selectedRecipesUstensils = [...setOfUstensils].sort();
  updateCriteriaList("ustensils", selectedRecipesUstensils);
  selectedRecipesAppliances = [...setOfAppliances].sort();
  updateCriteriaList("appliances", selectedRecipesAppliances);

  console.log("E N D ==============>>>>");
}

// =========== S T A N D  B Y ================================================= //
/* 
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
 */

// ======================================================================= //

function retrieveRecipes5(inputValue, inputBox) {
  console.log("E N T E R I N G  R E T R I E V E  R E C I P E S : ", inputBox);
  console.log("inputValue: ", inputValue);
  console.log("inputBox: ", inputBox);
  // Input Box:
  // mainSearchInput: ingredients / name / description
  // ingredients: ingredients
  // appliances: appliances
  // ustensils: ustensils

  let recipeIDing = new Set(); // ID list of selected recipes / unique
  let recipeIDust = new Set();
  let recipeIDapp = new Set();
  let recipeIDmain = new Set();
  let recipeIDmerged = new Set();

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
          recipeIDing.add(recipe.id);
        }
      });
      // Retrieve ustensils
      recipe.ustensils.forEach((item) => {
        if (item.toLowerCase().includes(searchString.toLowerCase())) {
          recipeIDust.add(recipe.id);
        }
      });
      // Retrieve appliance
      if (recipe.appliance.toLowerCase().includes(searchString.toLowerCase())) {
        recipeIDapp.add(recipe.id);
      }
      // If search comes from main search bar
      if (criteriaBox === "mainSearchInput") {
        if (
          recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchString.toLowerCase())
        ) {
          recipeIDing.add(recipe.id);
          // recipeIDmain.add(recipe.id);
        }
      }
    });
  });

  switch (inputBox) {
    case "ingredients":
      console.log("// Retrieve ingredients", criteriaBox);
      displayNumberOfRecipes([...recipeIDing].length);
      createCriteriaList([...recipeIDing]);
      return [...recipeIDing];
    case "ustensils":
      console.log("// Retrieve ustensils", criteriaBox);
      displayNumberOfRecipes([...recipeIDust].length);
      createCriteriaList([...recipeIDust]);
      return [...recipeIDust];
    case "appliances":
      console.log("// Retrieve appliance", criteriaBox);
      displayNumberOfRecipes([...recipeIDapp].length);
      createCriteriaList([...recipeIDapp]);
      return [...recipeIDapp];
    case "mainSearchInput":
      console.log("// Retrieve default", criteriaBox);
      displayNumberOfRecipes([...recipeIDing].length);
      createCriteriaList([...recipeIDing]);
      return [...recipeIDing];
    default:
      console.log("Error...");
  }
  // displayNumberOfRecipes([...recipeIDing].length);
  // return [...recipeIDing];
  //return [...recipeID];
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

// console.log("------ selected R E C I P E S: ", listIndex);
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
    listIndex = [...selectorsTagsList];
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