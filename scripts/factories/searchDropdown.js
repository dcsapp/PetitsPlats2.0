// 

function criteriaSelectorTemplate(typeOfCriteria, data) {
  function getCriteriaSelector() {
    const selectorWrapper = document.createElement("div");
    selectorWrapper.classList.add("selector__wrapper");
    //
    //
    const selectorCriteria = document.createElement("div");
    selectorCriteria.classList.add("selector__criteria");
    const criteriaTitle = document.createElement("span");
    criteriaTitle.textContent = `${typeOfCriteria}`;
    selectorCriteria.appendChild(criteriaTitle);
    const arrowIcon = document.createElement("i");
    arrowIcon.classList.add("fa-solid", "fa-chevron-down");
    selectorCriteria.appendChild(arrowIcon);
    selectorWrapper.appendChild(selectorCriteria);
    //
    //
    //const content = document.createElement("div");
    // content.classList.add("content");

    // Search box / delete search / magninify
    const searchBox = document.createElement("div");
    searchBox.classList.add("searchBox");
    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    const closeCross = document.createElement("i");
    closeCross.classList.add("fa-solid", "fa-xmark");
    const magnifyingIcon = document.createElement("i");
    magnifyingIcon.classList.add("fa-solid", "fa-magnifying-glass");
    searchBox.appendChild(inputField);
    searchBox.appendChild(closeCross);
    searchBox.appendChild(magnifyingIcon);
    // content.appendChild(searchBox);
    selectorWrapper.appendChild(searchBox);
    
    //
    //
    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selectedItem");
    //content.appendChild(selectedItem);
    selectorWrapper.appendChild(searchBox);
    //
    const selectedDatalist = document.createElement("ul");
    selectedDatalist.classList.add("datalist", `${typeOfCriteria}`);

/* 
    data.forEach((item) => {
        const itemDetails = document.createElement("li");
        itemDetails.classList.add("itemDetails");
        itemDetails.textContent = item;
        selectedDatalist.appendChild(itemDetails);
    });
 */
    //content.appendChild(selectedDatalist);
    selectedItem.appendChild(selectedDatalist);
    //
    //
    //
    // selectorWrapper.appendChild(content);
    selectorWrapper.appendChild(selectedItem);
    return selectorWrapper;
  }
  return { getCriteriaSelector };
}
