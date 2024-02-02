
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
   let filteredArray = Object.keys(selectorsTagsList).filter(e => e !== itemSelected.toLowerCase())
        
   let lower = itemSelected.toLowerCase()



   const tempo = Object.entries(selectorsTagsList);
   const filtered2 = tempo.filter(([key, value]) => key != itemSelected.toLowerCase())
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
  
    console.log("44444444444")
  
    switch (inputBox) {
      case "ingredients":
      case "ustensils":
      case "appliance":
        Object.keys(fullList).forEach((item) => {
          //console.log(item)
          // console.log(str1.match(/^abc$/))
          //console.log(str2.match(/^abc$/))
          let cleanText = searchString.toLowerCase();
          if (item.toLowerCase().match(`/^${cleanText}$/`)){
            // if (item.toLowerCase().match(/^`${searchString}.toLowerCase()`$/)){
            //=== searchString.toLowerCase()) {
            // if (item.toLowerCase() === searchString.toLowerCase()) {
            // if (item.toLowerCase().startsWith(searchString.toLowerCase())) {
            return console.log("result: ", item); // (str1.startsWith('Sat'));
          } else {
            console.log("no match...", cleanText, "//", item.toLowerCase())
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
}



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
  

