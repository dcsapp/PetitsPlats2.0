function selectLi(selectedItem) {
  // console.log("enter S E L E C T  li", selectedItem);
  // console.log("tag not selected");

  // if selected item in list is not selected
  // item tag is created
  //                createTag(selectedItem.dataset.criteriaLi);
  // selected item status updated to true
  selectedItem.dataset.selected = "true";
  // selected item background color changed to yellow and font weight to bold (700)
  selectedItem.style.background = "#ffd700";
  selectedItem.style.fontWeight = "700";
  // // xmark displayed
  selectedItem.children[1].classList.toggle("hide");
  return;
}

function unSelectLi(selectedItem) {
  // console.log("enter U N S E L E C T li: ", selectedItem);
  // console.log("click on tag already selected");

  // If selected item is clicked again:
  // yellow background color font weight bold are removed
  selectedItem.style.background = "";
  selectedItem.style.fontWeight = "400";
  // xmark is hidden
  selectedItem.children[1].classList.toggle("hide");
  // selected item status is reverted to false
  selectedItem.dataset.selected = "false";
  return;
}

function updateCriteriaList(criteria, data) {
  // criteria: ingredients / appliances / ustentils
  // data: criteria associted items from:
  //      main bar selected recipes and / or
  //      criteria search field
  const ulContent = document.querySelector(`#itemList${criteria}`);

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
    ul.appendChild(itemLi);
  });
}


function removeTag(selectedItem) {
  const tagToRemove = document.querySelector(
    `[data-criteria-tag = "${selectedItem}"]`
  );
  tagToRemove.remove();
}

// ====================================================

// Search Input boxes Activation
createMainSearchBar();
createCriteriaSelectors("ingredients", "Ingrédients");
createCriteriaSelectors("appliances", "Appareils");
createCriteriaSelectors("ustensils", "Ustensiles");
displayNumberOfRecipes("0")
