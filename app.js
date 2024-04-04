const thumbnailDisplay = document.getElementById("thumbnailDisplay");
const bigBackground = document.getElementById("bigBackground");

const myImages = [
  {
    url: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "spider-man comics",
  },
  {
    url: "https://images.unsplash.com/photo-1572542006263-35bf4f578b6d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "spider-man in front of a building",
  },
  {
    url: "https://images.unsplash.com/photo-1534375971785-5c1826f739d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "spider-man calling a taxi",
  },
];

// get thumbnail images

// display thumbnails on a page (side bar would be cool?)

function createImageElement(i) {
  newImg = document.createElement("img");
  newImg.src = myImages[i].url;
  newImg.alt = myImages[i].alt;
  newImg.addEventListener("click", function () {
    setBigBackground(myImages[i]);
  });
  thumbnailDisplay.appendChild(newImg);
  //   return newImg;
}
// createImageElement(2);

function displayThumbnails() {
  myImages.forEach(function (currentImage, indexPosition) {
    // These two console logs show me whats being passed:
    // console.log(currentImage);
    // console.log(indexPosition);
    createImageElement(indexPosition);
  });
}

function setBigBackground(image) {
  bigBackground.innerHTML = "";

  newBig = document.createElement("img");
  newBig.src = image.url;
  newBig.alt = image.alt;

  bigBackground.appendChild(newBig);
}

displayThumbnails();
setBigBackground(myImages[0]);

// change the image which is loaded depending on a @media query, set in css
