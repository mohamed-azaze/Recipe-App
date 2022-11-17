//////////////////////////////////////////////////////
// Select Varible ///////////////////////////////////
const searchInput = document.querySelector(".search-meals input");
const searchBtn = document.querySelector(".search-icon");
//////////////////////////////////////////////////////
const pupopContainer = document.querySelector(".pupop-container");
const mealsContainer = document.querySelector(".pupop-container .meals-container");
const closePupopBtn = document.querySelector(".pupop-container .button");
//////////////////////////////////////////////////////
const detailsPupopContainer = document.querySelector(".details-pupop-container");
//////////////////////////////////////////////////////
const favMealContainer = document.querySelector(".fav-meals .meals-container")
//////////////////////////////////////////////////////
let randomData = false;
let randomMealDetails;
let mealsData;
//////////////////////////////////////////////////////
// Start Functions ///////////////////////////////////
//////////////////////////////////////////////////////
// Local Storage Function ////////////////////////////
if (localStorage.getItem("meals")) {
    viewFavMeals(JSON.parse(localStorage.getItem("meals")))
}
////////////////////////////////////////////////////
// Search Meal Function ///////////////////////////
searchBtn.addEventListener("click", searchMeals);
function searchMeals() {
    randomData = true;
    getSearchApi(searchInput.value);
    searchInput.value = "";

}
function getSearchApi(inputValue) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`)
        .then(async (res) => {
            const data = await res.json();
            const meals = data.meals;
            if (!meals) {
                alert("no Meals Found");
            } else {
                viewMeals(meals);
                if (randomData) {
                    mealsData = meals;
                } else {
                    mealsData = randomMealDetails;
                }
            }
        })
        .catch((err) => {
            console.log("There is Error " + err);
        });
}
function viewMeals(arr) {
    pupopContainer.classList.add("show");
    arr.forEach((meal, idx) => {
        mealsContainer.innerHTML += `<div class="meal">
                                        <div 
                                        class="image over-hidden border-r-5 cursor-pointer"
                                        onclick='showDetails(${idx})'
                                        >
                                        <img
                                            
                                            class="maxw-100"
                                            src=${meal.strMealThumb}
                                            alt=""
                                        />
                                        </div>
                                        <div class="info  pr-5 pl-5 pt-5 pb-10 d-flex justify-between align-start gap-15">
                                        <span class="d-block fz-15 fw-700 ">${meal.strMeal}</span>
                                        <i class="fa-solid fa-heart cursor-pointer" onclick='saveMeal(${meal.idMeal})'></i>
                                        </div>
                                    </div>`;
    });
}
//////////////////////////////////////////////////////
// close Pupop Function /////////////////////////////
closePupopBtn.addEventListener("click", closeSearchPupop);
function closeSearchPupop() {
    pupopContainer.classList.remove("show");
    document
        .querySelectorAll(".meal-pupop .meal")
        .forEach((meal) => meal.remove());
    randomData = false;
}
//////////////////////////////////////////////////////
// Meal Details Function ////////////////////////////
function showDetails(indx) {
    if (randomData) {
        for (let i = 0; i < mealsData.length; i++) {
            if (i === indx) {
                detailsPupopContainer.classList.add("show");
                const detailsContainer = document.querySelector(".details-pupop");

                detailsContainer.innerHTML = `
                                        <div class="button pos-absolute" onclick="closepup()">
                                            <span>Close</span>
                                        </div>
                                        <div class="container flex-center">
                                            <div class="info w-half align-self-start">
                                            <header class="txt-center mt-20 mb-20">
                                                <h2>Meal Recipe</h2>
                                            </header>
                                            <div class="meal-details pl-15 pr-15">
                                                <h3 class="mt-15 mb-15 fw-600">
                                                <span class="fw-bold">Meal: </span>
                                                ${mealsData[indx].strMeal}
                                                </h3>
                                                <p class="line-h-1-half">
                                                <span class="fz-20 fw-bold">Meal Details: </span>
                                                ${mealsData[indx].strInstructions}
                                                </p>
                                            </div>
                                            </div>
                                            <div class="image w-half pos-relative">
                                            <img class="maxw-100" src=${mealsData[indx].strMealThumb} alt="" />
                                            <i
                                                class="fa-solid fa-heart cursor-pointer pos-absolute"
                                                onclick="saveMeal(${mealsData[indx].idMeal})"
                                            ></i>
                                            </div>
                                        </div>`
            }
        }
    } else {
        detailsPupopContainer.classList.add("show");
        const detailsContainer = document.querySelector(".details-pupop");
        detailsContainer.innerHTML = `
                                        <div class="button pos-absolute" onclick="closepup()">
                                            <span>Close</span>
                                        </div>
                                        <div class="container flex-center">
                                            <div class="info w-half align-self-start">
                                            <header class="txt-center mt-20 mb-20">
                                                <h2>Meal Recipe</h2>
                                            </header>
                                            <div class="meal-details pl-15 pr-15">
                                                <h3 class="mt-15 mb-15 fw-600">
                                                <span class="fw-bold">Meal: </span>
                                                ${randomMealDetails[0].strMeal}
                                                </h3>
                                                <p class="line-h-1-half">
                                                <span class="fz-20 fw-bold">Meal Details: </span>
                                                ${randomMealDetails[0].strInstructions}
                                                </p>
                                            </div>
                                            </div>
                                            <div class="image w-half pos-relative">
                                            <img class="maxw-100" src=${randomMealDetails[0].strMealThumb} alt="" />
                                            <i
                                                class="fa-solid fa-heart cursor-pointer pos-absolute"
                                                onclick='saveMeal(${randomMealDetails[0].idMeal})'
                                            ></i>
                                            </div>
                                        </div>
        `
    }
}
function closepup() {
    detailsPupopContainer.classList.remove("show");
}
/////////////////////////////////////////////////////
// Random Meal Function ////////////////////////////
function randomMeal() {
    const randomMeal = document.querySelector(".random-meal");
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
        async (res) => {
            const data = await res.json();
            const meal = data.meals;
            randomMealDetails = meal
            randomMeal.innerHTML = `<div class="image over-hidden mr-auto ml-auto border-r-5 cursor-pointer" onclick='showDetails()'>
                                        <img
                                        class="maxw-100"
                                        src=${meal[0].strMealThumb}
                                        alt=""
                                        />
                                    </div>
                                    <div class="info flex-between pr-15 pl-15 mt-10">
                                        <span class="d-block fz-20 fw-700">${meal[0].strMeal}</span>
                                        <i class="fa-solid fa-heart cursor-pointer like-meal" onclick='saveMeal(${meal[0].idMeal})'></i>
                                    </div>`;
        }
    );
}; randomMeal();
//////////////////////////////////////////////////////
// Save Fav Meal ////////////////////////////////////
function saveMeal(mealId) {
    const finalMeals = [];

    if (randomData) {
        for (let i = 0; i < mealsData.length; i++) {
            if (mealsData[i].idMeal == mealId) {
                if (localStorage.getItem("meals")) {
                    const storageMeals = JSON.parse(localStorage.getItem("meals"));
                    const newMeals = storageMeals.filter(meal => {
                        if (meal.idMeal != mealId) {
                            return meal
                        }
                    })
                    if (storageMeals.length == newMeals.length) {
                        finalMeals.push(mealsData[i])
                    }

                    localStorage.removeItem("meals");
                    localStorage.setItem("meals", JSON.stringify([...newMeals, ...finalMeals]))

                } else {
                    localStorage.setItem("meals", JSON.stringify([mealsData[i]]))
                }
            }
        }
    } else {
        if (localStorage.getItem("meals")) {
            const storageMeals = JSON.parse(localStorage.getItem("meals"));
            const newMeals = storageMeals.filter(meal => {
                if (meal.idMeal != mealId) {
                    return meal
                }
            })
            if (storageMeals.length == newMeals.length) {
                finalMeals.push(randomMealDetails[0])
            }

            localStorage.removeItem("meals");
            localStorage.setItem("meals", JSON.stringify([...newMeals, ...finalMeals]))

        } else {
            localStorage.setItem("meals", JSON.stringify([randomMealDetails[0]]))
        }
    }

    viewFavMeals(JSON.parse(localStorage.getItem("meals")))

}
//////////////////////////////////////////////////////
// View Fav Meals Function //////////////////////////
function viewFavMeals(meals) {
    document.querySelectorAll(".fav-meals .meals-container .meal").forEach(ele => ele.remove())
    meals.forEach((meal, idx) => {
        favMealContainer.innerHTML += `<div class="meal d-flex flex-dir-column align-center mb-10">
                                                <div class="image border-r-50 over-hidden border-3-fff cursor-pointer" onclick='favMealDetails(${idx})'>
                                                <img
                                                    class="maxw-100 obj-cover"
                                                    src=${meal.strMealThumb}
                                                    alt=""
                                                />
                                                </div>
                                                <span class="d-block fz-15px fw-700 txt-center">${meal.strMeal}</span>
                                            </div> `
    })

}
//////////////////////////////////////////////////////
// view Fav Meal Details function ///////////////////
function favMealDetails(indx) {
    const storageData = JSON.parse(localStorage.getItem("meals"));
    for (let i = 0; i < storageData.length; i++) {
        if (i == indx) {
            detailsPupopContainer.classList.add("show");
            const detailsContainer = document.querySelector(".details-pupop");
            detailsContainer.innerHTML = ` <div class="button pos-absolute" onclick="closepup()">
                                            <span>Close</span>
                                        </div>
                                        <div class="container flex-center">
                                            <div class="info w-half align-self-start">
                                            <header class="txt-center mt-20 mb-20">
                                                <h2>Meal Recipe</h2>
                                            </header>
                                            <div class="meal-details pl-15 pr-15">
                                                <h3 class="mt-15 mb-15 fw-600">
                                                <span class="fw-bold">Meal: </span>
                                                ${storageData[indx].strMeal}
                                                </h3>
                                                <p class="line-h-1-half">
                                                <span class="fz-20 fw-bold">Meal Details: </span>
                                                ${storageData[indx].strInstructions}
                                                </p>
                                            </div>
                                            </div>
                                            <div class="image w-half pos-relative">
                                            <img class="maxw-100" src=${storageData[indx].strMealThumb} alt="" />
                                            <i
                                                class="fa-solid fa-heart cursor-pointer pos-absolute"
                                                onclick='saveMeal(${storageData[indx].idMeal})'
                                            ></i>
                                            </div>
                                        </div>`
        }

    }

}
