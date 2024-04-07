//  -- Variables --
// General
const thumbnailDisplay = document.getElementById("thumbnailDisplay");
const bigBackground = document.getElementById("bigBackground");
const currentPageDisplay = document.getElementById("currentPage");
// Dark Mode Toggle
const darkLightToggle = document.querySelectorAll(".background-colour");
const shadow = document.querySelectorAll(".shadow");
const darkToggleButton = document.getElementById("darkToggleButton");

// User search
const searchBtn = document.getElementById("goBtn");
const userSearchBox = document.getElementById("userSearch");
// Navigation buttons
const nextPageBtn = document.getElementById("nextPage");
const prevPageBtn = document.getElementById("prevPage");
const nextImage = document.getElementById("nextImage");
const prevImage = document.getElementById("prevImage");
// The button which toggles the thumbnail display
const displayButton = document.getElementById("displayButton");
// Clear input box on page load
document.getElementById("userSearch").value = "";
// For the API call
const accessKey = "c4FY3Wae-WwNMmxkFDUwHwSt9LlkYhc5svQ9T8ZjEzM";
// Array to store image results in
let newImages = [{}];
// we "let" these so that there are defaults for the page to load with, but mainly so that the page can respond to user input and device.
let userSearch = "orange";
let pageWidth = "landscape";
let pageNumber = 1;
let currentImagePosition = 0;

darkToggleButton.addEventListener("click", function () {
  for (let index = 0; index < darkLightToggle.length; index++) {
    darkLightToggle[index].classList.toggle("background-colour");
    darkLightToggle[index].classList.toggle("background-colour-light");
  }
  for (let index = 0; index < shadow.length; index++) {
    shadow[index].classList.toggle("shadow");
    shadow[index].classList.toggle("shadow-light");
  }
});
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
  newImg.classList.add("thumbnail-image");
  newImg.setAttribute("tabindex", "0");
  // Enable a user to 'tab-enter' between images for accessibility.
  newImg.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      setBigBackground(i);
      currentImagePosition = newImages.indexOf(i);
    }
  });
  newImg.addEventListener("click", function () {
    // When a thumbnail is clicked, set the main image background to be the thumbnail.
    setBigBackground(i);
    // 'newImages.indexOf(i)' lets us find the index position of the current object, within the newImages array.
    console.log(
      "Current index position of current object: ",
      newImages.indexOf(i)
    );
    console.log("current image position: ", currentImagePosition);
    currentImagePosition = newImages.indexOf(i);
    console.log("new current image position: ", currentImagePosition);
  });
  thumbnailDisplay.appendChild(newImg);
}

function displayThumbnails(resultArray) {
  // Set the new results to the array variable on the page.
  newImages = resultArray;
  // Display each new image in the thumbnail container
  for (let index = 0; index < newImages.length; index++) {
    createImageElement(newImages[index]);
  }
}

function setBigBackground(result) {
  // console.log("a test of what to use: ", newImages[currentImagePosition]);
  // Clear current background
  bigBackground.innerHTML = "";
  // Create new <img> element
  newBig = document.createElement("img");
  // Set element attributes
  newBig.src = result.urls.regular;
  newBig.alt = result.alt_description;
  // Add img to page
  bigBackground.appendChild(newBig);
  updateScrollBar(result);
}

// --- --- --- ---
// --- API ---
async function getImage() {
  let temporaryLiteral = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${userSearch}&orientation=${pageWidth}&client_id=${accessKey}`; // the term passed in below to fetch images from Unsplash
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
      userSearchBox.style.color = "black";

      userSearchBox.value = "";
    }, 1200);
  } else if (resultArray.length != 0) {
    console.log("big win!!");
    thumbnailDisplay.innerHTML = "";
    displayThumbnails(resultArray);
    newbackground = resultArray[currentImagePosition];
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
  // Assign what the user wrote to a variable
  userSearch = document.getElementById("userSearch").value;
  // Pass it into the next function
  currentImagePosition = 0;
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

displayButton.addEventListener("click", function () {
  thumbnailDisplay.classList.toggle("hidden");
});

// Functions to change background image, and change set of images.
// Makes *heavy* use of 'curremntImagePosition' to ensure the user flicks through images sequentially, both backwards and forwards.
function advanceImage() {
  if (currentImagePosition < newImages.length - 1) {
    currentImagePosition += 1;
    setBigBackground(newImages[currentImagePosition]);
  } else if ((currentImagePosition = newImages.length)) {
    advancePage();
    currentImagePosition = 0;
  }
}

function reverseImage() {
  if (currentImagePosition > 0) {
    currentImagePosition -= 1;
    setBigBackground(newImages[currentImagePosition]);
  } else if (currentImagePosition === 0 && pageNumber > 1) {
    currentImagePosition = 9;
    reversePage();
  }
}

function advancePage() {
  pageNumber += 1;
  getImage();
  currentPageDisplay.textContent = pageNumber;
}

function reversePage() {
  if (pageNumber > 1) {
    pageNumber -= 1;
    getImage();
    currentPageDisplay.textContent = pageNumber;
  }
}
//  Change the image page which is given to the API query, then display appropriately.
nextPageBtn.addEventListener("click", advancePage);
prevPageBtn.addEventListener("click", reversePage);
// Change the image using the buttons.
nextImage.addEventListener("click", advanceImage);
prevImage.addEventListener("click", reverseImage);
// Change the image using the keyboard.
window.addEventListener("keydown", navigateLeftRight);

function navigateLeftRight(event) {
  // Previous
  if (event.key === "ArrowLeft") {
    reverseImage();
    // Next
  } else if (event.key === "ArrowRight") {
    advanceImage();
  }
}

// Fancy scroll bar positioning, thanks to Sam.
// This checks which image is currently active, then updates the thumbnail scroll bar to highlight and match
function updateScrollBar(currentImage) {
  let thumbnails = thumbnailDisplay.querySelectorAll(".thumbnail-image");
  let activeThumbnail;
  thumbnails.forEach(function (thumb) {
    if (thumb.getAttribute("src") === currentImage.urls.regular) {
      activeThumbnail = thumb;
    } else {
      thumb.style.border = "none";
    }
  });

  if (activeThumbnail) {
    // getBoundingClientRect returns a fancy object that tells us where our elements are on the page.
    const thumbRect = activeThumbnail.getBoundingClientRect();
    const containerRect = thumbnailDisplay.getBoundingClientRect();
    activeThumbnail.style.border = "3px solid orange";
    activeThumbnail.style.height = "125px";

    // Calculate the position to scroll to, centering the active thumbnail. Sam found this online, I edited it to work for mobile and desktop.
    let scrollLeftPos;
    if (x.matches) {
      scrollLeftPos =
        activeThumbnail.offsetLeft +
        thumbRect.width / 2 -
        containerRect.width / 2;
    } else {
      scrollLeftPos =
        activeThumbnail.offsetLeft +
        thumbRect.width * 0.5 -
        containerRect.width;
    }
    thumbnailDisplay.scrollTo({
      left: scrollLeftPos,
      behavior: "smooth",
    });
  }
}
