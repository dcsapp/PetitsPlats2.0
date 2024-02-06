// E V E N T S  D E L E G A T I O N
// ------------------------------------
//
// - getData
// - displayResetCross
// - expandDropBox
// - closeAllSelectors
// - tagHandling
// - resetInputField
// - resetSearch
// - clearInputField
// - displayResetCross
//
//

// R E T R I E V E  D A T A  F R O M  I N P U T  B O X E S
//
//    Ref is body in order to access to all input boxes
//    Each input box has a data attribute data-name=
//        mainSearch / ingredients / ustensils / appliances
const inputBoxContent = document.querySelector("body");
/* inputBoxContent.addEventListener("keyup", getData); */
inputBoxContent.addEventListener("input", getData);

function getData(e) {
  // get location of search: mainsearch bar or from selectors (ingredients/ustensils/appliances)
  let inputBox = e.target.dataset.name;
  let inputBoxClassName = `${inputBox}CloseCross`;
  let inputValue = e.target.closest("input").value;
  //
  console.log("key pressed: ", inputValue);
  //
  // For all input boxes
  //  reset field cross is displayed when a caracter is typed in the field
  if (inputValue.length > 0) {
    displayResetCross(inputBoxClassName, "ON");
  } else {
    displayResetCross(inputBoxClassName, "OFF");
  }
  //
  switch (inputBox) {
    case "mainSearchInput":
      // If data are in inserted in main search bar and tags are displayed
      // au all tags data are removed (data & display)
      if (fullTagsList) {
        cleanTags();
      }
      closeAllSelectors();
      // As long as number of caracters is less than 3 nothing happens
      if (inputValue.length < 3) {
        recipesListIds.length = 0;
        recipesListIds = [];
        mainSearchInputIdList = [];
        // 3 or more carateres get recipes IDs
      } else {
        recipesListIds = retrieveRecipes(inputValue, inputBox);
        // if no recipes found message is displayed
        if (recipesListIds.length === 0) {
          displayRecipes([]);
          displayNoRecipeFound(inputValue, "ON");
        } else {
          displayNoRecipeFound(inputValue, "OFF");
        }
        // recipes IDs selected from yhis input is store for tags handling
        mainSearchInputIdList = [...recipesListIds];
        // create/update selectors dropdown lists
        createCriteriaList(recipesListIds);
      }
      // selected recipe(s) are displayed
      displayRecipes(recipesListIds);
      break;

    case "ingredients":
    case "ustensils":
    case "appliances":
      let tempoSearch = retrieveRecipes(inputValue, inputBox);
      displayNumberOfRecipes(recipesListIds.length);
      // recipesListIds = retrieveRecipes(inputValue, inputBox);
      console.log("U N D E R  C O N S T R U C T I O N");
      console.log("Dropdown selected tempo Search", tempoSearch);
      console.log(
        "Dropdown selected Recipes Ingredients",
        selectedRecipesIngredients
      );
      console.log(
        "Dropdown selected Recipes Appliances",
        selectedRecipesAppliances
      );
      console.log(
        "Dropdown selected Recipes Appliances",
        selectedRecipesUstensils
      );
      console.log(
        "============ ++++++++++ =============",
        selectedRecipesUstensils
      );
      console.log("recipesListIds", recipesListIds);
      break;
  }
}

// D R O P B O X  S E L E C T O R S
//
const dropBox = document.querySelector(".criterias");
dropBox.addEventListener("click", expandDropBox);
//
function expandDropBox(e) {
  let arrowOpenClose = e.target.closest(".criteria__header"); //.children[1];
  let expandFlag = e.target.closest(".criteriaWrapper");
  // console.log(" 1 === C R I T E R I A  H E A D E R ", arrowOpenClose);
  // console.log(" 1 === C R I T E R I A  W R A P P E R ", expandFlag);

  if (!arrowOpenClose) {
    return;
  }

  let divDetails = Array.from(arrowOpenClose.children);
  let rotateChevron = divDetails[1]; // get the span containing chevron icon is selected

  if (arrowOpenClose) {
    // close the
    if (expandFlag.classList.contains("expand")) {
      closeAllSelectors();
    } else {
      closeAllSelectors();
      rotateChevron.classList.toggle("criteria__open");
      expandFlag.classList.toggle("expand");
    }
  }
}

function closeAllSelectors() {
  // Close all selectors and reset imput fields value
  const allSelectors = document.querySelectorAll(".criteriaWrapper");
  const allChevrons = document.querySelectorAll(".criteria__open");
  //
  allSelectors.forEach((sel) => sel.classList.remove("expand"));
  allChevrons.forEach((sel) => sel.classList.remove("criteria__open"));
  //
  const allInputSelectors = document.querySelectorAll(".inputFieldSelector");
  allInputSelectors.forEach((sel) => (sel.value = ""));
  //
  console.log("trigger hide cross");
  //displayResetCross(inputFieldName, onOff)
  displayResetCross("closeCrossSelectors", "OFF");
}
//
//
// T A G S  A N D  L I  S E L E C T I O N
// Tag is created when an item is cliccked in a dropdown selector list
// The first check is what has been clicked:
// - an item in the dropdown selector list: "selectedItem"
// - a tag already created "tagsDisplayed"
const criteriaSelectorsHandlers = document.querySelector("main");
criteriaSelectorsHandlers.addEventListener("click", tagHandling);
//
function tagHandling(e) {
  let selectedItemSelelectorList = e.target.closest("div");
  console.log(
    "li selectedItemSelelectorList: ===>",
    selectedItemSelelectorList
  );
  let selectedItem = e.target.closest(".recipeItem");
  let tagsDisplayed = e.target.closest(".tag__wrapper");
  console.log("li Item: ===>", selectedItem);
  console.log("tag Item: ==>", tagsDisplayed);
  //
  // An item from the dropdown list is clicked
  // - get the value: liCriteria
  // - check if data-selected is false or true
  //
  // - if  f a l s e
  // - the tags is created (createTag with the value: criteriaLi) => template
  // - tag list is updated updateTagList with option "added" and value criteriaLi
  //
  // if  t r u e
  // - the tags is removed (removeTag with the value: criteriaLi)
  // - tag list is updated updateTagList with option "removed" and value criteriaLi
  if (selectedItem) {
    console.log("enter S E L E C T  li", selectedItem);
    // recipesListIds = retrieveRecipes(inputValue, inputBox);
    if (selectedItem.classList.contains("recipeItem")) {
      let liCriteria = selectedItem.dataset.criteriaLi;
      console.log("Selected li", liCriteria);

      let listSelector = selectedItem.dataset.selector;
      console.log("Selected selector", listSelector);

      if (selectedItem.dataset.selected === "false") {
        console.log("==> Item for tag / false: ", liCriteria);
        // createTag(selectedItem.dataset.criteriaLi); // template
        selectedItem.dataset.selected = "true";
        console.log("==> Status updated to true: ", liCriteria, listSelector);
        createTag(listSelector, liCriteria); // template
        updateSelectedRecipes("added", listSelector, liCriteria);
        // updateTagList("added", liCriteria);
        // return;
      } else {
        console.log("enter R E M O V E  li", selectedItem);
        selectedItem.dataset.selected = "false";
        console.log("updated li", selectedItem);
        console.log("listSelector", listSelector);
        // tag is removed
        removeTag(liCriteria); // template
        console.log("removed", listSelector, liCriteria);
        updateSelectedRecipes("removed", listSelector, liCriteria);
        // updateTagList("removed", liCriteria);
        // updateData()
        // return;
      }
    }
  }

  // if click targets the tag is removed and li status updated
  // if (e.target.matches(".tag__wrapper")) {
  if (tagsDisplayed) {
    let dataCriteriaLi = tagsDisplayed.dataset.criteriaTag;
    let listSelector = tagsDisplayed.dataset.selector;
    console.log("M A T C H !!!!!!!", tagsDisplayed.dataset);
    // targets li criteria ref:
    console.log("D A T A  L I  C R I T E R I A $$$$$", dataCriteriaLi);
    let liSelectedItem = document.querySelector(
      `[data-criteria-li = "${dataCriteriaLi}"]`
    );
    console.log("LI LI LI ", liSelectedItem);
    // console.log("tag1 !", selectedItem.dataset.attr);
    console.log("tag2 !", selectedItem);
    console.log("tag3 !", liSelectedItem);
    // selectedItem.remove(); // remove tag
    tagsDisplayed.remove();
    // updateTagList("removed", dataCriteriaLi); // liSelectedItem);
    updateSelectedRecipes("removed", listSelector, dataCriteriaLi);
  }
}
//
// S E A R C H  F I E L D S  H A N D L I N G S
// Delete input field containt
// Reset list of dropdown list items
const resetSearchInputField = document.querySelector("body");
resetSearchInputField.addEventListener("click", resetInputField); // clearInputField);
//
function resetInputField(e) {
  // let resetSearchCrossnnn = e.target.closest(".closeCross");
  let resetSearchCross = e.target.closest(".closeCross");
  // let inputToBremoved = e.target.closest("div").children[0];
  // let inputName = e.target.closest("div").children[0].dataset.name;

  if (!resetSearchCross) return;

  if (resetSearchCross) {
    let inputToBremoved = e.target.closest("div").children[0];
    let inputName = e.target.closest("div").children[0].dataset.name;

    console.log("cross click!!!!!!......", resetSearchCross);
    console.log("cross inputToBremoved", inputToBremoved); //.dataset.name);
    console.log("cross inputName", inputName); //.dataset.name);
    console.log("recipes List Ids", recipesListIds);
    //
    inputToBremoved.value = ""; // input field emptied
    resetSearchCross.style.display = "none";
    // C A S E  - 1  If input box is "mainSearchInputCloseCross")) {
    if (inputName === "mainSearchInput") {
      console.log("========= mainSearchInputCloseCross clicked ========");
      resetSearch(); // clean all the data and close all selectors
    } else {
      // C A S E  - 2  Other Input boxes: "ingredients" / "ustensils" / "appliances"
      // A - No recipes selected
      //     Reset of all dropdown lists
      //
      // B - At least 1 recipe selected when current selection is cancelled
      //     Re-instate previous status
      //
      console.log("avant: ", recipesListIds, "/ local: ");
      updateCriteriaList("ingredients", selectedRecipesIngredients);
      console.log("apres: ", recipesListIds, "/ local: ");

      return;
    }
  }
  // console.log("input: ", inputName.parentElement.si);// e.target.closest("div").children[0].value="")
  // console.log("input: ", e.target.closest("div").children[0].value="")
}

// Reset search if logo is clicked
const resetFromSiteTitle = document.querySelector("#logo");
resetFromSiteTitle.addEventListener("click", resetSearch); // clearInputField);
//
function resetSearch() {
  location.reload();
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

function clearInputField() {
  console.log(
    "cross clear input Selected field: ",
    e.target.closest(".clearSearch")
  );
  const selectedField = (e.target.closest(
    ".clearSearch"
  ).parentElement.parentElement.children[0].value = "");
  console.log(
    "cross clear input Selected field: ",
    e.target.closest(".clearSearch")
  );
  // console.log("cross clear input Selected field: ", selectedField);
  // Hide cross icon
  selectedField.closest(".clearSearch").style.display = "none";
  // e.target.closest("span").style.display = "none";

  // Suppress displayed recipes
  console.log("===============!!!!!!!!!=============");
  document.getElementById("recipesSelected").replaceChildren();
  closeAllSelectors();
  updateAllCriteriaLists();
  displayNumberOfRecipes(0);
}

function displayRecipes(listID) {
  console.log("===> Entering Display recipes ");
  const recipeDisplaySection = document.getElementById("recipesSelected");
  recipeDisplaySection.replaceChildren();
  //
  if (listID === 0) return;
  //
  listID.forEach((id) => {
    const recipeModel = recipeCardTemplate(id);
    const recipeCard = recipeModel.getRecipeCard();
    recipeDisplaySection.appendChild(recipeCard);
  });
}

function displayNoRecipeFound(msg, option) {
  const messageSection = document.getElementById("message");
  if (option === "ON") {
    console.log("message: ", msg);
    const message = `Aucune recette contient <strong>"${msg}"</strong>.</br> 
    Vous pouvez chercher <strong>"tarte aux pommes"</strong>, <strong>"poisson",</strong> etc.  ou utiliser la recherche avancée.`;
    messageSection.replaceChildren();
    messageSection.innerHTML += `<p> ${message} </p>`;
  } else if (option === "OFF") {
    messageSection.replaceChildren();
  }
}

function displayResetCross(inputFieldName, onOff) {
  const toBeDisplayed = document.querySelector(`.${inputFieldName}`);
  // console.log("toBeDisplayed", toBeDisplayed);
  // console.log("inputFieldName", inputFieldName);
  if (onOff === "ON") {
    toBeDisplayed.style.display = "flex";
  }
  if (onOff === "OFF") {
    toBeDisplayed.style.display = "none";
  }
}

function cleanTags() {
  const tagSection = document.querySelector("#recipes__tags");
  tagSection.replaceChildren();
  fullTagsList = {};
}
