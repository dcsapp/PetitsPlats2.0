// M A I N . J S  =============================================

function updateData(transmitted_value = null) {
  /* 
    // this function is triggered when:
    // - data are inserted in input fields (main or selelectors) 
    //   => implies "recipesListIds" modified
    // - tag is "added" or "removed"
    //
    // this function is triggered from:
    //
    // Refresh is based on selected recipes ID selected.
    // Selection is based on :
    // - selected recipes ID
    // 
  
    // It updates
    // dropdown item available
    // recipes displayed 
    - 
    */
  console.log("  ======== U P D A T E  F U L L  D A T A ================");
  console.log("Transmitted value", transmitted_value);
  console.log("tagRecipeIdList", tagRecipeIdList);
}

// =========== T R A S H ================================================= //
// ======================================================================= //

//

/* 
  function selectLi(selectedItem) {
    console.log("enter S E L E C T  li", selectedItem);
    // console.log("tag not selected");
  
    // if selected item in list is not selected
    // item tag is created
    //                createTag(selectedItem.dataset.criteriaLi);
    // selected item status updated to true
    // ===> selectedItem.dataset.selected = "true";
    // selected item background color changed to yellow and font weight to bold (700)
    // ===> selectedItem.style.background = "#ffd700";
    // ===> selectedItem.style.fontWeight = "700";
    // // xmark displayed
    // ===> selectedItem.children[1].classList.toggle("hide");
    return;
  }
   
  function unSelectLi(selectedItem) {
    // console.log("enter U N S E L E C T li: ", selectedItem);
    // console.log("click on tag already selected");
  
    // If selected item is clicked again:
    // yellow background color font weight bold are removed
    // ===> selectedItem.style.background = "";
    // ===> selectedItem.style.fontWeight = "400";
    // xmark is hidden
    // ===> selectedItem.children[1].classList.toggle("hide");
    // selected item status is reverted to false
    // ===> selectedItem.dataset.selected = "false";
    return;
  }
  */

/* 
  function removeTag(selectedItem) {
    const tagToRemove = document.querySelector(
      `[data-criteria-tag = "${selectedItem}"]`
    );
    tagToRemove.remove();
  }
   */
// ====================================================

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

// ====================================================================================

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

// let lower = {}
let filteredArray = Object.keys(selectorsTagsList).filter(
  (e) => e !== itemSelected.toLowerCase()
);

let lower = itemSelected.toLowerCase();

const tempo = Object.entries(selectorsTagsList);
const filtered2 = tempo.filter(
  ([key, value]) => key != itemSelected.toLowerCase()
);
console.log("filtered2 ====: ", Object.fromEntries(filtered2));
/* 
   const obj = {
       name: 'Luke Skywalker',
       title: 'Jedi Knight',
       age: 23
     };
     
     // Convert `obj` to a key/value array
     // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
     const asArray = Object.entries(obj);
     
     const filtered = asArray.filter(([key, value]) => typeof value === 'string');
     
     // Convert the key/value array back to an object:
     // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
     const justStrings = Object.fromEntries(filtered);
*/

function retrieveRecipes66(inputValue, inputBox) {
  let currentRecipes = new Set();
  let searchString = inputValue;

  console.log("44444444444");

  switch (inputBox) {
    case "ingredients":
    case "ustensils":
    case "appliance":
      Object.keys(fullList).forEach((item) => {
        //console.log(item)
        // console.log(str1.match(/^abc$/))
        //console.log(str2.match(/^abc$/))
        let cleanText = searchString.toLowerCase();
        if (item.toLowerCase().match(`/^${cleanText}$/`)) {
          // if (item.toLowerCase().match(/^`${searchString}.toLowerCase()`$/)){
          //=== searchString.toLowerCase()) {
          // if (item.toLowerCase() === searchString.toLowerCase()) {
          // if (item.toLowerCase().startsWith(searchString.toLowerCase())) {
          return console.log("result: ", item); // (str1.startsWith('Sat'));
        } else {
          console.log("no match...", cleanText, "//", item.toLowerCase());
        }
      });
      break;

    default:
      console.log("ee");
  }
}
// console.log("Full list :", fullList);
// retrieveRecipes66("Banane", "ingredients")
// console.log("T E S T   T E S T :", retrieveRecipes44("Ba", "ingredients"));

// console.log("recipe.appliance;", newRecipes)
// ===================================================================

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
      console.log("// mainSearchInput", inputBox);
      displayNumberOfRecipes([...currentRecipes].length);
      // createCriteriaList([...currentRecipes]);
      return [...currentRecipes];
  }
}






const trtr = {
  a: [1, 2, 3, 4, 5, 6, 7],
  b: [1, 12, 13, 14, 15, 16, 17],
  c: [1, 22, 23, 24, 25, 26, 27],
  d: [1, 32, 33, 34, 35, 36, 37],
  e: [12, 23, 34, 7, 17, 27, 37],
};

let myArr = [];
myArr = mergeList(trtr);
getDupeIds(myArr);
listSelectors = {};

function updateSelectedRecipes2(option, itemSelected) {
  // data received: item name criteriaLi
  let mergedArray = [];

  // let tryTest = [];
  tagRecipeIdList = fullList[itemSelected];
  console.log("====== ++++ ===== tagRecipeIdList: ", tagRecipeIdList);
  console.log("itemSelected", itemSelected, "/", recipesListIds);
  console.log("fullTagsList first ======>", fullTagsList);
  console.log("full list: ", fullList);
  console.log("tagRecipeIdList: ", tagRecipeIdList);
  //
  //
  tutu = [];
  tryTest[itemSelected.toLowerCase()] = fullList[itemSelected];
  console.log("===== try test ===", Object.values(tryTest)[0]);
  console.log("===== tutu", (tutu = [...Object.values(tryTest)[0]]));

  //
  console.log(
    "----  E N T E R I N G  U P D A T E  S E L E C T E D  R E C I P E S -----"
  );
  // ====================  A D D E D   T A G   ========================
  //
  // Case 1 - O N L Y  O N E  T A G  S E L E C T E D
  // no "mainSearchInputIdList"
  // and no "recipesListIds"
  // one tag in "fullTagsList"
  //
  // => "recipesListIds" = "tagRecipeIdList"
  // RMK no comparation needed
  //
  // Case 2 - M O R E  T H A N  O N E  T A G  S E L E C T E D
  //          A N D  O N L Y  T A G S  A R E  S E L E C T E D
  // no "mainSearchInputIdList"
  // => X update "fullTagsList"
  // => add "tagRecipeIdList" to "recipesListIds"
  // => compare and update "recipesListIds"
  //
  // Case 3 - A  "mainSearchInputIdList" E X I S T S
  // => update "fullTagsList"
  // => merge "tagRecipeIdList" to "recipesListIds"
  // => compare and update "recipesListIds"
  //
  // F O R  A L L  C A S E S
  // => update dropdown list
  // => displayRecipes(recipesListIds);
  // => displayNumberOfRecipes(recipesListIds.length);
  // => closeAllSelectors();
  //
  //
  // ====================  R E M O V E D   T A G   ====================
  // Case 1 - O N L Y  O N E  T A G  I S  D I S P L A Y E D
  // no "mainSearchInputIdList"
  // one tag in "fullTagsList"
  // list "fullTagsList" is emptied
  // list "recipesListIds" is emptied
  //
  // Case 2 - M O R E  T H A N  O N E  T A G  I S  D I S P L A Y E D
  //          A N D  O N L Y  T A G S  A R E  D I S P L A Y E D
  // no "mainSearchInputIdList"
  // list "fullTagsList" is emptied
  switch (option) {
    case "added":
      // Case 1 - O N L Y  O N E  T A G  S E L E C T E D
      fullTagsList[itemSelected.toLowerCase()] = tagRecipeIdList;
      console.log(
        "case 1: ",
        mainSearchInputIdList.length,
        recipesListIds.length,
        Object.keys(fullTagsList).length,
        recipesListIds,
        "/sel: ",
        fullTagsList
      );
      if (
        mainSearchInputIdList.length === 0 &&
        recipesListIds.length === 0 &&
        Object.keys(fullTagsList).length === 1
      ) {
        console.log("I N  case 1: ");
        recipesListIds = [...tagRecipeIdList];
        console.log("I N  case 1 recipesListIds: ", recipesListIds);
        /* createCriteriaList(recipesListIds);
        displayRecipes(recipesListIds);
        displayNumberOfRecipes(recipesListIds.length); */
/*         
    } else if (
        // Case 2 - M O R E  T H A N  O N E  T A G  S E L E C T E D
        //          A N D  O N L Y  T A G S  T A G S  S E L E C T E D
        (mainSearchInputIdList.length === 0 &&
          recipesListIds.length > 0 &&
          Object.keys(fullTagsList).length > 1,
        "/ tagL: ",
        fullTagsList)
      ) {
        console.log("I N  case 2: ");
        mergedArray = [...recipesListIds, ...tagRecipeIdList];
        console.log("avant merge", recipesListIds);
        recipesListIds = compare(mergedArray);
        console.log("après merge", recipesListIds);
      } else if (
        // Case 3 - A  L I S T  "mainSearchInputIdList" E X I S T S
        // ========================================================
        (mainSearchInputIdList.length > 0 &&
          recipesListIds.length > 0 &&
          Object.keys(fullTagsList).length >= 0,
        "/ main: ",
        mainSearchInputIdList,
        "/ tagL: ",
        fullTagsList)
      ) {
        console.log("I N  case 3: ");
        mergedArray = [...recipesListIds, ...tagRecipeIdList];
        console.log("avant merge", recipesListIds);
        recipesListIds = compare(mergedArray);
        console.log("après merge", recipesListIds);
      }
      createCriteriaList(recipesListIds);
      displayRecipes(recipesListIds);
      displayNumberOfRecipes(recipesListIds.length);
      closeAllSelectors();
      break;

    case "removed":
      // Case 1 - O N L Y  O N E  T A G  I S  D I S P L A Y E D
      // fullTagsList[itemSelected.toLowerCase()] = tagRecipeIdList;
      if (
        mainSearchInputIdList.length === 0 &&
        recipesListIds.length > 0 &&
        Object.keys(fullTagsList).length === 1
      ) {
        console.log(
          "case 1: removed",
          mainSearchInputIdList.length,
          recipesListIds.length,
          Object.keys(fullTagsList).length,
          fullTagsList
        );
        recipesListIds = [];
        fullTagsList = {};
        console.log("fullTagsList", fullTagsList, recipesListIds);
      } else if (
        // Case 2 - M O R E  T H A N  O N E  T A G  I S  D I S P L A Y E D
        //          A N D  O N L Y  T A G S  A R E  D I S P L A Y E D
        mainSearchInputIdList.length === 0 &&
        recipesListIds.length > 0 &&
        Object.keys(fullTagsList).length > 1
      ) {
        console.log(
          "case 2: removed",
          mainSearchInputIdList.length,
          recipesListIds.length,
          Object.keys(fullTagsList).length,
          fullTagsList
        );
        console.log("Before: ", fullTagsList, "/", itemSelected.toLowerCase());
        // Update fullTagsList - remove the itemSelected
        delete fullTagsList[`${itemSelected}`.toLowerCase()];
        console.log("After: ", fullTagsList, "/");
        if (Object.keys(fullTagsList).length === 1) {
          recipesListIds = Object.values(fullTagsList)[0];
          console.log("One tag remaining", recipesListIds);
        } else if (Object.keys(fullTagsList).length > 1) {
          console.log(
            "2 or more tags remaining",
            fullTagsList,
            "/ ",
            fullTagsList.length
          );
          for (let i = 0; i < Object.values(fullTagsList).length; i++) {
            console.log("iiiiiii: ", Object.values(fullTagsList)[i]);
            mergedArray = [
              ...recipesListIds,
              ...Object.values(fullTagsList)[i],
            ];
            console.log("mergedArray: ", mergedArray);
          }
          recipesListIds = [...new Set(mergedArray)];
          console.log("après merge", recipesListIds);
        }
      } else if (
        // Case 3 - A  L I S T  "mainSearchInputIdList" E X I S T S
        // ========================================================
        mainSearchInputIdList.length > 0 // &&
        // recipesListIds.length > 0 &&
        // Object.keys(fullTagsList).length >= 0
      )
        console.log(
          "/ remove case 3 ",
          "/ main: ",
          mainSearchInputIdList,
          "/ tagL: ",
          fullTagsList,
          "/ recI: ",
          recipesListIds
        );
      {
        console.log("case 3 remove ", Object.values(fullTagsList));
        if (Object.values(fullTagsList).length === 1) {
          fullTagsList = {};
          recipesListIds = [...mainSearchInputIdList];
          console.log("après case 3", recipesListIds);
        } else {
          delete fullTagsList[`${itemSelected}`.toLowerCase()];
          console.log("After delete");
          for (let i = 0; i < Object.values(fullTagsList).length; i++) {
            console.log("iiiiiii: ", Object.values(fullTagsList)[i]);
            mergedArray = [
              ...recipesListIds,
              ...Object.values(fullTagsList)[i],
            ];
            console.log("mergedArray: case 3 ", mergedArray);
          }
          recipesListIds = [...new Set(mergedArray)];
          console.log("après merge 333", recipesListIds);

          console.log("fullTagsList:", fullTagsList);
          console.log("????? ?????");
        }
      }
      if (
        mainSearchInputIdList.length === 0 &&
        recipesListIds.length === 0 &&
        Object.keys(fullTagsList).length === 0
      ) {
        console.log("=========  N O T H I N G  T O  D I S P L A Y =======");
        updateAllCriteriaLists();
        displayRecipes(recipesListIds);
        displayNumberOfRecipes(0);
        closeAllSelectors();
      } else {
        console.log("=========  K E E P  G O I N G ... =======");
        createCriteriaList(recipesListIds);
        displayRecipes(recipesListIds);
        displayNumberOfRecipes(recipesListIds.length);
      }
      break;

    default:
      console.log("Error...");
 }
 */
/* 
    if (
      recipesListIds.length === 0 ||
      Object.keys(fullTagsList).length === 1
    ) {
      console.log(
        "list index: ",
        recipesListIds,
        "hhhh",
        Object.keys(fullTagsList).length
      );
      // recipesListIds = [...fullTagsList];
      if (mainSearchInputIdList.length > 0 && recipesListIds.length >= 1) {
        const mergedArray = [...recipesListIds, ...tagRecipeIdList];
        console.log("merged", mergedArray);
        // duplicated ID(s) are retrieve o get the new recipesListIds
        recipesListIds = compare(mergedArray);
      }
      console.log("list compred", recipesListIds);
      // recipesListIds = [...tagRecipeIdList];
      console.log(
        "<<<<<<<<<<<< == Search starting at selector 1st tag ==== >>>>>>>>>>",
        recipesListIds,
        fullTagsList
      );
      //  createCriteriaList(recipesListIds);
      //  displayRecipes(recipesListIds);
    } else {
      // A recipesListIds already exists:
      // - from a mainSearchBox or
      // - from a previous tag selection
      // ==> Get only recipe(s) IDs with the same ID
      // recipesListIds is always update and it is compared with the new ID
      //
      // tagRecipeIdList are added to the current recipesListIds
      console.log(
        "...recipesListIds, ...tagRecipeIdList",
        recipesListIds,
        tagRecipeIdList
      );
      if (tagRecipeIdList.length === 0) {
        // If no tag get id from main searchbar if any
        recipesListIds = [...mainSearchInputIdList];
        console.log("list index updated", recipesListIds);
      } else {
        const mergedArray = [...recipesListIds, ...tagRecipeIdList];
        // duplicated ID(s) are retrieve o get the new recipesListIds
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
        recipesListIds = [...intersection]; // recipesListIds = array from set intersection
        console.log("mergedArray", mergedArray);
        console.log("intersection:", [...intersection]);
        console.log("recipesListIds:", recipesListIds);
      }
    }
    console.log("S I Z E  O F  C R I T E R I A ", recipesListIds.length);
    createCriteriaList(recipesListIds);
    if (recipesListIds.length === 0) {
      updateAllCriteriaLists();
    }
    displayRecipes(recipesListIds);
    displayNumberOfRecipes(recipesListIds.length);
    closeAllSelectors();
  
   */
//}

function updateTagList(option, itemSelected) {
  //
  // A tag with value "itemSelected has been option "added" or "removed"
  // - the associated recipe id list is retrieved in "tagRecipeIdList"

  // - if  a d d
  // - the new itemSelected is added to the "tagsList" array
  //
  console.log("--  E N T E R I N G  U P D A T E  T A G  L I S T  -- ");

  // Get the item from full array
  console.log("item list ===>", selectedTagList);
  console.log("fullList ===>", fullList);
  console.log("item selected ===>", itemSelected);
  // let tagRecipeIdList = fullList[itemSelected];
  tagRecipeIdList = fullList[itemSelected];
  // const tagRecipeIdList = fullList[0][itemSelected];
  // const tagDetail = fullList[0][itemSelected.toLowerCase()];
  // console.log("tag Detail===>", tagDetail);

  if (option === "added") {
    console.log("++++++++++++ ADDing", itemSelected);
    console.log("tagDetail: ", tagRecipeIdList);
    //
    // ======>    selectedTagList.push(itemSelected);
    //
    console.log("item list: ", selectedTagList);
    //newTag[itemSelected.toLowerCase()] = tagRecipeIdList;
    // console.log("new taaag: ", newTag, typeof newTag)
    // fullTagsList.push(newTag);
    fullTagsList[itemSelected.toLowerCase()] = tagRecipeIdList;

    console.log("tag List ADD ===> : ", fullTagsList);
    // 2 - Update list of recipes
    // => get intersection of current recipes and new tag recipe(s)
    // updateSelectedRecipes();
    updateSelectedRecipes(tagRecipeIdList);
  }

  if (option === "removed") {
    console.log("++++++++++++ REMOVing", itemSelected, fullTagsList);
    // 1 - Delele the tag from fullTagsList:
    // console.log("fullTagsList BEFORE: ", fullTagsList);
    delete fullTagsList[`${itemSelected.toLowerCase()}`];
    console.log("fullTagsList AFTER: ", fullTagsList);
    console.log(
      "fullTagsList AFTER length: ",
      Object.keys(fullTagsList).length
    );
    // 2 - remove from tagsList
    // fullTagsList.splice(index, 1);
    if (Object.keys(fullTagsList).length === 0) {
      console.log("E M P T Y ");
      tagRecipeIdList.length = 0;
    }
    if (Object.keys(fullTagsList).length === 1) {
      console.log("tagRecipeIdList :", Object.values(fullTagsList)[0]);
      tagRecipeIdList = Object.values(fullTagsList)[0];

      //tagRecipeIdList = fullList[itemSelected.toLowerCase()];
      // console.log("TTTTT ============== TTTTTTTT", tagRecipeIdList, "item", itemSelected, "tytyty: ", tytyty)
    }
    console.log("fullTagsList: ", fullTagsList); // [`${itemSelected.toLowerCase()}`]);
    console.log("tagRecipeIdList :", tagRecipeIdList);
    updateSelectedRecipes(tagRecipeIdList);
    closeAllSelectors();
  }
}

// Get
function compare(mergedArray) {
  console.log("M E R G E D  A R R A Y", mergedArray);
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
  console.log("recipesListIds =", [...intersection]);
  return [...intersection];
}

function getData2(e) {
  // Get inputValue origin: mainSearch / ingredients / appliances / ustensils
  let inputBox = e.target.dataset.name;
  let inputBoxClassName = `${inputBox}CloseCross`;
  console.log("e.target: ", e.target.parentElement.children[0]);
  console.log("e.target_value: ", e.target.closest("input").value);
  console.log("inputBox: ", inputBox);
  console.log("inputBoxClassName: ", inputBoxClassName);
  //
  // Get value inserted in input field
  let inputValue = e.target.parentElement.children[0].value;
  console.log("key pressed: ", inputValue);

  console.log("S I Z E  O F :", inputValue.length);
  // Display reset field cross when a caracter is typed in field
  if (inputValue.length > 0) {
    displayResetCross(inputBoxClassName, "ON");
  } else {
    displayResetCross(inputBoxClassName, "OFF");
  }
  //
  // Case of insertion in main search bar
  // - Search begins with at least 3 caracters are inserted
  if (inputBox === "mainSearchInput") {
    if (inputValue.length < 3) {
      recipesListIds.length = 0;
      recipesListIds = 0;
      mainSearchInputIdList = 0;
    } else {
      recipesListIds = retrieveRecipes(inputValue, inputBox);
      console.log("list  I N D E X: ", recipesListIds);
      if (recipesListIds.length === 0) {
        displayNoRecipeFound(inputValue);
      }
      mainSearchInputIdList = [...recipesListIds];
      //console.log("mainSearchInputIdList: ", mainSearchInputIdList);
      createCriteriaList(recipesListIds);
      // createCriteriaListByItems(recipesListIds, inputBox, inputValue)
    }
    displayRecipes(recipesListIds);
    // Case of insertion in selectors
  } else {
    console.log(
      "E N T E R I N G  S E L E C T O R S  I N P U T  B O X: ",
      inputBox
    );
    /* 
      // search on specific selector: ingredient
      const listItems = retrieveItems(inputValue, inputBox);
      console.log("list  I T E M S: ", listItems);
      console.log("I N P U T  B O X: ", inputBox);
      createCriteriaListByItems(listItems, inputBox, inputValue);
      displayRecipes(recipesListIds);
   */
    // const listItems = retrieveItems(inputValue, inputBox);
    // ========== >  recipesListIds = retrieveRecipes(inputValue, inputBox);
    console.log("list  I T E M S: ", recipesListIds);
    console.log("I N P U T  B O X: ", inputBox);
    // createCriteriaListByItems(recipesListIds, inputBox, inputValue);
    //createCriteriaList(recipesListIds);
    // createCriteriaList_includingTags(recipesListIds);
    createCriteriaListByItems(recipesListIds, inputBox, inputValue);
    /* 
      if (inputValue.length > 2) {
        displayRecipes(recipesListIds);
      }
       */
  }
}

function retrieveRecipes2(inputValue, inputBox) {
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
      console.log("R E T R I E V E  R E C I P E S - mainSearchInput", [
        ...currentRecipes,
      ]);
      return [...currentRecipes];
    default:
      console.log("Error...");
  }
}

/* 
function resetInputField(e) {
  let resetSearchCross = e.target.closest(".closeCross");
  if (!resetSearchCross) return;

  if (resetSearchCross) {
    console.log("cross click!!!!!!......");
    let inputToBremoved = e.target.closest("div").children[0].dataset.name;
    console.log("cross inputToBremoved", inputToBremoved)//.dataset.name);

    inputToBremoved.value = "";
    resetSearchCross.style.display = "none";
    if (resetSearchCross.classList.contains("mainSearchInputCloseCross")) {
      console.log("========= mainSearchInputCloseCross clicked ========");
      resetSearch(); // clean all the data and close all selectors
    } else {
      // console.log("S E L E C T O R  input box", e.target.closest("div").children[0]); //.children[0]);
      console.log("S E L E C T O R  input box", inputToBremoved);
      updateCriteriaList(inputToBremoved, localSearch);
      
      // updateAllCriteriaLists();
      inputToBremoved.value = "";

      // document.getElementById("recipesSelected").replaceChildren();
      // displayNumberOfRecipes(0);
      // closeAllSelectors();
    }
  }
  // console.log("input: ", inputName.parentElement.si);// e.target.closest("div").children[0].value="")
  // console.log("input: ", e.target.closest("div").children[0].value="")
}
 */

/* 
const searchFields = document.querySelectorAll(".main__searchBar");
console.log("searchFields = ", searchFields);
 */
/* =================------ T R A S H ------============ */

/* 
function clearInputField(e) {
  const selectedField = (e.target.closest(
    "span"
  ).parentElement.parentElement.children[0].value = "");
  // console.log("cross clear input Selected field: ", e.target.closest("span"));
  console.log("cross clear input Selected field: ", selectedField);
  // Hide cross icon
  selectedField.closest("span").style.display = "none";
  // e.target.closest("span").style.display = "none";

  // Suppress displayed recipes
  document.getElementById("recipesSelected").replaceChildren();
  closeAllSelectors();
  updateAllCriteriaLists();
  displayNumberOfRecipes(0);
}
 */

/* 
console.log(("etarget", e.target));
  if (e.target.closest("body")) {
    console.log("============ 88888888 ============", e.target.closest())
    const allSelectors = document.querySelectorAll(".ctra")
    allSelectors.forEach((ct) => {
     //    console.log(
       //  const cls = ct.children[0].classList;
        if(ct.children[0].classList.contains("expand")) {
            ct.children[0].classList.remove("expand")
        }
  })}

 */

/*  if(e.target.closest("span").matches(".closeCross")) {
        console.log("hellooooooo!!!", )
    } */
/*     let currentInputBox = e.target.closest("span");
    let testy = e.target.closest(".searchInput")
    // .children[0].value;
    
    console.log("hellooooooo!!!", testy, currentInputBox) */
// }
/* 
function clearInputCleared(e) {
  let inputField = e.target;
  if(e.target.matches(".fa-xmark")) {
    console.log("Y E S")
    e.target.closest(".searchBar").children[0].value="";
    let toto = e.target.closest("div")//.classList.add(".hide")//.add(".hide")
    // clearInput.style.display = "none";
    console.log("toto: ", toto);
  }
*/
/* let toto = e.target.closest("input");
  console.log("body click: ", inputField) */

// ====== old ======
/* 
  if (inputValue.length >= 3) {
    let recipesListIds = retrieveRecipes(inputValue, inputBox);
    console.log("list index: ", recipesListIds);
    displayRecipes(recipesListIds);
    createCriteriaList(recipesListIds);
  } else {
    createCriteriaList([]);
    recipesSelected.innerHTML = "Aucune recette sélectionnée...";
  }
  */
// ====== old ======

/* 

function expandDropBox2(e) {
  let tre = e.target.closest(".criteria__header");
  console.log("etarget........",tre);

  if (e.target.matches(".criteria__header")) {
    // pointer-event disabled for p and span
    // arrow rotation
    
    closeAllSelectors();
    e.target.children[1].firstElementChild.classList.toggle("criteria__open");
    // dropdown expand
    e.target.closest(".criteriaWrapper").classList.toggle("expand");
  }
}
 */

/* 
  if (inputValue.length >= 3) {
    console.log("3 S I Z E  O F :", inputValue.length);
    // Check input location
    // Main search bar or one of the dropbox selector
    if (inputBox === "mainSearchInput") {
      recipesListIds = retrieveRecipes(inputValue, inputBox);
      console.log("list  I N D E X: ", recipesListIds);
      mainSearchInputIdList = [...recipesListIds];
      console.log("mainSearchInputIdList: ", mainSearchInputIdList)
      createCriteriaList(recipesListIds);
      displayRecipes(recipesListIds);
    } else {
      // search on specific selector: ingredient
      const listItems = retrieveItems(inputValue, inputBox);
      console.log("list  I T E M S: ", listItems);
      console.log("I N P U T  B O X: ", inputBox);
      createCriteriaListByItems(listItems, inputBox, inputValue);
    }
  }
 */

/* 
function expandDropBox(e) {
  let arrowOpenClose = e.target.closest(".criteria__header"); //.children[1];
  console.log("C R I T E R I A  H E A D E R ", arrowOpenClose); //.children);
  // Close the dropbox if it is clicked and already open
  if (arrowOpenClose.children[0].classList.contains("criteria__open")) {
    console.log("C R I T E R I A");
    closeAllSelectors();
  } else {
    if (e.target.closest(".criteria__header")) {
      // pointer-event disabled for p and span
      // arrow rotation
      closeAllSelectors();
      arrowOpenClose.firstElementChild.classList.toggle("criteria__open");
      // ====>e.target.children[1].firstElementChild.classList.toggle("criteria__open");
      // dropdown expand
      e.target.closest(".criteriaWrapper").classList.toggle("expand");
      // arrowOpenClose.classList.contains("criteria__open")
    }
  }
}
 */

/* 
  // if click target is li
  if (e.target.classList.contains("recipeItem")) {
    console.log("M A T C H !!!!!!!")
    let liCriteria = selectedItem.dataset.criteriaLi;
    if (selectedItem.dataset.selected === "false") {
      selectLi(selectedItem);
      createTag(selectedItem.dataset.criteriaLi);
      updateTagList("add", liCriteria);
      return;
    }
    // console.log("selectedItem: ", selectedItem);
    // console.log("selectedItem: ", selectedItem.children[1]);
    // tagTemplate(toto.dataset.criteriaItem);

    if (selectedItem.dataset.selected === "true") {
      unSelectLi(selectedItem);
      // tag is removed
      removeTag(liCriteria);
      updateTagList("remove", liCriteria);
      return;
    }
  }
 */

if (recipesListIds.length === 0) {
  localSearch = [];
  console.log(
    "S E L E C T O R  input box  C L I C K E D = 1",
    inputName,
    "/ local: ",
    localSearch,
    "/ tag recipe id list ",
    tagRecipeIdList,
    "/ "
  );
  // updateCriteriaList(inputName, selectedRecipesIngredients)
  updateAllCriteriaLists();
} else {
  console.log(
    "S E L E C T O R  input box  C L I C K E D = 2 - ",
    inputName,
    "/ local: ",
    localSearch,
    "/ tag recipe id list ",
    tagRecipeIdList,
    "/ "
  );
  updateCriteriaList(inputName, localSearch);
  // updateSelectedRecipes(option, itemSelected)
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
              item.ingredient
                .toLowerCase()
                .substr(0, searchString.length)
                .toLowerCase()
              //  item.ingredient.toLowerCase().includes(searchString.toLowerCase())
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
    let index = fullTagsList.findIndex(
      (elem) => elem["item"] === itemSelected.toLowerCase()
    );
 */

/* 
  if (fullTagsList.length === 1) {
    recipesListIds = [...fullTagsList];
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
  fullTagsList.forEach((elem) => {
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



const a = [12, 23, 36, 45];
const b = [12, 25, 36, 46];
const c = [13, 27, 36, 45, 54];
const d = [];
console.log("array: ", [...a, ...b, ...c, ...d]);



/*    
        } else {
          // tag is removed from the list 
          delete fullTagsList[`${itemSelected}`.toLowerCase()];
          console.log("After: ", fullTagsList, "/");
          if (Object.keys(fullTagsList).length === 1) {
            recipesListIds = [...Object.values(fullTagsList)[0]];
          } else {
            mergedArray = mergeList(fullTagsList);
            console.log("11 - mergedArray: ", mergedArray);
            mergedArray = [...recipesListIds, ...mergedArray];
            recipesListIds = getDupeIds(mergedArray);
            console.log("recipesListIds After: ", recipesListIds, "/");
          }
        }
  */








        function updateSelectedRecipes2(option, itemSelected) {
            let mergedArray = [];
            selectedTagDetails = {}; // get individual tag details name and id array / reset for each new tag
            selectedTagDetails[itemSelected.toLowerCase()] = fullList[itemSelected];
            fullTagsList[itemSelected.toLowerCase()] = fullList[itemSelected];
            console.log("- A - fullTagsList: ", fullTagsList);
            console.log("- B - recipesListIds: ", recipesListIds);
          
            switch (option) {
              case "added":
                fullTagsList = { ...fullTagsList, ...selectedTagDetails };
                if (recipesListIds.length === 0) {
                  recipesListIds = [...Object.values(selectedTagDetails)[0]];
                  console.log("1 - recipesListIds: ", recipesListIds);
                } else {
                  recipesListIds = [
                    ...recipesListIds,
                    ...Object.values(selectedTagDetails)[0],
                  ];
                  console.log("2--- - recipesListIds: ", recipesListIds);
                  mergedArray = getDupeIds(recipesListIds);
                  recipesListIds = [...mergedArray];
                  console.log("2 - recipesListIds: ", recipesListIds);
                }
                createCriteriaList(recipesListIds);
                displayRecipes(recipesListIds);
                displayNumberOfRecipes(recipesListIds.length);
                closeAllSelectors();
                break;
          
              case "removed":
              // no more tag remaining / check if "mainSearchInputIdList" exists 
                if (Object.keys(fullTagsList).length === 1) {
                  fullTagsList = {};
                  if (mainSearchInputIdList) {
                    recipesListIds = [...mainSearchInputIdList];
                  }
              } else {
                  // tag is removed from the list 
                  delete fullTagsList[`${itemSelected}`.toLowerCase()];
                  // One tag remaining
                  /* if (Object.keys(fullTagsList).length >= 1) { */
                      mergedArray = mergeList(fullTagsList);
                      console.log("11 - mergedArray: ", mergedArray);
                      mergedArray = [...recipesListIds, ...mergedArray];
                      recipesListIds = getDupeIds(mergedArray);
              }
          /*    
                } else {
                  // tag is removed from the list 
                  delete fullTagsList[`${itemSelected}`.toLowerCase()];
                  console.log("After: ", fullTagsList, "/");
                  if (Object.keys(fullTagsList).length === 1) {
                    recipesListIds = [...Object.values(fullTagsList)[0]];
                  } else {
                    mergedArray = mergeList(fullTagsList);
                    console.log("11 - mergedArray: ", mergedArray);
                    mergedArray = [...recipesListIds, ...mergedArray];
                    recipesListIds = getDupeIds(mergedArray);
                    console.log("recipesListIds After: ", recipesListIds, "/");
                  }
                }
          */
          
          
                if (
                  mainSearchInputIdList.length === 0 &&
                  recipesListIds.length === 0 &&
                  Object.keys(fullTagsList).length === 0
                ) {
                  console.log("=========  N O T H I N G  T O  D I S P L A Y =======");
                  updateAllCriteriaLists();
                  displayRecipes(recipesListIds);
                  displayNumberOfRecipes(0);
                  closeAllSelectors();
                  resetSearch();
                } else {
                  console.log("=========  K E E P  G O I N G ... =======");
                  createCriteriaList(recipesListIds);
                  displayRecipes(recipesListIds);
                  displayNumberOfRecipes(recipesListIds.length);
                }
                break;
          
              default:
            }
          }
          
  



      // delete fullTagsList[`${itemSelected}`.toLowerCase()];

      /* 
      console.log("Remove area: NBR", Object.keys(fullTagsList).length);
      //  
      if (Object.keys(fullTagsList).length === 1) {
        console.log("no more tags...");
        fullTagsList = {};
        if (mainSearchInputIdList) {
          recipesListIds = [...mainSearchInputIdList];
        }
      } else if (Object.keys(fullTagsList).length > 1) {
        console.log("Remove area: ELSE: ", Object.keys(fullTagsList).length);
        // tag is removed from the list
        console.log("before remaining tag: ", fullTagsList, itemSelected);
        delete fullTagsList[`${itemSelected}`.toLowerCase()];
        console.log("remaining tag: ", fullTagsList);
        // One tag remaining
        // if (Object.keys(fullTagsList).length >= 1) { 
        mergedArray = mergeList(fullTagsList);
        console.log("11 - mergedArray: ", mergedArray);
        mergedArray = [...recipesListIds, ...mergedArray];
        recipesListIds = getDupeIds(mergedArray);
      }
 */



  if (e.which === 9) {
    console.log("===============")
    e.preventDefault()
    return;
    // Do Something, may be an 'Undo' operation
  }



function resetSearch2() {
    console.log("R E S E T  S E A R C H . . .");
    selectedRecipesIngredients = [];
    selectedRecipesUstensils = [];
    selectedRecipesAppliances = [];
    recipesListIds = [];
    fullTagsList = {};
    mainSearchInputIdList = [];
    document.getElementById("recipesSelected").replaceChildren();
    document.getElementById("message").replaceChildren();
    document.getElementById("recipes__tags").replaceChildren();
    closeAllSelectors();
    updateAllCriteriaLists();
    displayNumberOfRecipes(0);
  }
  


      /* 

        recipesListIds = retrieveRecipes(inputValue, inputBox);
        // if no recipes found message is displayed
        if (recipesListIds.length === 0) {
          displayRecipes([]);
          displayNoRecipeFound(inputValue, "ON");
        } else {
          displayNoRecipeFound(inputValue, "OFF");
        }
        // recipes IDs selected from this input is store for tags handling
        mainSearchInputIdList = [...recipesListIds];
        // create/update selectors dropdown lists
        createCriteriaList(recipesListIds);
      }
      // selected recipe(s) are displayed
      displayRecipes(recipesListIds);
 */


// ==============================================================================

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
  
  console.log(
    "----  E N T E R I N G  C R E A T E  C R I T E R I A  L I S T  -  reduce -----"
  );
