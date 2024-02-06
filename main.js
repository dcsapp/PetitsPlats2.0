// I N I T
// Create from templates all search Input boxes.
createMainSearchBar();
createCriteriaSelectors("ingredients", "Ingrédients");
createCriteriaSelectors("appliances", "Appareils");
createCriteriaSelectors("ustensils", "Ustensiles");
displayNumberOfRecipes(0);

function updateAllCriteriaLists() {
  // Feed Selectors list. By default all item of each cateory are available
  updateCriteriaList("ingredients", Object.keys(listOfIngredients).sort());
  updateCriteriaList("appliances", Object.keys(listOfAppliances).sort());
  updateCriteriaList("ustensils", Object.keys(listOfUstensils).sort());
}
updateAllCriteriaLists();

// console.log("full list", fullList)
// console.log("listOfUstensils", listOfUstensils)
// console.log("listOfAppliances", listOfAppliances)

// Insert cursor in the main input search bar when the page is loaded
window.onload = function () {
  mainSearchInput.focus();
};
