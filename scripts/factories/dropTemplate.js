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


// Create a list of recipe based on sub criterias
// And possibly merged with list of recipes selection from main search bar
const criteriaRecipesList = []; 

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



function createSelector(crit, selectorTitle) {
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

        <div class="item__list">

            <ul>
                <li>item1</li>
                <li>item2</li>
                <li>item3</li>
            </ul>
        </div>
    </div>
`;
}

createSelector("ingredients", "Ingrédients");
createSelector("appliances", "Appareils");
createSelector("ustensils", "Ustensiles");

function aTest(inputElem, searchCriteria) {
  const localRecipes = [];

  console.log("searchCriteria", searchCriteria);
  // const str = searchCriteria;
  const list = searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1);
  const criteriaList = `listOf${list}`;
  // criteriaList = eval(criteriaList.toString())
  console.log("List: ",list);
  const criteriaListItem = eval(criteriaList.toString())
  console.log("Eval: ", criteriaListItem);

  let searchString = inputElem;
  searchString.toLocaleLowerCase();
  
  const itemsKeys = Object.keys(criteriaListItem);
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
  // mergeCriteria(criteriaRecipesList.flat());
  displayRecipes(criteriaRecipesList.flat())
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
