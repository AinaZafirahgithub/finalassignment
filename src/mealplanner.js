const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// EVENT LISTENERS //
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// GET MEALS THAT MATCHS THE INGREDIENTS ENTERED BY USER //
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();

    // API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <p class = "recipe-category">- ${meal.strArea} -</p><br>
                            <p class = "recipe-category">- ${meal.strCategory} -</p><br>
                            <a href = "#" class = "recipe-btn">View Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Oops! Sorry, we didn't find any meal recipes.";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// RECIPE OF THE MEAL
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// MODEL DISPLAY
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <div class = recipe-instruct>
            <h3>Ingredients & Measurement:</h3>
            <ul class="left">
                <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
                <li>${meal.strMeasure7} ${meal.strIngredient7}</li>
                <li>${meal.strMeasure8} ${meal.strIngredient8}</li>
                <li>${meal.strMeasure9} ${meal.strIngredient9}</li>
                <li>${meal.strMeasure10} ${meal.strIngredient10}</li>
                <li>${meal.strMeasure11} ${meal.strIngredient11}</li>
                <li>${meal.strMeasure12} ${meal.strIngredient12}</li>
                <li>${meal.strMeasure13} ${meal.strIngredient13}</li>
                <li>${meal.strMeasure14} ${meal.strIngredient14}</li>
            </ul>
        </div>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch YouTube Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}