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
                        <span class="closeCross hide">
                            <i class="fa-solid fa-circle-xmark close__search"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
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
// Activation
createSelector("ingredients", "Ingrédients");
createSelector("appliances", "Appareils");
createSelector("ustensils", "Ustensiles");
