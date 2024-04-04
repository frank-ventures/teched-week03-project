//  -- Variables --
const thumbnailDisplay = document.getElementById("thumbnailDisplay");
const bigBackground = document.getElementById("bigBackground");
const searchBtn = document.getElementById("goBtn");
const userSearchBox = document.getElementById("userSearch");

// Clear input box on page load
document.getElementById("userSearch").value = "";

const accessKey = "c4FY3Wae-WwNMmxkFDUwHwSt9LlkYhc5svQ9T8ZjEzM";

const newImages = [{}];
// we "let" these so that there are defaults for the page to load with, but mainly so that the page can respond to user input and device.
let userSearch = "coffee";
let pageWidth = "landscape";

//  Old Object from start of build
// const myImages = [
//   {
//     url: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "spider-man comics",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1572542006263-35bf4f578b6d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "spider-man in front of a building",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1534375971785-5c1826f739d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     alt: "spider-man calling a taxi",
//   },
// ];

// --- --- --- ---
//  --- Functions ---
function createImageElement(i) {
  // 'i' is the resultArray[index] we passed in.
  newImg = document.createElement("img");
  newImg.src = i.urls.regular;
  newImg.alt = i.alt_description;
  newImg.addEventListener("click", function () {
    setBigBackground(i);
  });
  thumbnailDisplay.appendChild(newImg);
}

function displayThumbnails(resultArray) {
  for (let index = 0; index < resultArray.length; index++) {
    // console.log(resultArray[index]);
    newImages.forEach((element) => {
      element = resultArray[index];
      console.log("element display: ", element);
      createImageElement(resultArray[index]);
    });
  }
  console.log("done");
}

function setBigBackground(result) {
  // Clear current background
  bigBackground.innerHTML = "";
  // Create new <img> element
  newBig = document.createElement("img");
  // Set element attributes
  newBig.src = result.urls.regular;
  newBig.alt = result.alt_description;
  // Add img to page
  bigBackground.appendChild(newBig);
}

// --- --- --- ---
// --- API ---
async function getImage() {
  let temporaryLiteral = `https://api.unsplash.com/search/photos?page=1&query=${userSearch}&orientation=${pageWidth}&client_id=${accessKey}`; // the term passed in below to fetch images from Unsplash
  console.log(temporaryLiteral);
  const response = await fetch(temporaryLiteral);
  // Parse the results
  dataJson = await response.json();
  // Store the results needed from Unsplash in a local Array
  let resultArray = dataJson.results;

  // A statement to make sure a result has been retrieved before running changes
  if (resultArray == 0) {
    userSearchBox.style.backgroundColor = "rgb(194, 20, 20)";
    userSearchBox.style.color = "white";
    userSearchBox.value = "Invalid Term!!";
    setTimeout(() => {
      userSearchBox.style.backgroundColor = "white";
      userSearchBox.value = "";
    }, 1200);
  } else if (resultArray.length != 0) {
    console.log("big win!!");
    thumbnailDisplay.innerHTML = "";
    displayThumbnails(resultArray);
    newbackground = resultArray[4];
    setBigBackground(newbackground);
  }

  //  These logs let me identify how to access what I need
  // console.log(response);
  // console.log(dataJson);
  // console.log(dataJson.results);
  // console.log(dataJson.results[0]);
  // console.log(dataJson.results[0].alt_description);
  // console.log(dataJson.results[0].urls.regular);
}

// --- --- --- ---
// Change page display depanding on width
// https://www.w3schools.com/howto/howto_js_media_queries.asp

function changePageOnWidth(x) {
  if (x.matches) {
    // If media query matches
    // Change global variable
    pageWidth = "portrait";
    // Refresh images
    getImage();
  } else {
    pageWidth = "landscape";
    getImage();
  }
}

// Create a MediaQueryList object
let x = window.matchMedia("(max-width: 600px)");

// Call listener function at run time
changePageOnWidth(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
  changePageOnWidth(x);
});

// --- --- --- ---
// --- Run function on page load ---
getImage(userSearch);

// --- --- --- ---
// -- User Input Button --
function changeImageWithUserSearch() {
  // Assign what the user wrote to a new variable
  userSearch = document.getElementById("userSearch").value;
  // Pass it into the next function
  getImage();
}

// Simulate the button being clicked when user presses keyboard 'enter' instead
// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
userSearchBox.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("goBtn").click();
  }
});
