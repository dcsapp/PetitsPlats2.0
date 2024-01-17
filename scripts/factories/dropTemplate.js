// Manage refined criteria drop list Ingredients / Appliances / Ustensils
// Create HTML template
// Handle merged differents criterias to display recipes:
// - if recipes are only selected from criteria
// - if recipes if first selected from main bar with additional criterias


function recipeItem(selectedRecipesIngredients) {
  return `
    <ul>
    ${selectedRecipesIngredients.map((elem) => `<li>${elem}</li>`).join("")};
    </ul>
    `;
}

function arrayIntersection(arr1, arr2) {
  const arr3 = arr1.filter((data) => arr2.includes(data));
  return arr3;
}

const arr1 = [1, 2, 3 ,4, 5];
const arr2 = [1, 6, 5, 7, 2];

console.log("Intersection: ", arrayIntersection(arr1, arr2))





// Create a list of recipe based on sub criterias
// And possibly merged with list of recipes selection from main search bar
let criteriaRecipesList = []; 


function merge(criteriaList) {
    const toto = [];
    if(criteriaRecipesList.length === 0) {
      console.log("criteria Recipe is empty")
      toto = criteriaList.slice();
    } else {
    criteriaRecipesList.forEach((item) => {
        if (criteriaList.includes(item)) {
            toto.push(item)
        }
    })
  }
  criteriaRecipesList = toto.slice()
    console.log('T O T O : ', toto);
};







function mergeCriteria(critList) {
  console.log("inside: ", criteriaRecipesList.length)
  let mergedArray = [];
  console.log("azerty: ", critList)
  if(criteriaRecipesList.length === 0) {
    criteriaRecipesList = [...critList];
    console.log("1st: ", criteriaRecipesList, critList)
  } else {
    console.log("2nd: ");
    mergedArray = criteriaRecipesList.filter(
      (data) => critList.includes(data)
    );
    console.log("merged array: ",mergedArray)
  }
  console.log(mergedArray)
  /* const arrMerged = criteriaRecipesList.fiter
  mergeSet = new set();
  mergeSet.add(critList) */

}

function tagTemplate(critItem) {
  document.getElementById("recipes__tags").innerHTML += `
    <div class="tag__wrapper data-attr=${critItem}">
      <p>${critItem}</p>
      <span class="closeCrossTag"><i class="fa-solid fa-xmark close__search"></i></span>
    </div>
  `
}
// tagTemplate("jus de pomme");
tagTemplate("test2");

function removeTag(e){
  e.stopPropagation();
  const currentTag = e.target.dataset//.getAttribute("data-attr")
  console.log("clicked: ", e.target.children[0].textContent)
  e.target.classList.add("hide")
  //.getAttribute("data-attr"))
}

const itemTag = document.querySelectorAll(".tag__wrapper");
console.log("azerty: ", itemTag);
itemTag.forEach(tag => tag.addEventListener("click", removeTag))
  //  => tag.classList.add(".hide"))})
  //(e) => {this.removeTag(e)});
// })




function createSelector(crit, selectorTitle) {
  console.log("crit crit= ", crit)
  document.getElementById(`${crit}`).innerHTML = `
    <div class="criteriaWrapper data-criteria-${crit}">
        <div class="criteria__header">
            <p>${selectorTitle}</p>
            <span class="displaySearch">
                <i class="fa-solid fa-chevron-down"></i>
            </span>
        </div>
        <div class="criteria__search">
            <div class="input-control">
                <input type="text" id="search" />
                <label for="search">
                    <span class="closeCross hide"><i class="fa-solid fa-xmark close__search"></i></span>
                    <span><i class="fa-solid fa-magnifying-glass"></i></span>
                </label>
            </div>
        </div>

        <div class="item__selected">
            <p>Coco</p>
            <i class="fa-solid fa-circle-xmark"></i>
        </div>

        <div class="item__list itemList${crit}">

            
        </div>
    </div>
`;
}

createSelector("ingredients", "Ingrédients");
createSelector("appliances", "Appareils");
createSelector("ustensils", "Ustensiles");

const criteriaSelectors = document.querySelectorAll(".criteria__header");
criteriaSelectors.forEach((sel) => sel.addEventListener("click" , (e) => {
  console.log("criteria selector clicked...", e.target.parentNode)
  /* e.target.parentNode.style.height = "250px"; */
  e.target.parentNode.classList.toggle("expand");

}))

function aTest(inputElem, searchCriteria) {
  const localRecipes = [];

  console.log("searchCriteria", searchCriteria);
  // const str = searchCriteria;
  const list = searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1);
  const criteriaList = `listOf${list}`;
  // criteriaList = eval(criteriaList.toString())
  console.log("List: ",list);
  // const criteriaListItem = eval(criteriaList.toString())
  // console.log("Eval: ", criteriaListItem);
  console.log("Eval: ", criteriaList);

  let searchString = inputElem;
  searchString.toLocaleLowerCase();
  
  const itemsKeys = Object.keys(criteriaList);
  // const itemsKeys = Object.keys(criteriaListItem);
  itemsKeys.forEach((item) => {
    if(item.includes(searchString)) {
      console.log("item: ", item)
      console.log("recipes: ", criteriaListItem[item]);
      localRecipes.push(criteriaListItem[item]);
      console.log("aaaa: ", localRecipes.flat());
    }
  })
  criteriaRecipesList.push(localRecipes.flat());
  console.log("Full: ", criteriaRecipesList.flat());
  merge(criteriaRecipesList.flat());
  // displayRecipes(criteriaRecipesList.flat())
}


function retrieveElem(inputElem) {
  let recipeID = [];
  let searchString = inputElem;
  searchString.toLocaleLowerCase();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      if (item.ingredient.toLowerCase().includes(searchString)) {
        if (!recipeID.includes(recipe.id)) {
          recipeID.push(recipe.id);
          console.log("recipeiD: ", recipeID);
        }
      }
    });
  });
}

const azert = document.querySelectorAll(".criteria__search");
const azerty = document.getElementById("ingredients").children;
const qwerty = document.querySelector("#ingredients");
console.log("======> 1: ", azerty);
console.log("======> 2: ", qwerty);
console.log("======> 3: ", qwerty);

document.querySelectorAll(".displaySearch").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    const tempo = e.target.parentNode.parentNode.parentNode.parentNode;
    /* const closeCross = tempo.querySelector("") */
    const xxxx = tempo.querySelector(".criteria__search");
    const querySearch = tempo.querySelector("#search");

    const showHide = tempo.querySelector(".closeCross");

    let recipeID = [];
    querySearch.onkeyup = function () {
      let input = querySearch.value;
      showHide.classList.toggle("hide", input.length < 1);
      showHide.addEventListener("click", () => {
        console.log("showHide clicked...", input);
        input = querySearch.value = "";
        console.log("showHide clicked...", input);
        showHide.classList.toggle("hide", input.length < 1);
      });
      /* if(input.length > 0) {
        showHide.classList.remove("hide")
      } else {showHide.classList.add("hide")} */
      console.log("key pressed: ", input);
      if (input.length >= 3) {
        /* retrieveElem(input) */
        aTest(input, tempo.id);
      }
    };

    xxxx.style.display = "flex";

    console.log("clicked...tempo", tempo, xxxx, azert, e.parentNode);
    console.log("==========================");
    console.log("clicked...tempo", tempo.id);
    console.log("clicked...xxxx", xxxx);
    console.log("clicked...showHide", showHide);
    console.log("recipeiD: ", recipeID);
    /* azert[3].style.display = "flex"; */
  });
});
