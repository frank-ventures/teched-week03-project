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

### What went well

I was able to quickly get a working implementation up and running by using simple demo code.

The images changed as needed.

With help and through lots of tinkering I got the Unsplash API up and running on the page. This meant that I could retrieve external images and update the page with them, and also let a user input text to search for and update these images.

I dug into the CSS and got the page elements styled nicely and positioned where I wanted.

I used @Media queries to make the page respond how I wanted to for varying screen sizes, and for mobile.

### Sticky points

When trying to implement the Unsplash API I went down the wrong rabbit hole! I mis-read part of the documentation and made linking my JS much harder than it needed to be.

With direction from a mentor _(Thanks Manny!)_ I was able to use the correct and much simpler link to start getting images onto my page!

I had to search for a couple of functions _(linked to below, in Resources)_, one of them being to enable the user to hit 'enter' on their keyboard to use their search term.

### Future Improvements

## Further Detail

### Resources

Using Media Queries in JavaScript - https://www.w3schools.com/howto/howto_js_media_queries.asp
Simulate mouse click when 'enter' is pressed - https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
