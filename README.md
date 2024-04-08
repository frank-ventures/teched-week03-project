# Week Three Project

## Project- Building an accessible image gallery

This week we were tasked to combine what we'd learned about accessibility, @media queries, responsiveness, APIs and user interaction, on top of our existing HTML, CSS and JavaScript knowledge.

There were three main sections to the project this week:

- I want to browse a set of thumbnail images that load quickly
- I want to select a thumbnail and display a larger version of the image, with a description
- I expect accessible considerations like alternative text for images, and the ability to click next and previous buttons using the keyboard

I kept track of my thoughts and tasks here: [https://frankjs.notion.site/Day-Nine-9c5ea40fad3e4b31aaacca0253e92175](https://frankjs.notion.site/Day-Twelve-project-167b05580f704e5abffee38bacbd55cb?pvs=4)

### Features!

- Thumbnails display on the page!
- A larger image represents a 'background image'!
- The 'Unsplash' API is linked and used to allow the user to define which images they'd like to see.
- There's a user input field on the page to allow them to update the page images.
- Responsive design: looks great on mobile and desktop!
- Interaction: Change images with buttons, change selection with buttons.
- Accessibility features: Navigate via 'tab' and 'enter'. Screen-reader friendly.
- Infinite scroll! Pages and images just keep loading the more you click!
- The thumbnail bar keeps up with your currently selected image.
- Image quality toggle

### What went well

I was able to quickly get a working implementation up and running by using simple demo code.

The thumbnails change the background as needed.

With help, and through lots of tinkering I got the Unsplash API up and running on the page. This meant that I could retrieve external images and update the page with them, and also let a user input text to search for and update these images.

I dug into the CSS and got the page elements styled nicely and positioned where I wanted.

I used @Media queries to make the page respond how I wanted to for varying screen sizes, and for mobile. I was _very_ happy with the result.

The JavaScript also listens for screen width and if it's less than 600 pixels, the API will query for 'portrait' images.

I got all the buttons to function as intended, adding further depth to the user interaction. Adding 'next/previous page' buttons was as simple as modifying the 'page number' in the string passed to the API query.

The 'Lighthouse' score is pretty good as well!

### Sticky points

When trying to implement the Unsplash API I went down the wrong rabbit hole! I mis-read part of the documentation which made linking my JS much harder than it needed to be.

With direction from a mentor _(Thanks Manny!)_ I was able to use the correct and much simpler link to start getting images onto my page!

I had to search for a couple of functions _(linked to below, in Resources)_, one of them being to enable the user to hit 'enter' on their keyboard to use their search term.

It took a while to figure out a good way to access the index position of the currently selected image _(which is the current object)_, however I found an inbuilt method, .indexOf, thanks to MDN Docs which let me add the function to navigate between images.
I made it so that the array position is retained regardless of using buttons, the keyboard or clicking thumbnails.

### Bonus points

I created a "Light/Dark" mode toggle.

I was able to add some extra code which automatically loaded the next page of images if the user gets to the end of the current set, or, goes to the previous page if they're going back.

I also studied some sample code provided by one of our tutors, to enable the thumbnail scroll bar to keep up with the currently selected image.
I got this functionality working on mobile and desktop by editing in an 'if' statement, and also, enhanced it by giving the "current thumbnail" a highlighted border.

### Future improvements

- Slick transition animations
- Swipe functionality
- "Download this image" button

### Resources

Using Media Queries in JavaScript - https://www.w3schools.com/howto/howto_js_media_queries.asp

Simulate mouse click when 'enter' is pressed - https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

Find the index position of an object within an array - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

Keydown event - https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event

Using && operators - https://www.w3schools.com/js/js_comparisons.asp
