
/* ------------------------------------------------- */

let listOfIngredients = [];
/* const toto = recipes.forEach((item) => {
    console.log(item.ingredients)
    //.forEach((ing) => {ing.ingredient}))
})
 */
let toto = [];
recipes.forEach((item) => {
  let tempo = item.ingredients;
  toto = [...toto, ...tempo];

  console.log(tempo);
  //.forEach((ing) => {ing.ingredient}))
  /* }) */
  toto.forEach((item) => {
    if (listOfIngredients.includes(item.ingredient)) {
      listOfIngredients;
    } else {
      listOfIngredients.push(item.ingredient);
    }
  });
});
console.log("toto", toto);
console.log("list of ingredients", listOfIngredients.sort());

//const specificRecipes =


/* 
recipes.filter((item) => {
    // item.name === "Frangipane"
    item[0]
})
 */
//console.log("rrr", specificRecipes)
// console.log("specificRecipes", recipeID);

function retrieveData(input) {
    let recipeID = [];
    let recipeINDX = []

        let searchString = input;
        searchString.toLocaleLowerCase();
        console.log("search: ", searchString);
        
        recipes.forEach((recipe) => {
          recipe.ingredients.forEach((item) => {
            if (item.ingredient.toLowerCase().includes(searchString)) {
              console.log("Ingredient: ", item.ingredient.toLowerCase(), recipe.id, "Recette: ", recipe.name);
              if (!recipeID.includes(recipe.id)) {
                recipeID.push(recipe.id);
                recipeINDX.push(recipes.indexOf(recipe));
            };
            }
          });
          if (
            recipe.name.includes(searchString) ||
            recipe.description.includes(searchString)
          ) {
            if (!recipeID.includes(recipe.id)) {
                recipeID.push(recipe.id);
                recipeINDX.push(recipes.indexOf(recipe));
            };
          }
        });
        console.log("List of Recipes", recipeID, recipeID.length, recipeINDX);
        const totalRecipes = document.querySelector(".total_recipes")
        totalRecipes.innerHTML = recipeID.length + " recettes";
        return recipeINDX;
}

function getSelectedRecipes(recipeList){

}
/* 
const {ingredients: listeOfIngredients } = recipes[0];
console.log("AAAAA: ", listeOfIngredients)
listeOfIngredients.forEach((elem) => {
    console.log(elem.ingredient, elem.quantity, elem.unit)
})
console.log("Recette: ", recipes[0]);
 */

function displayRecipes(listIndex) {
    const recipeDisplaySection = document.getElementById("recipesSelected")
    recipeDisplaySection.replaceChildren();
    listIndex.forEach((indx) => {
        const recipeModel = recipeCardTemplate(indx);
        const recipeCard = recipeModel.getRecipeCard();
        recipeDisplaySection.appendChild(recipeCard);
        //recipeCardTemplate(indx))
    })
}

const mainInputBox = document.getElementById("mainSearchInput");
mainInputBox.onkeyup = function() {
    let input = mainInputBox.value;
    if (input.length >= 3) {
       let listIndex = retrieveData(input);
       displayRecipes(listIndex)
       console.log("Liste index: ", listIndex);
    }
}
