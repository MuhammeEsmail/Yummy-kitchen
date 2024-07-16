let rowData = document.querySelector("#rowData");
let categoriesRow = document.querySelector("#categoriesRow");
let mealImage = document.querySelector(".mealImage");
let mealName = document.querySelector(".mealName");
let mealInstructions = document.querySelector(".mealInsructions");
let mealArea = document.querySelector(".mealArea");
let mealCatgeory = document.querySelector(".mealCatgeory");
let recipe = document.querySelector(".rowData");
let mealTags = document.querySelector(".mealTags");
let sourceBtn = document.querySelector(".sourceBtn");
let youtubeBtn = document.querySelector(".youtubeBtn");
let nameInput = document.querySelector("#nameInput");
let letterInput = document.querySelector("#letterInput");
let recipeGradiernts = Array.from(document.querySelectorAll(".recipe"));

// open side bar
$("#side-bar-open").click(function () {
  $("aside").animate({ left: "0" }, 500);
  $(this).hide();
  $("#side-bar-close").show();
  $(".nav-item")
    .eq(0)
    .fadeIn(500, function () {
      $(".nav-item")
        .eq(1)
        .fadeIn(200, function () {
          $(".nav-item")
            .eq(2)
            .fadeIn(200, function () {
              $(".nav-item")
                .eq(3)
                .fadeIn(200, function () {
                  $(".nav-item").eq(4).fadeIn(200);
                });
            });
        });
    });
});

// close side bar
$("#side-bar-close").click(function () {
  $(this).hide();
  $("#side-bar-open").show();
  $("aside").animate({ left: "-262.708px" }, 500);
  $(".nav-item")
    .eq(4)
    .fadeOut(300, function () {
      $(".nav-item")
        .eq(3)
        .fadeOut(200, function () {
          $(".nav-item")
            .eq(2)
            .fadeOut(200, function () {
              $(".nav-item")
                .eq(1)
                .fadeOut(200, function () {
                  $(".nav-item").eq(0).fadeOut(200);
                });
            });
        });
    });
});
// get openning meals
async function getData() {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let x = await data.json();
  let mealsData = x.meals;
  displayRandomMeals(mealsData);
}
getData();

// display openning meal
function displayRandomMeals(mealsData) {
  let box = ``;
  for (let i = 0; i < 20; i++) {
    box += `<div class=" col-md-3" onclick="showMeal(${mealsData[i].idMeal})">
                    <div class="meal-data position-relative rounded-3 overflow-hidden">
                        <img src="${mealsData[i].strMealThumb}" alt="meal"
                            class="w-100">
                        <div class="meal-overlay bg-white bg-opacity-75 d-flex align-items-center position-absolute p-2">
                            <h3>${mealsData[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
  }
  rowData.innerHTML = box;
}

// onclick the meal
async function showMeal(Id) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.meals) {
      const recipe = data.meals[0];
      mealImage.setAttribute("src", `${recipe.strMealThumb}`);
      mealName.innerHTML = recipe.strMeal;
      mealInstructions.innerHTML = recipe.strInstructions;
      mealArea.innerHTML = recipe.strArea;
      mealCatgeory.innerHTML = recipe.strCategory;
      if (recipe.strTags == null) {
        $(".mealTags").css("display", "none");
      } else {
        $(".mealTags").css("display", "inline-block");
        mealTags.innerHTML = recipe.strTags;
      }
      sourceBtn.setAttribute("href", recipe.strSource);
      youtubeBtn.setAttribute("href", recipe.strYoutube);
      $(".meals").css("display", "none");
      $("#oneMeal").css("display", "block");
      recipeGradiernts[0].innerHTML = recipe.strMeasure1;
      recipeGradiernts[1].innerHTML = recipe.strMeasure2;
      recipeGradiernts[2].innerHTML = recipe.strMeasure3;
      recipeGradiernts[3].innerHTML = recipe.strMeasure4;
      recipeGradiernts[4].innerHTML = recipe.strMeasure5;
      recipeGradiernts[5].innerHTML = recipe.strMeasure6;
      recipeGradiernts[6].innerHTML = recipe.strMeasure7;
      recipeGradiernts[7].innerHTML = recipe.strMeasure8;
      recipeGradiernts[8].innerHTML = recipe.strMeasure9;
      recipeGradiernts[9].innerHTML = recipe.strMeasure10;
      recipeGradiernts[10].innerHTML = recipe.strMeasure11;
      recipeGradiernts[11].innerHTML = recipe.strMeasure12;
      recipeGradiernts[12].innerHTML = recipe.strMeasure13;
      recipeGradiernts[13].innerHTML = recipe.strMeasure14;
      recipeGradiernts[14].innerHTML = recipe.strMeasure15;
      recipeGradiernts[15].innerHTML = recipe.strMeasure16;
      recipeGradiernts[16].innerHTML = recipe.strMeasure17;
      recipeGradiernts[17].innerHTML = recipe.strMeasure18;
      recipeGradiernts[18].innerHTML = recipe.strMeasure19;
      recipeGradiernts[19].innerHTML = recipe.strMeasure20;
      for (let i = 0; i < recipeGradiernts.length; i++) {
        if (
          recipeGradiernts[i].innerHTML == "" ||
          recipeGradiernts[i].innerHTML == " " ||
          recipeGradiernts[i].innerHTML == null
        ) {
          recipeGradiernts[i].classList.add("d-none");
        } else {
          recipeGradiernts[i].classList.remove("d-none");
        }
      }
    } else {
      console.log("No recipe found for ID", Id);
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

// close meal data
$("#closeMeal").click(function () {
  $(".meals").css("display", "block");
  $("#oneMeal").css("display", "none");
});
// search by name
async function searchByName(name) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let x = await data.json();
  let mealsData = x.meals;
  displayMealsByName(mealsData);
}
function displayMealsByName(mealsData) {
  let box = ``;
  for (let i = 0; i < mealsData.length; i++) {
    box += `<div class=" col-md-3" onclick="showMeal(${mealsData[i].idMeal})">
                    <div class="meal-data position-relative rounded-3 overflow-hidden">
                        <img src="${mealsData[i].strMealThumb}" alt="meal"
                            class="w-100">
                        <div class="meal-overlay bg-white bg-opacity-75 d-flex align-items-center position-absolute p-2">
                            <h3>${mealsData[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
  }
  rowData.innerHTML = box;
}
nameInput.addEventListener("keyup", function (e) {
  searchByName(e.target.value);
});
async function searchByFirstLetter(name) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
  );
  let x = await data.json();
  let mealsData = x.meals;
  $("#rowData").empty();
  displayMealsByfirstLetter(mealsData);
}
function displayMealsByfirstLetter(mealsData) {
  let box = ``;
  let id, thumb, name;
  for (let i = 0; i < mealsData.length; i++) {
    id = mealsData[i].idMeal;
    thumb = mealsData[i].strMealThumb;
    name = mealsData[i].strMeal;
    box += `<div class=" col-md-3" onclick="showMeal(${id})">
                    <div class="meal-data position-relative rounded-3 overflow-hidden">
                        <img src="${thumb}" alt="meal"
                            class="w-100">
                        <div class="meal-overlay bg-white bg-opacity-75 d-flex align-items-center position-absolute p-2">
                            <h3>${name}</h3>
                        </div>
                    </div>
                </div>`;
  }
  rowData.innerHTML = box;
}
letterInput.addEventListener("keyup", function (e) {
  searchByFirstLetter(e.target.value);
});

// meals categories
async function getMealCategories() {
  const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok : ${response.status}`);
    }
    const data = await response.json();

    if (data.categories) {
      const recipe = data.categories;
      console.log(recipe);
      let CategoyName, CategoryDescription, CategoryThumb;
      let box = ``;
      for (let i = 0; i < recipe.length; i++) {
        CategoyName = recipe[i].strCategory;
        CategoryDescription = recipe[i].strCategoryDescription;
        CategoryThumb = recipe[i].strCategoryThumb;
        CategoryId = recipe[i].idCategory;
        box += `<div class=" col-md-3" onclick="displayMeacCategory(${CategoryId})">
        <div class="meal-data position-relative rounded-3 overflow-hidden">
        <img src="${CategoryThumb}" alt="meal"
        class="w-100">
        <div class="meal-overlay bg-white text-center bg-opacity-75 d-flex flex-column justify-content-center align-items-center position-absolute p-1">
        <h3>${CategoyName}</h3>
        <p>${CategoryDescription}</p>
        </div>
        </div>
        </div>`;
      }
      categoriesRow.innerHTML = box;
    } else {
      console.log("No recipe found for");
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

function aaa(x) {
  console.log(x);
}
// show meal in each category
async function displayMeacCategory(id) {
  let catName;
  if (id == 1) {
    catName = "Beef";
  }
  if (id == 2) {
    catName = "Chicken";
  }
  if (id == 3) {
    catName = "Dessert";
  }
  if (id == 4) {
    catName = "Lamb";
  }
  if (id == 5) {
    catName = "Miscellaneous";
  }
  if (id == 6) {
    catName = "Pasta";
  }
  if (id == 7) {
    catName = "Pork";
  }
  if (id == 8) {
    catName = "Seafood";
  }
  if (id == 9) {
    catName = "Side";
  }
  if (id == 10) {
    catName = "Starter";
  }
  if (id == 11) {
    catName = "Vegan";
  }
  if (id == 12) {
    catName = "Vegetarian";
  }
  if (id == 13) {
    catName = "Breakfast";
  }
  if (id == 14) {
    catName = "Goat";
  }

  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
  );
  let x = await data.json();
  let recipe = x.meals;
  let mealName, mealThumb, mealId;
  $("#categoriesRow").css("display", "none");
  let box = ``;
  for (let i = 0; i < recipe.length; i++) {
    mealName = recipe[i].strMeal;
    mealThumb = recipe[i].strMealThumb;
    mealId = recipe[i].idMeal;
    box += `<div class=" col-md-3" onclick="showMeal(${mealId})">
              <div class="meal-data position-relative rounded-3 overflow-hidden">
                  <img src="${mealThumb}" alt="meal"
                      class="w-100">
                  <div class="meal-overlay bg-white bg-opacity-75 d-flex align-items-center position-absolute p-2">
                      <h3>${mealName}</h3>
                  </div>
              </div>
          </div>`;
   }
  rowData.innerHTML = box;
}

// get Area
async function getArea() {
  const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok : ${response.status}`);
    }
    const data = await response.json();

    if (data.meals) {
      const recipe = data.meals;
      console.log(recipe);
      let box = ``;
      for (let i = 0; i < recipe.length; i++) {
        box += `<div class="col-md-3" onclick="displayMeacArea(${i})">
                    <div class="area rounded-3 d-flex flex-column justify-content-center align-items-center">
                        <i class="fa-solid fa-house-flag fa-4x my-3"></i>
                        <h3>${recipe[i].strArea}</h3>
                    </div>
                </div>`;
      }
      categoriesRow.innerHTML = box;
    } else {
      console.log("No recipe found for");
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

// show meal in each Area
async function displayMeacArea(i) {
  let name;
  if (i == 0) {
    name = "American"
  }
  if (i == 1) {
    name = "British"
  }
  if (i == 2) {
    name = "Canadian"
  }
  if (i == 3) {
    name = "Chinese"
  }
  if (i == 4) {
    name = "Croatian"
  }
  if (i == 5) {
    name = "Dutch"
  }
  if (i == 6) {
    name = "Egyptian"
  }
  if (i == 7) {
    name = "Filipino"
  }
  if (i == 8) {
    name = "French"
  }
  if (i == 9) {
    name = "Greek"
  }
  if (i == 10) {
    name = "Indian"
  }
  if (i == 11) {
    name = "Irish"
  }
  if (i == 12) {
    name = "Italian"
  }
  if (i == 13) {
    name = "Jamaican"
  }
  if (i == 14) {
    name = "Japanese"
  }
  if (i == 15) {
    name = "Kenyan"
  }
  if (i == 16) {
    name = "Malaysian"
  }
  if (i == 17) {
    name = "Mexican"
  }
  if (i == 18) {
    name = "Moroccan"
  }
  if (i == 19) {
    name = "Polish"
  }
  if (i == 20) {
    name = "Portuguese"
  }
  if (i == 21) {
    name = "Russian"
  }
  if (i == 22) {
    name = "Spanish"
  }
  if (i == 23) {
    name = "Thai"
  }
  if (i == 24) {
    name = "Tunisian"
  }
  if (i == 25) {
    name = "Turkish"
  }
  if (i == 26) {
    name = "Ukrainian"
  }
  if (i == 27) {
    name = "Unknown"
  }
  if (i == 28) {
    name = "Vietnamese"
  }
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
  );
  let x = await data.json();
  let recipe = x.meals;
  let mealName, mealThumb, mealId;
  $("#categoriesRow").css("display", "none");

  let box = ``;
  for (let i = 0; i < recipe.length; i++) {
    mealName = recipe[i].strMeal;
    mealThumb = recipe[i].strMealThumb;
    mealId = recipe[i].idMeal;
    box += `<div class=" col-md-3" onclick="showMeal(${mealId})">
              <div class="meal-data position-relative rounded-3 overflow-hidden">
                  <img src="${mealThumb}" alt="meal"
                      class="w-100">
                  <div class="meal-overlay bg-white bg-opacity-75 d-flex align-items-center position-absolute p-2">
                      <h3>${mealName}</h3>
                  </div>
              </div>
          </div>`;
    }
  rowData.innerHTML = box;
}

// get ingrediants
async function getIngediants() {
  const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok : ${response.status}`);
    }
    const data = await response.json();

    if (data.meals) {
      const recipe = data.meals;
      console.log(recipe);
      let box = ``;
      for (let i = 0; i < 20; i++) {
        box += `<div class="col-md-3" onclick="displayIngrediantMeal(${i})">
                    <div class="ingrediant rounded-3 d-flex flex-column justify-content-center align-items-center p-2">
                        <i class="fa-solid fa-drumstick-bite fa-3x my-3"></i>
                        <h3>${recipe[i].strIngredient}</h3>
                        <p>${recipe[i].strDescription}</p>
                    </div>
                </div>`;
      }
      categoriesRow.innerHTML = box;
    } else {
      console.log("No recipe found for");
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

// show meal by this ingrediant
async function displayIngrediantMeal(i) {
  let name;
  if (i == 0) {
    name = "Chicken"
  }
  if (i == 1) {
    name = "Salmon"
  }
  if (i == 2) {
    name = "Beef"
  }
  if (i == 3) {
    name = "Pork"
  }
  if (i == 4) {
    name = "Avocado"
  }
  if (i == 5) {
    name = "Apple Cider Vinegar"
  }
  if (i == 6) {
    name = "Asparagus"
  }
  if (i == 7) {
    name = "Aubergine"
  }
  if (i == 8) {
    name = "Baby Plum Tomatoes"
  }
  if (i == 9) {
    name = "Bacon"
  }
  if (i == 10) {
    name = "Bacon"
  }
  if (i == 11) {
    name = "Balsamic Vinegar"
  }
  if (i == 12) {
    name = "Basil"
  }
  if (i == 13) {
    name = "Basil Leaves"
  }
  if (i == 14) {
    name = "Basmati Rice"
  }
  if (i == 15) {
    name = "Bay Leaf"
  }
  if (i == 16) {
    name = "Beef Stock"
  }
  if (i == 17) {
    name = "Beef Brisket"
  }
  if (i == 18) {
    name = "Beef Fillet"
  }
  if (i == 19) {
    name = "Beef Gravy"
  }
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  let x = await data.json();
  let recipe = x.meals;
  let mealName, mealThumb, mealId;
  $("#categoriesRow").css("display", "none");
  let box = ``;
  for (let j = 0; j < recipe.length ; j++) {
    mealName = recipe[j].strMeal;
    mealThumb = recipe[j].strMealThumb;
    mealId = recipe[j].idMeal;
    box += `<div class=" col-md-3" onclick="showMeal(${mealId})">
              <div class="meal-data position-relative rounded-3 overflow-hidden">
                  <img src="${mealThumb}" alt="meal"
                      class="w-100">
                  <div class="meal-overlay bg-white bg-opacity-75 d-flex align-items-center position-absolute p-2">
                      <h3>${mealName}</h3>
                  </div>
              </div>
          </div>`;
      }
  rowData.innerHTML = box;
}

$("#searchBtn").click(function () {
  $(".contact-page").css("display", "none");
  $(".meals").css("display", "block");
  $("#oneMeal").css("display", "none");
  $(".form-row").css("display", "flex");
  $("#rowData").empty();
  $("#categoriesRow").css("display", "none");
  $("aside").animate({ left: "-262.708px" }, 500);
  $("#side-bar-close").hide();
  $("#side-bar-open").show();
});
$("#catgeoryBtn").click(function () {
  $(".contact-page").css("display", "none");
  $(".meals").css("display", "block");
  $("#oneMeal").css("display", "none");

  $(".form-row").css("display", "none");
  $("#rowData").empty();
  $("#categoriesRow").css("display", "flex");
  $("aside").animate({ left: "-262.708px" }, 500);
  $("#side-bar-close").hide();
  $("#side-bar-open").show();
  getMealCategories();
});
$("#areaBtn").click(function () {
  $(".contact-page").css("display", "none");
  $(".meals").css("display", "block");
  $("#oneMeal").css("display", "none");
  $(".form-row").css("display", "none");
  $("#rowData").empty();
  $("#categoriesRow").empty();
  $("#categoriesRow").css("display", "flex");
  $("aside").animate({ left: "-262.708px" }, 500);
  $("#side-bar-close").hide();
  $("#side-bar-open").show();
  getArea()
});

$("#IngreiantsBtn").click(function () {
  $(".contact-page").css("display", "none");
  $(".meals").css("display", "block");
  $("#oneMeal").css("display", "none");
  $(".form-row").css("display", "none");
  $("#rowData").empty();
  $("#categoriesRow").empty();
  $("#categoriesRow").css("display", "flex");
  $("aside").animate({ left: "-262.708px" }, 500);
  $("#side-bar-close").hide();
  $("#side-bar-open").show();
  getIngediants()
});
$("#contactBtn").click(function () {
  $(".meals").css("display", "none");
  $("#oneMeal").css("display", "none");
  $(".form-row").css("display", "none");
  $("#rowData").empty();
  $("#categoriesRow").empty();
  $("#categoriesRow").css("display", "none");
  $("aside").animate({ left: "-262.708px" }, 500);
  $("#side-bar-close").hide();
  $("#side-bar-open").show();
  $(".contact-page").css("display", "block");
});

// lodaing screen
$(document).ready(function(){
  $('.loader').fadeOut(500,function(){
    $('#loading').slideUp(500,function(){
      $('body').css('overflow-y','scroll')
    })
  })
})


// validation
function validateForm() {
  // Get references to the input fields
  let nameMessage = document.querySelector("#name");
  let email = document.querySelector("#email");
  let phone = document.querySelector("#phone");
  let age = document.querySelector("#age");
  let password = document.querySelector("#password");
  let confirmPassword = document.querySelector("#confirmPassword");
  // Error messages
  const errorMessage = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.*exemple@yyy.zzz",
    phone: "Please enter a valid phone number ~11 digits starting with 01~.",
    age: "Your age must be greater than 17",
    password: "Enter Your password *Minimum eight characters, at least one letter and one number:*",
    confirmPassword: "Passwords do not match.",
  };
  // Validation logic
  let isValid = true;

  // Name validation
  const nameRegex =/^[a-zA-Z ]+$/
  if (!nameRegex.test(nameMessage.value)) {
    alert(errorMessage.name);
    isValid = false;
    
  }
  

  // Email validation (basic check)
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!emailRegex.test(email.value)){
    alert(errorMessage.email);
    isValid = false;
  }

  // Phone number validation
  const phoneRegex = /^01\d{9}$/;
  if (!phoneRegex.test(phone.value)) {
    alert(errorMessage.phone);
    isValid = false;
    
  }

  // Age validation (positive integer)
  const ageRegex = /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/;
  if (!ageRegex.test(age.value)) {
    alert(errorMessage.age);
    isValid = false;
    
  }

  // Password validation (check for empty password)
  const passwordRegex = /^([1-9]|\w){8,20}$/;
  if (!passwordRegex.test(password.value)) {
    alert(errorMessage.password);
    isValid = false;
    
  }

  // Confirm password validation (check for matching passwords)
  if (password.value !== confirmPassword.value) {
    alert(errorMessage.confirmPassword);
    isValid = false;
    
  }

  // Prevent form submission if validation fails
  return isValid;
}
