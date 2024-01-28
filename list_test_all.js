// All in one
function iuaVsRecipeId_2() {
    // iua: i ngredients  u stensils  a ppliance
    const getListOfIngredients2 = {} // = new Set ();
    const getListOfUstensils2 = {} // = new Set ();
    const getListOfAppliances2 = {} // = new Set ();
  
    recipes.forEach((recipe) => {
      let ingredients = recipe.ingredients;
      let ustensils = recipe.ustensils;
      let appliance = recipe.appliance;
 
      // ingredients
      ingredients.map((ingredient) => {
               if (!getListOfIngredients2[ingredient.ingredient]) {
            getListOfIngredients2[ingredient.ingredient] = [recipe.id];
          } else {
            getListOfIngredients2[ingredient.ingredient].push(recipe.id);
          }
        });
     // });
      // ustensils
      ustensils.map((ustensil) => {
        if (!getListOfUstensils2[ustensil]) {
          getListOfUstensils2[ustensil] = [recipe.id];
        } else {
          getListOfUstensils2[ustensil].push(recipe.id);
        }
      });
      // appliances
      if (!getListOfAppliances2[appliance]) {
        getListOfAppliances2[appliance] = [recipe.id];
      } else {
        getListOfAppliances2[appliance].push(recipe.id);
     }
    });
    return { getListOfIngredients2, getListOfUstensils2, getListOfAppliances2 };
  }
  
  const alls_2 = iuaVsRecipeId_2();
  const { getListOfIngredients2, getListOfUstensils2, getListOfAppliances2} = alls_2;
  /* const listOfIngredients_2 = {...getListOfIngredients2};
  const listOfUstensils_2 = {...getListOfUstensils2};
  const listOfAppliances_2 = {...getListOfAppliances2}; */

  const listOfIngredients_2 = getListOfIngredients2;
  const listOfUstensils_2 = getListOfUstensils2;
  const listOfAppliances_2 = getListOfAppliances2;
  /* 
  console.log("const listOfIngredients_2", listOfIngredients_2);
  console.log("const listOfUstensils_2", listOfUstensils_2);
  console.log("const listOfAppliances_2", listOfAppliances_2);
  
  console.log("ail details: =======> ", listOfIngredients_2["Ail"]);
  console.log("saladier details: =======> ", listOfAppliances_2["Saladier"]);
   */
  //
  // 3 lists merged in one
  fullList_2 = [{ ...listOfIngredients_2, ...listOfUstensils_2, ...listOfAppliances_2}];

  // console.log("full list 2: ", fullList_2);
  

       /*    
  // ingredients
      ingredients.map((ingredient) => {
        if (!getListOfIngredients[ingredient.ingredient.toLowerCase()]) {
          getListOfIngredients[ingredient.ingredient.toLowerCase()] = [recipe.id];
        } else {
          getListOfIngredients[ingredient.ingredient.toLowerCase()].push(
            recipe.id
          );
        }
      });
  // ustensils
      ustensils.map((ustensil) => {
        if (!getListOfUstensils[ustensil.toLowerCase()]) {
          getListOfUstensils[ustensil.toLowerCase()] = [recipe.id];
        } else {
          getListOfUstensils[ustensil.toLowerCase()].push(recipe.id);
        }
      });
  // appliances
      if (!getListOfAppliances[appliance.toLowerCase()]) {
        getListOfAppliances[appliance.toLowerCase()] = [recipe.id];
      } else {
        getListOfAppliances[appliance.toLowerCase()].push(recipe.id);
      }
   */
  