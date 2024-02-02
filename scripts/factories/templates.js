// M A I N  S E A R C H  B A R  S E L E C T O R
// Template
function createMainSearchBar() {
  // const mainSearchBarId = document.querySelector("#main__searchBar");
  // const mainSearchBarId = document.querySelector("#testyty");
  mainSearchBarId = document.querySelector("#header");

  const mainInput = document.createElement("div");
  mainInput.classList.add("main__searchBar", "searchBar", "searchField");
  //
  const inputBox = document.createElement("input");
  inputBox.setAttribute("id", "mainSearchInput");
  inputBox.classList.add("inputField");
  inputBox.setAttribute("data-name", "mainSearchInput");
  inputBox.setAttribute(
    "placeholder",
    "Rechercher une recette, un ingrédient, ..."
  );
  mainInput.appendChild(inputBox);
  // label
  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "search");
  // span close cross
  const spanCloseCross = document.createElement("span");
  spanCloseCross.classList.add(
    "closeCross",
    "mainSearchInputCloseCross",
    "clearSearch"
  );
  // icon cross
  const closeCrossIcon = document.createElement("i");
  closeCrossIcon.classList.add("fa-solid", "fa-xmark");
  spanCloseCross.appendChild(closeCrossIcon);
  inputLabel.appendChild(spanCloseCross);
  // span magnifying Glass
  const spanMagnifyingGlass = document.createElement("span");
  spanMagnifyingGlass.classList.add("magnifying");
  const magnifyingGlassIcon = document.createElement("i");
  magnifyingGlassIcon.classList.add("fa-solid", "fa-magnifying-glass");
  spanMagnifyingGlass.appendChild(magnifyingGlassIcon);
  inputLabel.appendChild(spanMagnifyingGlass);
  mainInput.appendChild(inputLabel);
  mainSearchBarId.appendChild(mainInput);
  //
}

// C R I T E R I A  S E L E C T O R S  ===========================
//
function createCriteriaSelectors(criteria, criteriaTitle) {
  // T E M P L A T E
  // create refined seach dropdown box for each search criteria
  // criteria: ingredients / appliances / ustentils
  // criteriaTitle: selector name diplayed for user
  const criteriaID = document.querySelector(`#${criteria}`);

  const criteriaWrapper = document.createElement("div");
  criteriaWrapper.classList.add("criteriaWrapper");
  criteriaWrapper.setAttribute("data-criteria-", `${criteria}`);
  //
  //
  // Header
  const criteriaHeader = document.createElement("div");
  criteriaHeader.classList.add("criteria__header");
  //
  const paraHeader = document.createElement("p");
  paraHeader.textContent = `${criteriaTitle}`;
  criteriaHeader.appendChild(paraHeader);
  //
  const spanDisplayChevron = document.createElement("span");
  const arrowIcon = document.createElement("i");
  arrowIcon.classList.add("fa-solid", "fa-chevron-down", "chevronDown");
  spanDisplayChevron.appendChild(arrowIcon);
  criteriaHeader.appendChild(spanDisplayChevron);
  criteriaWrapper.appendChild(criteriaHeader);
  //
  //
  // Criteria search input field
  const criteriaInput = document.createElement("div");
  criteriaInput.classList.add(
    `selector-${criteria}`,
    "searchField",
    "input-control"
  );
  //
  const inputBox = document.createElement("input");
  inputBox.setAttribute("id", `criteriaBox${criteria}`);
  inputBox.classList.add("inputFieldSelector");
  inputBox.setAttribute("data-name", `${criteria}`);
  criteriaInput.appendChild(inputBox);
  // label
  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "search");
  // span close cross
  const spanCloseCross = document.createElement("span");
  spanCloseCross.classList.add(
    "closeCross",
    "clearSearch",
    `${criteria}CloseCross`,
    ".displayFlex"
  );
  // icon cross
  const closeCrossIcon = document.createElement("i");
  closeCrossIcon.classList.add("fa-solid", "fa-xmark");
  spanCloseCross.appendChild(closeCrossIcon);
  inputLabel.appendChild(spanCloseCross);
  // span magnifying Glass
  const spanMagnifyingGlass = document.createElement("span");
  const magnifyingGlassIcon = document.createElement("i");
  magnifyingGlassIcon.classList.add("fa-solid", "fa-magnifying-glass");
  spanMagnifyingGlass.appendChild(magnifyingGlassIcon);
  inputLabel.appendChild(spanMagnifyingGlass);
  criteriaInput.appendChild(inputLabel);
  criteriaWrapper.appendChild(criteriaInput);
  //
  //
  // Selected item
  const selectedIndividualItem = document.createElement("div");
  selectedIndividualItem.classList.add(
    "sel_indiv_item",
    `sel_indiv_item${criteria}`
  );
  criteriaWrapper.appendChild(selectedIndividualItem);
  //
  /* 
  const selectedIndividualItem__name = document.createElement("p");
  selectedIndividualItem__name.classList.add("para_indv_item", `${criteria}CloseCross`);
  selectedIndividualItem__name.textContent = "para_indv_item";
  selectedIndividualItem.appendChild(selectedIndividualItem__name);
  //
  criteriaWrapper.appendChild(selectedIndividualItem);
 */
  //
  // List of items
  const selectedItemList = document.createElement("div");
  selectedItemList.classList.add("item__selected");
  selectedItemList.setAttribute("id", `itemList${criteria}`);
  criteriaWrapper.appendChild(selectedItemList);
  // toto.appendChild(selectedItemList);
  //
  //
  criteriaID.appendChild(criteriaWrapper);
}
/* 
function updateCriteriaSelectedItem(criteria, item) {
const toto = document.querySelector(`.sel_indiv_item${criteria}`);

const ulContent = document.querySelector(`#itemList${criteria}`);
  // Remove previous ul before update
  ulContent.replaceChildren();

const selectedIndividualItem__name = document.createElement("p");
selectedIndividualItem__name.classList.add("para_indv_item", `para_indv_item${criteria}`);
selectedIndividualItem__name.textContent = `${item}`;
  // selectedIndividualItem__name.appendChild(selectedIndividualItem__name);
  //
toto.appendChild(selectedIndividualItem__name);
}
 */
function updateCriteriaList(criteria, data) {
  // criteria = selector: ingredients / appliances / ustentils
  // data: criteria associated items from:
  //      main bar selected recipes and / or
  //      criteria search field
  //
  //
  // console.log("updateCriteriaList",criteria,data);

  let tagListValue = Object.keys(fullTagsList); // ["tomate", "concombre"]//
  // console.log("tagListValue=========!!!!!!!!!", tagListValue );// fullTagsList);
  //
  //

  const ulContent = document.querySelector(`#itemList${criteria}`);
  // Remove previous ul before update
  ulContent.replaceChildren();

  const ul = document.createElement("ul");
  ul.classList.add(`ul-${criteria}`, "ulCriteria");
  ulContent.appendChild(ul);
  // console.log(data);
  data.map((item) => {
    // li
    const itemLi = document.createElement("li");
    itemLi.classList.add("recipeItem");
    itemLi.setAttribute("data-criteria-li", `${item}`);
    itemLi.setAttribute("data-selected", "false");
    // p item name
    const paraLi = document.createElement("p");
    paraLi.textContent = `${item}`;
    itemLi.appendChild(paraLi);
    // span for xmark icon
    const spanXmark = document.createElement("span");
    spanXmark.classList.add("hide");
    // i fa-circle-xmark
    const circleXmarkIcon = document.createElement("i");
    circleXmarkIcon.classList.add("fa-solid", "fa-circle-xmark");
    spanXmark.appendChild(circleXmarkIcon);
    //
    itemLi.appendChild(spanXmark);
    //

    //console.log("templates: ", tagListValue)

    if (tagListValue.includes(`${item}`.toLowerCase())) {
      itemLi.setAttribute("data-selected", "true");
      // console.log("item true", `${item}`.toLowerCase());
      itemLi.classList.add("recipeAsTag");
      // itemLi.classList.toggle("recipeAsTag");
      spanXmark.classList.toggle("hide");
    } else {
      itemLi.classList.remove("recipeAsTag");
      // spanXmark.classList.toggle("hide");
      // console.log("item false", `${item}`.toLowerCase());
    }

    ul.appendChild(itemLi);
  });
}

// ==== T A G S =============================================
// Tag template
// creation and removal
//
function createTag(criteriaItem) {
  const recipesTags = document.querySelector("#recipes__tags");

  const tagWrapper = document.createElement("div");
  tagWrapper.classList.add("tag__wrapper");
  tagWrapper.setAttribute("data-criteria-tag", `${criteriaItem}`);
  // p
  const tagTitle = document.createElement("p");
  tagTitle.textContent = `${criteriaItem}`;
  tagWrapper.appendChild(tagTitle);
  // span
  const spanCloseTag = document.createElement("span");
  spanCloseTag.classList.add("closeCrossTag");
  // icon
  const closeTagIcon = document.createElement("i");
  closeTagIcon.classList.add("fa-solid", "fa-xmark", "close__search");
  spanCloseTag.appendChild(closeTagIcon);
  tagWrapper.appendChild(spanCloseTag);

  recipesTags.appendChild(tagWrapper);
}

function removeTag(selectedItem) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  const tagToRemove = document.querySelector(
    `[data-criteria-tag = "${selectedItem}"]`
  );
  tagToRemove.remove();

  const liToRemove = document.querySelector(
    `[data-criteria-li = "${selectedItem}"]`
  );
  console.log("liToRemove.dataset.selected", liToRemove);
  liToRemove.dataset.selected = "false";
}
