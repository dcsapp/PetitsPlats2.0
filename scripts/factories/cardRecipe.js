// R E C I P E  C A R D
console.log("recipes CARDS !!!", recipes);

function recipeCardTemplate(recipeIndex) {
  console.log("oooo: ", typeof(recipeIndex));
  let currentRecipe = recipes[recipeIndex];
  //  console.log("QQQQQQ: ", currentRecipe);
  const pathToImage = "./assets/images/recettes";
  const { image, time, name, description, ingredients } = recipes[recipeIndex];
  // const { image, time, name, description, ingredients } = currentRecipe;
  console.log("image: ", image);
  function getRecipeCard() {
    // Each card is created as an article
    const article = document.createElement("article");
    article.classList.add("recipeCard__layout");

    // Recipe img + duration tag
    const recipeCard__img = document.createElement("img");
    recipeCard__img.setAttribute("src", `${pathToImage}/${image}`);
    recipeCard__img.setAttribute("alt", name);
    recipeCard__img.classList.add("recipCard__img");
    // Receipe duration
    const recipeDuration = document.createElement("div");
    recipeDuration.classList.add("recipeDuration");
    const recipeDuration__text = document.createElement("p");
    recipeDuration.appendChild(recipeDuration__text)
    recipeDuration__text.textContent = `${time}min`;
    article.appendChild(recipeDuration);
    //
    article.appendChild(recipeCard__img);

    // Recipe details as section: title / description / ingredients
    const recipeCard__details = document.createElement("section");
    recipeCard__details.classList.add("recipeCard__details");

    // Recipe name (title)
    const recipe__name = document.createElement("h2");
    recipe__name.classList.add("recipe__name");
    recipe__name.textContent = name;
    recipeCard__details.appendChild(recipe__name);
    article.appendChild(recipeCard__details);

    // D E S C R I P T I O N
    // Recipe subTitle RECETTE
    const recipeDescription__subTitle = document.createElement("h3");
    recipeDescription__subTitle.classList.add("recipe__subTitle");
    recipeDescription__subTitle.textContent = "RECETTE";
    recipeCard__details.appendChild(recipeDescription__subTitle);

    // Recipe description
    const recipeDescription__text = document.createElement("div");
    recipeDescription__text.classList.add("recipe__description");
    const recipeDescription__shortText = document.createElement("p");
    recipeDescription__shortText.textContent = description;
    recipeDescription__text.appendChild(recipeDescription__shortText)
    recipeCard__details.appendChild(recipeDescription__text);

    // I N G R E D I E N T S
    // Recipe subTitle INGREDIENTS
    const recipeIngredients__subTitle = document.createElement("h3");
    recipeIngredients__subTitle.classList.add("recipe__subTitle");
    recipeIngredients__subTitle.textContent = "INGREDIENTS";
    recipeCard__details.appendChild(recipeIngredients__subTitle);

    // List of ingredients
    const recipeIngredients__list = document.createElement("div");
    recipeIngredients__list.classList.add("recipeIngredients__list");
    recipeCard__details.appendChild(recipeIngredients__list);

    ingredients.forEach((ingredient) => {
        const ingredientsDetails = document.createElement("div");
        ingredientsDetails.classList.add("ingredientsDetails");
        
        /* Ingredient name */
        const ingredientName = document.createElement("div");
        ingredientName.classList.add("ingredientName");
        ingredientName.textContent = ingredient.ingredient;
        ingredientsDetails.appendChild(ingredientName);

        /* Ingredient quantity / unit */
        const ingredientQuantityUnit = document.createElement("div");
        ingredientQuantityUnit.classList.add("ingredientQuantityUnit");
        if(!ingredient.quantity) {ingredient.quantity = ""}
        if(!ingredient.unit) {ingredient.unit = ""}
        ingredientQuantityUnit.textContent = `${ingredient.quantity} ${ingredient.unit}`;

        ingredientsDetails.appendChild(ingredientQuantityUnit);

        recipeCard__details.appendChild(ingredientsDetails);
        recipeIngredients__list.appendChild(ingredientsDetails);
    })
    return article;
  }
  return { getRecipeCard };
}
recipeCardTemplate(recipes[0]);
