
// M A I N  S E A R C H  B A R  S E L E C T O R
// Template
function createMainSearchBar() {
    // const mainSearchBarId = document.querySelector("#main__searchBar");
    // const mainSearchBarId = document.querySelector("#testyty");
    mainSearchBarId = document.querySelector("#header");
  
    const mainInput = document.createElement("div");
    mainInput.classList.add("main__searchBar", "searchBar");
    //
    const inputBox = document.createElement("input");
    inputBox.setAttribute("id", "mainSearchInput");
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
    criteriaInput.classList.add("input-control");
    //
    const inputBox = document.createElement("input");
    inputBox.setAttribute("id", `criteriaBox${criteria}`);
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
    // List of items
    const selectedItemList = document.createElement("div");
    selectedItemList.classList.add("item__selected");
    selectedItemList.setAttribute("id", `itemList${criteria}`);
    criteriaWrapper.appendChild(selectedItemList);
    //
    //
    criteriaID.appendChild(criteriaWrapper);
  }
  


// ==== T A G S =============================================
// Tag template
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