// E V E N T S  D E L E G A T I O N
// ------------------------------------
//
// R E T R I E V E  D A T A  F R O M  I N P U T  B O X E S
//
//    Ref is body in order to access to all input boxes
//    Each input box has a data attribute data-name=
//        mainSearch / ingredients / ustensils / appliances
const inputBoxContent = document.querySelector("body");
inputBoxContent.addEventListener("keyup", getData);

function getData(e) {
  // Get inputValue origin: mainSearch / ingredients / appliances / ustensils
  let inputBox = e.target.dataset.name;
  let inputBoxClassName = `${inputBox}CloseCross`;
  console.log("inputBox: ", inputBox);
  console.log("inputBoxClassName: ", inputBoxClassName);

  // console.log("Parent: ", e.target.parentElement.children);
  // console.log("inputBox target: ", e.target.closest("span"));
  let inputValue = e.target.parentElement.children[0].value;
  console.log("key pressed: ", inputValue);
  // Display reset field cross
  if (inputValue.length > 0) {
    displayResetCross(inputBoxClassName, "ON");
  } else {
    displayResetCross(inputBoxClassName, "OFF");
  }

  if (inputValue.length >= 3) {
    // Check input location
    // Main search bar or one of the dropbox selector
    if (inputBox === "mainSearchInput") {
      listIndex = retrieveRecipes(inputValue, inputBox);
      console.log("list  I N D E X: ", listIndex);
      createCriteriaList(listIndex);
      displayRecipes(listIndex);
    } else {
      // search on specific selector: ingredient
      const listItems = retrieveItems(inputValue, inputBox);
      console.log("list  I T E M S: ", listItems);
      console.log("I N P U T  B O X: ", inputBox);
      createCriteriaListByItems(listItems, inputBox, inputValue);
    }
  }
}

// D R O P B O X  S E L E C T O R S
//
const dropBox = document.querySelector(".criterias");
dropBox.addEventListener("click", expandDropBox);
//
function expandDropBox(e) {
  // Close the dropbox if it is clicked and already open
  if (
    e.target.children[1].firstElementChild.classList.contains("criteria__open")
  ) {
    closeAllSelectors();
  } else {
    if (e.target.matches(".criteria__header")) {
      // pointer-event disabled for p and span
      // arrow rotation
      closeAllSelectors();
      e.target.children[1].firstElementChild.classList.toggle("criteria__open");
      // dropdown expand
      e.target.closest(".criteriaWrapper").classList.toggle("expand");
    }
  }
}

function closeAllSelectors() {
  // console.log("close all selectors ==============")
  const allSelectors = document.querySelectorAll(".criteriaWrapper");
  const allChevrons = document.querySelectorAll(".criteria__open");
  // console.log("poiuy: ", allSelectors)
  allSelectors.forEach((sel) => sel.classList.remove("expand"));
  allChevrons.forEach((sel) => sel.classList.remove("criteria__open"));
}
//
//
// Tags of selected items
//
const criteriaSelectorsHandlers = document.querySelector("body");
criteriaSelectorsHandlers.addEventListener("click", tagHandling);
//
function tagHandling(e) {
  let selectedItem = e.target;
  // if click target is li
  if (e.target.matches(".recipeItem")) {
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
  // if click targets the tag is removed and li status updated
  if (e.target.matches(".tag__wrapper")) {
    let dataCriteriaLi = selectedItem.dataset.criteriaTag;
    // targets li criteria ref:
    console.log(dataCriteriaLi);
    let liSelectedItem = document.querySelector(
      //  !!! format to be applied due to spaces in item
      `[data-criteria-li = "${dataCriteriaLi}"]`
    );
    // console.log("tag1 !", selectedItem.dataset.attr);
    // console.log("tag2 !", selectedItem);
    // console.log("tag3 !", liSelectedItem);
    selectedItem.remove(); // remove tag
    unSelectLi(liSelectedItem);
    updateTagList("remove", dataCriteriaLi); // liSelectedItem);
  }
}
//
// S E A R C H  F I E L D S  H A N D L I N G S
// Delete input field containt
//
const resetSearchInputField = document.querySelector("body");
resetSearchInputField.addEventListener("click", clearInputField);
//
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

function displayRecipes(listID) {
  const recipeDisplaySection = document.getElementById("recipesSelected");
  recipeDisplaySection.replaceChildren();
  listID.forEach((id) => {
    const recipeModel = recipeCardTemplate(id);
    const recipeCard = recipeModel.getRecipeCard();
    recipeDisplaySection.appendChild(recipeCard);
  });
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

const searchFields = document.querySelectorAll(".main__searchBar");
console.log("searchFields = ", searchFields);

/* =================------ T R A S H ------============ */

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
    let listIndex = retrieveRecipes(inputValue, inputBox);
    console.log("list index: ", listIndex);
    displayRecipes(listIndex);
    createCriteriaList(listIndex);
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
