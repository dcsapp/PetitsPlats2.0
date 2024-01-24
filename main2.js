// console.log(recipes);

result = recipes.reduce((acc, recipeId) => {
  return { ...acc, [recipeId.id]: recipeId };
}, {});

// console.log(result);

/* 
const data = [
  "aze",
  "rty",
  "uio",
  "aze",
  "rty",
  "uio",
  "aze",
  "rty",
  "uio",
  "aze",
  "rty",
  "uio",
];
const data1 = ["aze", "rty"]; //, "uio", "aze", "rty", "uio", "aze", "rty", "uio", "aze", "rty", "uio"]
const data2 = [
  "Citron jaune",
  "Citron Vert",
  "citron",
  "farine",
  "fraise",
  "framboise",
];
const data0 = [];
const ustensilsList = ["bol", "assiette", "verre", "couteau"];
const ingredientsList = [
  "Citron jaune",
  "Citron Vert",
  "citron",
  "farine",
  "fraise",
  "framboise",
];
const appliancesList = ["mixeur", "blender", "Cookeo"];

const tagList = [];

// C R I T E R I A  S E L E C T O R S
// Template
function createSelector(crit, selectorTitle) {
  // console.log("crit crit= ", crit);
  document.getElementById(`${crit}`).innerHTML = `
    <div class="criteriaWrapper data-criteria-${crit}">
          
        <div class="criteria__header">
           
                <p>${selectorTitle}</p>
               
              <span class="displaySearch">
                  <i class="fa-solid fa-chevron-down chevronDown"></i>
              </span>
              
        </div>
        <div class="criteria__search">
             <div class="input-control">
                 <input type="text" id="criteriaBox${crit}" data-name=${crit} />
                 <label for="search">
                     <span class="closeCross hide"><i class="fa-solid fa-xmark close__search"></i></span>
                     <span><i class="fa-solid fa-magnifying-glass"></i></span>
                 </label>
             </div>
        </div>
  
        <div id="item__selected">
        
        </div>
  
        <div class="item__list" id="itemList${crit}">
        <ul></ul>
        </div>

    </div>
  `;
}
 */

// Activation
// createSelector("ingredients", "Ingrédients");
// createSelector("appliances", "Appareils");
// createSelector("ustensils", "Ustensiles");

/* Expand / compact criteria dropdown box */
/* 
const displayCriteriaBox = document.querySelectorAll(".criteria__header");
displayCriteriaBox.forEach(function (elem) {
  elem.addEventListener("click", function () {
    console.log("wwwwwwwwwWWWWW: ", elem)//.closest("displaySearch"))
    elem.children[1].classList.toggle("criteria__open");
    elem.parentElement.classList.toggle("expand");
  });
});
 */

// E V E N T  D E L E G A T I O N S
// Criteria section
/*
const dropBox = document.querySelector(".criterias");
dropBox.addEventListener("click", expandDropBox);

function expandDropBox(e) {
    if(e.target.matches(".criteria__header"))  {
        // pointer-event disabled for p and span
        // arrow rotation
        e.target.children[1].firstElementChild.classList.toggle("criteria__open");
        // dropdown expand
        e.target.closest(".criteriaWrapper").classList.toggle("expand");
        //e.target.closest(".chevronDown").classList.toggle("criteria__open");
    }
    
}
 */
/* if(e.target.matches(".criteria__header, .chevronDown, p"))  {
        console.log("Y E S")
        let chev = e.target.closest(".criteria__header");
        chev.children[1].classList.toggle("criteria__open");
        chev.parentElement.classList.toggle("expand");
    } */


// Retreive data from input box
const subCriteria = document.querySelector(".criterias");
subCriteria.addEventListener("keyup", getData);

function getData(e) {
  let crit = e.target.dataset.name;
  ////console.log("crit pppp : ", e.target.dataset.name);
  let input = e.target.parentElement.children[0].value;
  if (input.length >= 3) {
    let listIndex = retrieveRecipes(crit, input);
    console.log("list index: ", listIndex);

    templateSelectorUpdate(crit, listIndex);
  } else {
  }
}

function templateSelectorUpdate(crit, data) {
  document.getElementById(`itemList${crit}`).innerHTML = `
    <ul>
      ${data
        .map(
          (item) => `<li class="recipeItem" data-item="${item}">${item}</li>`
        )
        .join("")}
    </ul>
    `;

  aaaa();
}

function getList(crit) {
  if (crit === "appliances") {
    return appliancesList;
  } else if (crit === "ingredients") {
    return ingredientsList;
  } else if (crit === "ustensils") {
    return ustensilsList;
  }
}

function retrieveRecipes(crit, input) {
  let recipeID = []; // ID list of selected recipes
  let searchString = input;
  searchString.toLocaleLowerCase();
  getList(crit).forEach((data) => {
    if (data.toLowerCase().includes(searchString)) {
      recipeID.push(data);
    }
  });
  return recipeID;
}

/* 
displayCriteriaBox.addEventListener("click", (e) => {
    criteriaIconChevron.classList.toggle("criteria__open");
    expandCriteriaWrapper.classList.toggle("expand");
});
 */

function aaaa() {
  let selectedAA = document.querySelectorAll(".recipeItem");
  console.log("listed AA: ", selectedAA);
  /* selectedAA.forEach(zz => zz.addEventListener("click", (e) => {
        console.log("listed", e.target.classList.value)
        //templateSelectedItem(e.target)
    })) */
  selectedAA.forEach(function (element) {
    element.addEventListener("click", function () {
      let text = this.textContent; //getAttribute(".recipeItem"); //classList.value.dataItem;
      console.log("text: ", text);
      tagTemplate(text);
    });
  });
}

function bbbb() {
  // 1 - create tag
  // 2 - remove from the list displayed
  document.querySelector("#item__selected").addEventListener("click", bbbb);
}

function templateSelectedItem(selectedItem) {
  console.log("rrrrrrr==========rrrrrrr", selectedItem);

  // document.getElementById("item__selected").removeChild();
  document.getElementById("item__selected").innerHTML += `
    <p>${selectedItem}</p>
    <i class="fa-solid fa-circle-xmark iconXmark"></i>
    `;
}

// templateSelectorUpdate("ingredients", data0)

// =====================================

function retrieveData(ev) {
  let input = criteriaBoxingredients.value;
  console.log("key pressed: ", input);

  if (input.length >= 3) {
    let listIndex = retrieveRecipes(input);
    console.log("list index: ", listIndex);

    templateSelectorUpdate("ingredients", listIndex);
  } else {
  }

  // ev.preventDefault()
  //console.log("crit: ", crit);
  // console.log("ev: ", ev.target.id.value);
  //let input = ev.key;
  // let inputBox = ev.target.id.split("-")[1]
  // let input = `inputBox${inputBox}`
  // let input = mainInputBox.value;
  // console.log("key pressed: ", input);
  /* 
    if (input.length >= 3) {
      let listIndex = retrieveRecipes(input);
      console.log("list index: ", listIndex)
      
      templateSelectorUpdate("ingredients", listIndex)
    } else {
      
    }
     */
}

/* ======================= */

// S E L E C T E D  I T E M S  T A G S
// Tag template
function tagTemplate(critItem) {
  document.getElementById("recipes__tags").innerHTML += `
      <div class="tag__wrapper data-attr=${critItem}">
        <p>${critItem}</p>
        <span class="closeCrossTag"><i class="fa-solid fa-xmark close__search"></i></span>
      </div>
    `;
}

function removeTag(e) {
  e.stopPropagation();
  const currentTag = e.target.dataset; //.getAttribute("data-attr")
  console.log("clicked: ", e.target.children[0].textContent);
  e.target.classList.add("hide");
  //.getAttribute("data-attr"))
}

const itemTag = document.querySelectorAll(".tag__wrapper");
console.log("azerty: ", itemTag);
itemTag.forEach((tag) => tag.addEventListener("click", removeTag));
//  => tag.classList.add(".hide"))})
//(e) => {this.removeTag(e)});
// })

/* ============================ */

/* 
    if (e.target !== e.curentTarget) {
        let key = e.target.id;
        alert("hello " + key)
    }
    e.stopPropagation();
     */

// const expandCriteriaWrapper = document.querySelector(".criteriaWrapper")
//const displayCriteriaBox = document.querySelector(".criteria__header");

// const criteriaIconChevron = document.querySelector(".displaySearch");
// const displayCriteriaSearch = document.querySelector(".criteria__search");

// Retrieve recipes from Main search bar
/* const mainInputBoxIngredients = document.getElementById("search-ingredients");
mainInputBoxIngredients.addEventListener("keyup", retrieveData);
 */
// const criteriaBoxingredients = document.getElementById("criteriaBoxingredients");
// criteriaBoxingredients.addEventListener("keyup", retrieveData);

// const mainInputBoxappliances = document.getElementById("criteriaBoxappliances");
// mainInputBoxappliances.addEventListener("keyup", retrieveData)

// const mainInputBoxUstensils = document.getElementById("criteriaBoxustensils");
// mainInputBoxUstensils.addEventListener("keyup", retrieveData)
/* 
mainInputBox.onkeyup = function () {
  let input = mainInputBox.value;
  console.log("key pressed: ", input);

  if (input.length >= 3) {
    let listIndex = retrieveRecipes(input);
    console.log("list index: ", listIndex)
    
    templateSelectorUpdate("ingredients", listIndex)
  } else {
    
  }
};
 */

/* expandCriteriaWrapper.style.color = "red" */
/* 
    if(displayCriteriaSearch.style.display === "flex") {
        console.log("rrrrrrr==========rrrrrrr")
        displayCriteriaSearch.style.display = "none"
    } else {
        displayCriteriaSearch.style.display = "flex"
    }
 */
/* displayCriteriaSearch.classList.toggle("displayFlex"); */

/* 
  if (input.length > 0) {
    clearInput.style.display = "inline-flex";
  } else {
    clearInput.style.display = "none";
  }
   */

// createCriteriaList([]);
// recipesSelected.innerHTML = "Aucune recette sélectionnée...";
