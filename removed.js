
function createCriteriaListByItems(listItems, inputBox, inputValue) {
    console.log(
      "----  E N T E R I N G  C R E A T E  C R I T E R I A  L I S T  B Y  N A M E -----"
    );
    console.log("createCriteriaListByItems ==> 1,", listItems);
    console.log("createCriteriaListByItems ==> 2,", inputBox);
    console.log("createCriteriaListByItems ==> 3,", inputValue);
  
    const setOfIngredients = new Set();
    const setOfUstensils = new Set();
    const setOfAppliances = new Set();
  
    switch (inputBox) {
      case "ingredients":
        for (const [key, value] of Object.entries(listOfIngredients)) {
          if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
            console.log(
              "// ingredient added to the list Ingredients =================="
            );
            setOfIngredients.add(`${key}`);
          }
        }
      // selectedRecipesIngredients = [...setOfIngredients].sort();
      // updateCriteriaList("ingredients", selectedRecipesIngredients);
  
      case "ustensils":
        for (const [key, value] of Object.entries(listOfUstensils)) {
          if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
            console.log(
              "// ingredient added to the list Ustensils =================="
            );
            setOfUstensils.add(`${key}`);
          }
        }
      // selectedRecipesUstensils = [...setOfUstensils].sort();
      // updateCriteriaList("ustensils", selectedRecipesUstensils);
  
      case "appliances":
        for (const [key, value] of Object.entries(listOfAppliances)) {
          if (`${key}`.toLowerCase().includes(inputValue.toLowerCase())) {
            console.log(
              "// ingredient added to the list Appliances =================="
            );
            setOfAppliances.add(`${key}`);
          }
        }
      // selectedRecipesAppliances = [...setOfAppliances].sort();
      // updateCriteriaList("appliances", selectedRecipesAppliances);
  
      default:
        console.log("erreur");
    }
  
    selectedRecipesIngredients = [...setOfIngredients].sort();
    updateCriteriaList("ingredients", selectedRecipesIngredients);
    selectedRecipesUstensils = [...setOfUstensils].sort();
    updateCriteriaList("ustensils", selectedRecipesUstensils);
    selectedRecipesAppliances = [...setOfAppliances].sort();
    updateCriteriaList("appliances", selectedRecipesAppliances);
  
    console.log("E N D ==============>>>>");
  }

  
  // ====================================================================================



function createCriteriaList_includingTags(listID) {
    console.log(
      "++++++++++++++++++ createCriteriaList_includingTags +++++++++++++++++++++++"
    );
    const setOfIngredients = new Set();
    const setOfAppliances = new Set();
    const setOfUstensils = new Set();
    // -------
    const recipesName = [];
    console.log("list_________ID >>>: ", listID);
  
    listID.forEach((id) => {
      let currentRecipe = recipes.filter(
        (currentRecipe) => currentRecipe.id === id
      ); //[recipeIndex];
      // list of Appliances
      setOfAppliances.add(currentRecipe[0].appliance);
      // list of Ustensils
      currentRecipe[0].ustensils.forEach((ustensil) => {
        setOfUstensils.add(ustensil);
      });
      // list of ingredients
      currentRecipe[0].ingredients.forEach((ingredient) => {
        setOfIngredients.add(ingredient.ingredient);
      });
      // ----------
      // Recipe Name
  
      recipesName.push(currentRecipe[0].name);
    });
  
    console.log("selectedRecipesIngredients", selectedRecipesIngredients);
    selectedRecipesIngredients = [...setOfIngredients].sort();
    selectedRecipesUstensils = [...setOfUstensils].sort();
    selectedRecipesAppliances = [...setOfAppliances].sort();
  
    /* 
    templateSelectorUpdate("ingredients", selectedRecipesIngredients);
    templateSelectorUpdate("appliances", selectedRecipesAppliances);
    templateSelectorUpdate("ustensils", selectedRecipesUstensils);
   */
  
    updateCriteriaList("ingredients", selectedRecipesIngredients);
    updateCriteriaList("appliances", selectedRecipesAppliances);
    updateCriteriaList("ustensils", selectedRecipesUstensils);
    /* 
    console.log("Ingrédients", selectedRecipesIngredients);
    console.log("Ustensiles", selectedRecipesUstensils);
    console.log("Appareils", selectedRecipesAppliances);
     */
    //
    console.log("Recipe Name: ", recipesName);
  }
  
  // =========== S T A N D  B Y ================================================= //
  /* 
  case "mainSearchInput":
  
  currentRecipes.clear();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      // Retrieve ingredients
      recipe.ingredients.forEach((item) => {
        if (
          item.ingredient.toLowerCase().includes(searchString.toLowerCase())
        ) {
          currentRecipes.add(recipe.id);
        }
      });
    });
    if (
      recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchString.toLowerCase())
    ) {
      currentRecipes.add(recipe.id);
      // recipeIDmain.add(recipe.id);
    }
  });
   */
  
  // ======================================================================= //
  
  function retrieveRecipes5(inputValue, inputBox) {
    console.log("E N T E R I N G  R E T R I E V E  R E C I P E S : ", inputBox);
    console.log("inputValue: ", inputValue);
    console.log("inputBox: ", inputBox);
    // Input Box:
    // mainSearchInput: ingredients / name / description
    // ingredients: ingredients
    // appliances: appliances
    // ustensils: ustensils
  
    let recipeIDing = new Set(); // ID list of selected recipes / unique
    let recipeIDust = new Set();
    let recipeIDapp = new Set();
    let recipeIDmain = new Set();
    let recipeIDmerged = new Set();
  
    let searchString = inputValue;
    console.log("searchSring: ", searchString);
    let criteriaBox = inputBox;
    searchString.toLocaleLowerCase();
  
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        // Retrieve ingredients
  
        recipe.ingredients.forEach((item) => {
          if (
            item.ingredient.toLowerCase().includes(searchString.toLowerCase())
          ) {
            recipeIDing.add(recipe.id);
          }
        });
        // Retrieve ustensils
        recipe.ustensils.forEach((item) => {
          if (item.toLowerCase().includes(searchString.toLowerCase())) {
            recipeIDust.add(recipe.id);
          }
        });
        // Retrieve appliance
        if (recipe.appliance.toLowerCase().includes(searchString.toLowerCase())) {
          recipeIDapp.add(recipe.id);
        }
        // If search comes from main search bar
        if (criteriaBox === "mainSearchInput") {
          if (
            recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchString.toLowerCase())
          ) {
            recipeIDing.add(recipe.id);
            // recipeIDmain.add(recipe.id);
          }
        }
      });
    });
  
    switch (inputBox) {
      case "ingredients":
        console.log("// Retrieve ingredients", criteriaBox);
        displayNumberOfRecipes([...recipeIDing].length);
        createCriteriaList([...recipeIDing]);
        return [...recipeIDing];
      case "ustensils":
        console.log("// Retrieve ustensils", criteriaBox);
        displayNumberOfRecipes([...recipeIDust].length);
        createCriteriaList([...recipeIDust]);
        return [...recipeIDust];
      case "appliances":
        console.log("// Retrieve appliance", criteriaBox);
        displayNumberOfRecipes([...recipeIDapp].length);
        createCriteriaList([...recipeIDapp]);
        return [...recipeIDapp];
      case "mainSearchInput":
        console.log("// Retrieve default", criteriaBox);
        displayNumberOfRecipes([...recipeIDing].length);
        createCriteriaList([...recipeIDing]);
        return [...recipeIDing];
      default:
        console.log("Error...");
    }
    // displayNumberOfRecipes([...recipeIDing].length);
    // return [...recipeIDing];
    //return [...recipeID];
  }
  



function getDuplicatesRecipesID(dataArray) {
    console.log("I N  get dup ");
    let uniqueItemsList = new Set();
    let duplicated = [];
    for (let i = 0; i < dataArray.length; i++) {
      if (uniqueItemsList.has(dataArray[i])) {
        duplicated.push(dataArray[i]);
        console.log("zzzz ===>: ", duplicated);
      }
      uniqueItemsList.add(dataArray[i]);
      console.log("unique ===>: ", uniqueItemsList);
    }
    return [...new Set(duplicated)];
  }
  



// console.log("Full list as array: ", Array.from(fullList));

function dispatchItemBySelectorFromRecipeId(listId) {
    const setOfIngredients = new Set();
    const setOfAppliances = new Set();
    const setOfUstensils = new Set();
    listId.forEach((item) => {
      // ingredient
      fullList(item.toLowerCase);
    });
  }
  