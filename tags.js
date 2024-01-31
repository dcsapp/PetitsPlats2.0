function updateSelectedRecipes(option, itemSelected) {
  // data received: item name criteriaLi
  let mergedArray = [];
  tagRecipeIdList = fullList[itemSelected];
  console.log("itemSelected", itemSelected, "/", recipesListIds);

  console.log(
    "----  E N T E R I N G  U P D A T E  S E L E C T E D  R E C I P E S -----"
  );
  // ====================  A D D E D   T A G   ========================
  //
  // Case 1 - O N L Y  O N E  T A G  S E L E C T E D
  // no "mainSearchInputIdList"
  // and no "recipesListIds"
  // one tag in "selectorsTagsList"
  //
  // => "recipesListIds" = "tagRecipeIdList"
  // RMK no comparation needed
  //
  // Case 2 - M O R E  T H A N  O N E  T A G  S E L E C T E D
  //          A N D  O N L Y  T A G S  T A G S  S E L E C T E D
  // no "mainSearchInputIdList"
  // => X update "selectorsTagsList"
  // => add "tagRecipeIdList" to "recipesListIds"
  // => compare and update "recipesListIds"
  //
  // Case 3 - A  "mainSearchInputIdList" E X I S T S
  // => update "selectorsTagsList"
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
  // one tag in "selectorsTagsList"
  // list "selectorsTagsList" is emptied
  // list "recipesListIds" is emptied
  //
  //
  switch (option) {
    case "added":
      // Case 1 - O N L Y  O N E  T A G  S E L E C T E D
      selectorsTagsList[itemSelected.toLowerCase()] = tagRecipeIdList;
      console.log(
        "case 1: ",
        mainSearchInputIdList.length,
        recipesListIds.length,
        Object.keys(selectorsTagsList).length
      );
      if (
        mainSearchInputIdList.length === 0 &&
        recipesListIds.length === 0 &&
        Object.keys(selectorsTagsList).length === 1
      ) {
        console.log("I N  case 1: ");
        recipesListIds = [...tagRecipeIdList];
        console.log("I N  case 1 recipesListIds: ", recipesListIds);
        createCriteriaList(recipesListIds);
        displayRecipes(recipesListIds);
        displayNumberOfRecipes(recipesListIds.length);
      } else if (
        // Case 2 - M O R E  T H A N  O N E  T A G  S E L E C T E D
        //          A N D  O N L Y  T A G S  T A G S  S E L E C T E D
        mainSearchInputIdList.length === 0 &&
        recipesListIds.length > 0 &&
        Object.keys(selectorsTagsList).length > 1
      ) {
        console.log("I N  case 2: ");
        mergedArray = [...recipesListIds, ...tagRecipeIdList];
        console.log("avant merge", recipesListIds);
        recipesListIds = compare(mergedArray);
        console.log("après merge", recipesListIds);
      } else if (
        // Case 3 - A  "mainSearchInputIdList" E X I S T S
        mainSearchInputIdList.length > 0 &&
        recipesListIds.length > 0 &&
        Object.keys(selectorsTagsList).length >= 0
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

    case "removed":
      // Case 1 - O N L Y  O N E  T A G  I S  D I S P L A Y E D
      // selectorsTagsList[itemSelected.toLowerCase()] = tagRecipeIdList;
      console.log(
        "case 1: removed",
        mainSearchInputIdList.length,
        recipesListIds.length,
        Object.keys(selectorsTagsList).length
      );
      if (
        mainSearchInputIdList.length === 0 &&
        recipesListIds.length > 0 &&
        Object.keys(selectorsTagsList).length === 1
      ) {
        console.log("I N  case 1: ");
        recipesListIds = 0;
        selectorsTagsList = 0;
      }
      // updateAllCriteriaLists();
      createCriteriaList(recipesListIds);
      // displayRecipes(recipesListIds);
      displayNumberOfRecipes(recipesListIds.length);
    // closeAllSelectors();
    default:
      console.log("Error...");
  }

  /* 
    if (
      recipesListIds.length === 0 ||
      Object.keys(selectorsTagsList).length === 1
    ) {
      console.log(
        "list index: ",
        recipesListIds,
        "hhhh",
        Object.keys(selectorsTagsList).length
      );
      // recipesListIds = [...selectorsTagsList];
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
        selectorsTagsList
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
    // selectorsTagsList.push(newTag);
    selectorsTagsList[itemSelected.toLowerCase()] = tagRecipeIdList;

    console.log("tag List ADD ===> : ", selectorsTagsList);
    // 2 - Update list of recipes
    // => get intersection of current recipes and new tag recipe(s)
    // updateSelectedRecipes();
    updateSelectedRecipes(tagRecipeIdList);
  }

  if (option === "removed") {
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
      tagRecipeIdList.length = 0;
    }
    if (Object.keys(selectorsTagsList).length === 1) {
      console.log("tagRecipeIdList :", Object.values(selectorsTagsList)[0]);
      tagRecipeIdList = Object.values(selectorsTagsList)[0];

      //tagRecipeIdList = fullList[itemSelected.toLowerCase()];
      // console.log("TTTTT ============== TTTTTTTT", tagRecipeIdList, "item", itemSelected, "tytyty: ", tytyty)
    }
    console.log("selectorsTagsList: ", selectorsTagsList); // [`${itemSelected.toLowerCase()}`]);
    console.log("tagRecipeIdList :", tagRecipeIdList);

    // get items in item lists
    // delete selectedTagList[`${itemSelected.toLowerCase()}`];
    // console.log("item list after deletion: ", selectedTagList)

    updateSelectedRecipes(tagRecipeIdList);
    closeAllSelectors();
  }
}

// Get
function compare(mergedArray) {
  console.log("M E R GE D A R R A Y", mergedArray);
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
