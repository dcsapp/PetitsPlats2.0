// After selection update (mainSearchInputIdList / add or remove tag )
// L I S T S :
// - recipesListIds         : list of recipes ID to be displayed
// - mainSearchInputIdList  : list of recipes ID retrieved from the main input bar
// - fullTagsList:      : list of current selected tag name and IDs
//
//
// If mainSearchInputIdList (search starting from main search bar)
// --------> update/merge "recipesListIds" (+) with IDs from mainSearchInputIdList
//
// I F  T A G  I S  A D D E D
// --------> "fullTagsList" updated (+)
//
// is the "recipesListIds" empty ?
// ==> Y E S :
// ----------> A - update/merge "recipesListIds" (+) with new tag IDs
// ==> N O :  (feed by "mainSearchInputIdList" or previous tag)
// ----------> A - update/merge "recipesListIds" (+) with new tag IDs
// ----------> B - extract common ids ==> function compare
// ----------> C - update "recipesListIds" with only common ids
//
// ==> F O R  B O T H  C A S E S :
// ----------> A - createCriteriaList based on updated "recipesListIds"
// ----------> B - display recipes
//
//
// I F  T A G  I S  R E M O V E D
//
// is the tag removed is the last one, no more tag ?
// ==> Y E S :
// ----------> A - "fullTagsList" updated (-) => empty
// ---> is "mainSearchInputIdList" exists ?
// ----------> ==> Y E S :
// ---------------------> A - update "recipesListIds" with "mainSearchInputIdList" only
// ---------------------> B - display recipes "recipesListIds" list
// ----------> ==> N O :
// ---------------------> A - nothing to display: reset the display
//
// ==> N O :
// ----------> A - "fullTagsList" updated (-)
// ----------> B - merge all tags IDs from "fullTagsList" with "recipesListIds"
// ----------> C - update "recipesListIds" with only common ids ==> function compare
// ----------> D - display recipes
//

function updateSelectedRecipes(option, selector, itemSelected) {
  let mergedArray = [];
  selectedTagDetails = {}; // get individual tag details name and id array / reset for each new tag

  switch (selector) {
    case "ingredients":
      selectedTagDetails[itemSelected.toLowerCase()] =
        listOfIngredients[itemSelected];
      fullTagsList[itemSelected.toLowerCase()] =
        listOfIngredients[itemSelected];
      break;

    case "ustensils":
      selectedTagDetails[itemSelected.toLowerCase()] =
        listOfUstensils[itemSelected];
      fullTagsList[itemSelected.toLowerCase()] = listOfUstensils[itemSelected];
      break;

    case "appliances":
      selectedTagDetails[itemSelected.toLowerCase()] =
        listOfAppliances[itemSelected];
      fullTagsList[itemSelected.toLowerCase()] = listOfAppliances[itemSelected];
      break;

    default:
      console.log("error");
  }
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
      console.log("Remove area: NBR", Object.keys(fullTagsList).length);
      // no more tag remaining / check if "mainSearchInputIdList" exists
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
        /* if (Object.keys(fullTagsList).length >= 1) { */
        mergedArray = mergeList(fullTagsList);
        console.log("11 - mergedArray: ", mergedArray);
        mergedArray = [...recipesListIds, ...mergedArray];
        recipesListIds = getDupeIds(mergedArray);
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

function mergeList(arr) {
  let mergedArr = [];
  for (let i = 0; i < Object.values(arr).length; i++) {
    //  console.log("iteration: ", i, "/arr item: ", Object.values(arr)[i]);
    mergedArr = [...mergedArr, ...Object.values(arr)[i]];
    //  console.log("tempo: ", mergedArr);
  }
  if (mainSearchInputIdList) {
    mergedArr = [...mergedArr, ...mainSearchInputIdList];
  }
  // console.log("merged array: ", mergedArr);
  return mergedArr;
}

function getDupeIds(arr) {
  console.log("M E R G E D  A R R A Y", arr);
  const intersection = new Set();
  for (id1 in arr) {
    for (id2 in arr) {
      if (id1 === id2) {
        continue;
      } else {
        if (arr[id1] === arr[id2]) {
          intersection.add(arr[id1]);
        }
      }
    }
  }
  console.log("Result intersection =", [...intersection]);
  return [...intersection];
}
