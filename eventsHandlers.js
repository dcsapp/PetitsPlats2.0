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

  let inputValue = e.target.parentElement.children[0].value;
  console.log("key pressed: ", inputValue)
  // Display reset field cross
  console.log("S I Z E  O F :", inputValue.length);
  if (inputValue.length > 0) {
    displayResetCross(inputBoxClassName, "ON");
  } else {
    displayResetCross(inputBoxClassName, "OFF");
  }
  if (inputBox === "mainSearchInput") {
    if (inputValue.length < 3) {
      listIndex.length = 0;
      listIndex=0;
      mainSearchInputIdList = 0;
    } else {
      
      listIndex = retrieveRecipes(inputValue, inputBox);
      console.log("list  I N D E X: ", listIndex);
      if(listIndex.length === 0){
        displayNoRecipeFound("Pas de chance - try again...");
      }
      mainSearchInputIdList = [...listIndex];
      //console.log("mainSearchInputIdList: ", mainSearchInputIdList);
      createCriteriaList(listIndex);
      // createCriteriaListByItems(listIndex, inputBox, inputValue)
    }
    displayRecipes(listIndex);
  } else {
    console.log("E N T E R I N G  S U B  I N P U T  B O X: ", inputBox);
    /* 
    // search on specific selector: ingredient
    const listItems = retrieveItems(inputValue, inputBox);
    console.log("list  I T E M S: ", listItems);
    console.log("I N P U T  B O X: ", inputBox);
    createCriteriaListByItems(listItems, inputBox, inputValue);
    displayRecipes(listIndex);
 */
    // const listItems = retrieveItems(inputValue, inputBox);
    listIndex = retrieveRecipes(inputValue, inputBox);
    console.log("list  I T E M S: ", listIndex);
    console.log("I N P U T  B O X: ", inputBox);
    // createCriteriaListByItems(listIndex, inputBox, inputValue);
    //createCriteriaList(listIndex);
    // createCriteriaList_includingTags(listIndex);
    createCriteriaListByItems(listIndex, inputBox, inputValue)
    if(inputValue.length > 2) { 
      displayRecipes(listIndex)
    };
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
  // console.log("close all selectors and reset input field ==============")
  const allSelectors = document.querySelectorAll(".criteriaWrapper");
  const allChevrons = document.querySelectorAll(".criteria__open");
  // console.log("poiuy: ", allSelectors)
  allSelectors.forEach((sel) => sel.classList.remove("expand"));
  allChevrons.forEach((sel) => sel.classList.remove("criteria__open"));
  const allInputSelectors = document.querySelectorAll(".inputFieldSelector");
  allInputSelectors.forEach((sel) => sel.value = "");
}
//
//

// T A G S  A N D  L I  S E L E C T I O N
// Tags of selected items
//
const criteriaSelectorsHandlers = document.querySelector("main");
criteriaSelectorsHandlers.addEventListener("click", tagHandling);
//
function tagHandling(e) {
  let selectedItem = e.target.closest(".recipeItem");
  let tagsDisplayed = e.target.closest(".tag__wrapper");
  console.log("selectedItem: <<<<<<<<>>>>>>>>>><", selectedItem);
  console.log("tagsDisplayed: <<<<<<<<>>>>>>>>>><", tagsDisplayed);

  if(selectedItem) {
    if(selectedItem.classList.contains("recipeItem")){ 
      let liCriteria = selectedItem.dataset.criteriaLi;
      console.log("M A T C H !!!!!!!", liCriteria);
      if (selectedItem.dataset.selected === "false") {
        selectLi(selectedItem);
        createTag(selectedItem.dataset.criteriaLi);
        updateTagList("add", liCriteria);
        return;
      } else {
        unSelectLi(selectedItem);
        // tag is removed
        removeTag(liCriteria);
        updateTagList("remove", liCriteria);
        return;
      }
    }
  }
  
  // if click targets the tag is removed and li status updated
  // if (e.target.matches(".tag__wrapper")) {
    if(tagsDisplayed) {
    let dataCriteriaLi = tagsDisplayed.dataset.criteriaTag;
    console.log("M A T C H !!!!!!!", dataCriteriaLi)
    // targets li criteria ref:
    console.log(dataCriteriaLi);
    let liSelectedItem = document.querySelector(
      `[data-criteria-li = "${dataCriteriaLi}"]`
    );
    // console.log("tag1 !", selectedItem.dataset.attr);
    // console.log("tag2 !", selectedItem);
    console.log("tag3 !", liSelectedItem);
    // selectedItem.remove(); // remove tag
    tagsDisplayed.remove();
    unSelectLi(liSelectedItem);
    updateTagList("remove", dataCriteriaLi); // liSelectedItem);
  }
}
//
// S E A R C H  F I E L D S  H A N D L I N G S
// Delete input field containt
//
const resetSearchInputField = document.querySelector("body");
// resetSearchInputField.addEventListener("click", clearInputField);
resetSearchInputField.addEventListener("click", resetInputField); // clearInputField);
//

function resetInputField(e) {
  let resetSearchCross = e.target.closest(".closeCross");
  if (!resetSearchCross) return;
  if (resetSearchCross) {
    let inputToBremoved = e.target.closest("div").children[0];
    inputToBremoved.value = "";
    resetSearchCross.style.display = "none";
    if (resetSearchCross.classList.contains("mainSearchInputCloseCross")) {
      console.log("===============!!!!!!!!!=============");
      document.getElementById("recipesSelected").replaceChildren();
      closeAllSelectors();
      updateAllCriteriaLists();
      displayNumberOfRecipes(0);
    } else {
      updateAllCriteriaLists();
      inputToBremoved.value = "";
      document.getElementById("recipesSelected").replaceChildren();
      displayNumberOfRecipes(0);
      closeAllSelectors();
    }
  }
  // console.log("input: ", inputName.parentElement.si);// e.target.closest("div").children[0].value="")
  // console.log("input: ", e.target.closest("div").children[0].value="")
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
  const recipeDisplaySection = document.getElementById("recipesSelected");
  recipeDisplaySection.replaceChildren();
  listID.forEach((id) => {
    const recipeModel = recipeCardTemplate(id);
    const recipeCard = recipeModel.getRecipeCard();
    recipeDisplaySection.appendChild(recipeCard);
  });
}

function displayNoRecipeFound(msg) {
  const recipeDisplaySection = document.getElementById("recipesSelected");
  recipeDisplaySection.replaceChildren();
  recipeDisplaySection.innerHTML += `<p> ${msg} </p>`;

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

/* 
  if (inputValue.length >= 3) {
    console.log("3 S I Z E  O F :", inputValue.length);
    // Check input location
    // Main search bar or one of the dropbox selector
    if (inputBox === "mainSearchInput") {
      listIndex = retrieveRecipes(inputValue, inputBox);
      console.log("list  I N D E X: ", listIndex);
      mainSearchInputIdList = [...listIndex];
      console.log("mainSearchInputIdList: ", mainSearchInputIdList)
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