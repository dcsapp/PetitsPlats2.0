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
inputBoxContent.addEventListener("keyup", getData);

function getData(e) {
  // get location of search: mainsearch bar or from selectors (ingredients/ustensils/appliances)
  let inputBox = e.target.dataset.name;
  let inputBoxClassName = `${inputBox}CloseCross`;
  let inputValue = e.target.closest("input").value;

  /* 
  if(recipesListIds.length === 0) {
    resetSearch()
    console.log("A L L  R E S E T . . .")
  }
 */

  //
  console.log("key pressed: ", inputValue);
  //
  // Display reset field cross when a caracter is typed in field
  if (inputValue.length > 0) {
    displayResetCross(inputBoxClassName, "ON");
  } else {
    displayResetCross(inputBoxClassName, "OFF");
  }
  //
  switch (inputBox) {
    case "mainSearchInput":
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
          displayNoRecipeFound(inputValue);
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
      if (selectedItem.dataset.selected === "false") {
        console.log("==> Item for tag / false: ", liCriteria);
        // createTag(selectedItem.dataset.criteriaLi); // template
        selectedItem.dataset.selected = "true";
        console.log("==> Status updated to true: ", liCriteria);
        createTag(liCriteria); // template
        updateSelectedRecipes("added", liCriteria);
        // updateTagList("added", liCriteria);
        // return;
      } else {
        console.log("enter R E M O V E  li", selectedItem);
        selectedItem.dataset.selected = "false";
        console.log("updated li", selectedItem);
        // tag is removed
        removeTag(liCriteria); // template

        updateSelectedRecipes("removed", liCriteria);
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
    console.log("M A T C H !!!!!!!", dataCriteriaLi);
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
    updateSelectedRecipes("removed", dataCriteriaLi);
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
  let resetSearchCross = e.target.closest(".closeCross");
  let inputToBremoved = e.target.closest("div").children[0];
  let inputName = e.target.closest("div").children[0].dataset.name;

  if (!resetSearchCross) return;

  if (resetSearchCross) {
    console.log("cross click!!!!!!......");
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
      // localSearch = [];
      // clearInputField()
      console.log("avant: ", recipesListIds, "/ local: ");
      updateCriteriaList("ingredients", selectedRecipesIngredients);
      console.log("apres: ", recipesListIds, "/ local: ");

      return;
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
    }
  }
  // console.log("input: ", inputName.parentElement.si);// e.target.closest("div").children[0].value="")
  // console.log("input: ", e.target.closest("div").children[0].value="")
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

// Reset search if logo is clicked
const resetFromSiteTitle = document.querySelector("#logo");
resetFromSiteTitle.addEventListener("click", resetSearch); // clearInputField);
//
function resetSearch() {
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

function clearInputField(e) {
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

function displayNoRecipeFound(msg) {
  console.log("message: ", msg);
  const message = `Aucune recette ne contient <strong>"${msg}"</strong>,</br> 
  Vous pouvez chercher "tarte aux pommes", "poisson", etc. ou utiliser la recherche avancée.`;
  const messageSection = document.getElementById("message");
  messageSection.replaceChildren();
  messageSection.innerHTML += `<p> ${message} </p>`;

  const list = document.getElementById("list");

  list.innerHTML += `<li><a href="#">Item ${list.children.length + 1}</a></li>`;
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
