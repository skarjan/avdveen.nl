"use strict";

function trace(msg) {
  let traceOn = true;

  if (traceOn) {
    return console.log(msg);
  }
}


function docReady(fn) {

  if (document.readyState === "complete" || document.readyState === "interactive") {

    return setTimeout(fn, 1);

  } else {

    return document.addEventListener("DOMContentLoaded", fn);

  }

}

function isLinkExternal(anchor) {
  return anchor.children[0].hasAttribute("target");
}


function addMenuEventListeners() {

  // event listeners to show/hide the menu on small screen
  // show/hide when clicking the hamburger icon
  document.getElementById("menu-hb").addEventListener("click", toggleMenu);

  // hide when clicking (almost) anywhere on the page
  document.getElementsByClassName("content")[0].addEventListener("click", toggleMenu);

  // event listeners to display active/inactive links
  addClickListeners("anchor", "border", "active-link", "active-border", "hov-link", "hov-border");
  addClickListeners("lang-anchor", "lang-border", "active-lang", "active-lang-border", "lang-link", "lang-border");
}



function addClickListeners(link, border, activeAnchor, activeBorder, anchor, regularBorder){

  let links = document.getElementsByClassName(link);
  let borders = document.getElementsByClassName(border);

  for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function () {
      let self = this;
      if (!isLinkExternal(self)) {
        deactivateLink(activeAnchor, activeBorder, anchor, regularBorder);
        activateLink(links, borders, i, activeAnchor, activeBorder, anchor, regularBorder);

      }
    });
  }
}



function deactivateLink (activeAnchor, activeBorder, anchor, border) {
  // needs the active language lin
  let elLink = document.getElementsByClassName(activeAnchor);
  let elBorder = document.getElementsByClassName(activeBorder);
  // needs the inactive language link
  elLink[0].classList.add(anchor);
  elLink[0].classList.remove(activeAnchor);

  elBorder[0].classList.add(border);
  elBorder[0].classList.remove(activeBorder);
  
}


function activateLink(links, borders, i, activeAnchor, activeBorder, anchor, border) {

  links[i].classList.add(activeAnchor);
  links[i].classList.remove(anchor);

  borders[i].classList.add(activeBorder);
  borders[i].classList.remove(border);

}


function toggleMenu() {
  let self = this;

  // show/hide on hb menu icon click
  let linkContainer = document.getElementById("linkContainer");

  if (linkContainer.classList[0] !== 'responsive-links' && self.classList[0] == "menu-hb") {

    // show
    linkContainer.classList.add('responsive-links');
    linkContainer.classList.add('show');
    linkContainer.classList.remove('hide');

    // animate
    // begin state
    document.getElementsByClassName("responsive-links")[0].style.opacity = "0";

    // end state
    setTimeout(function () {
      document.getElementsByClassName("responsive-links")[0].style.top = "106px";
      document.getElementsByClassName("responsive-links")[0].style.opacity = "100";
    }, 1);

  } else if (linkContainer.classList[0] == 'responsive-links' && self.classList[0] === "menu-hb") {

    // animate
    document.getElementsByClassName("responsive-links")[0].style.top = "75px";
    document.getElementsByClassName("responsive-links")[0].style.opacity = "0";

    // hide
    setTimeout(function () {
      linkContainer.classList.remove('responsive-links');
      linkContainer.classList.remove('show');
      linkContainer.classList.add('hide');
    }, 400);
  }

  // hide menu if user clicks on the body
  if (linkContainer.classList[0] == 'responsive-links' && self.classList[0] == "content") {

    // animate
    document.getElementsByClassName("responsive-links")[0].style.opacity = "0";

    document.getElementsByClassName("responsive-links")[0].style.top = "75px";
    // document.getElementsByClassName("responsive-links")[0].style.opacity = "0";

    // hide
    setTimeout(function () {
      linkContainer.classList.remove('responsive-links');
      linkContainer.classList.remove('show');
      linkContainer.classList.add('hide');
    }, 400);

  }

}

// Work around for opacity issue
function is1080Wide() {

  var mQ = window.matchMedia("(min-width: 1080px)");

  mQ.addEventListener("change", setOpacityOnLinks);
}

function setOpacityOnLinks(mediaQuery) {

  if (mediaQuery.matches) {

    document.getElementById("linkContainer").style.opacity = 1;

  }
}

function isScreenSize(){
 let is768 = window.matchMedia("(min-width: 768px)");

 is768.addEventListener("change", returnEvent);

}

function returnEvent (e) {
  return trace(e);
}