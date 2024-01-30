// 



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

function criteriaListByItem(criteria, data) {

}



function removeTag(selectedItem) {
  const tagToRemove = document.querySelector(
    `[data-criteria-tag = "${selectedItem}"]`
  );
  tagToRemove.remove();
}

// ====================================================

// I N I T
// Create from templates all search Input boxes.
createMainSearchBar();
createCriteriaSelectors("ingredients", "Ingrédients");
createCriteriaSelectors("appliances", "Appareils");
createCriteriaSelectors("ustensils", "Ustensiles");
displayNumberOfRecipes("0");

function updateAllCriteriaLists() {
  // Feed Selectors list. By default all item of each cateory are available
  updateCriteriaList("ingredients", Object.keys(listOfIngredients).sort());
  updateCriteriaList("appliances", Object.keys(listOfAppliances).sort());
  updateCriteriaList("ustensils", Object.keys(listOfUstensils).sort());
}
updateAllCriteriaLists();


// Insert cursor in the main input search bar when the page is loaded 
window.onload = function() {mainSearchInput.focus()};

