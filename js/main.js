function trace(msg) {
  let traceOn = true;

  if (traceOn) {
    return console.log(msg)
  };
}


function docReady(fn) {

  if (document.readyState === "complete" || document.readyState === "interactive") {

    return setTimeout(fn, 1);

  } else {

    return document.addEventListener("DOMContentLoaded", fn);

  }

}


function deactivateLanguageLink(links, borders, i) {

  elLink = document.getElementsByClassName("active-lang");
  elBorder = document.getElementsByClassName("active-lang-border");

  elLink[0].classList.add("lang-link");
  elLink[0].classList.remove("active-lang");

  elBorder[0].classList.add("lang-border");
  elBorder[0].classList.remove("active-lang-border");



}

function deactivateLink() {

  elLink = document.getElementsByClassName("active-link");
  elBorder = document.getElementsByClassName("active-border");

  elLink[0].classList.add("hov-link");
  elLink[0].classList.remove("active-link");

  elBorder[0].classList.add("hov-border");
  elBorder[0].classList.remove("active-border");

}


function activateLink(links, borders, i) {

  links[i].classList.add("active-link");
  links[i].classList.remove("hov-link");

  borders[i].classList.add("active-border");
  borders[i].classList.remove("hov-border");

}

function activateLanguageLink(links, borders, i) {

  links[i].classList.add("active-lang");
  links[i].classList.remove("lang-link");

  borders[i].classList.add("active-lang-border");
  borders[i].classList.remove("lang-border");

}

function isLinkExternal(anchor) {
  return anchor.children[0].hasAttribute("target");
}


function addMenuEventListeners() {

  // event listeners to show/hide the menu on small screens
  document.getElementById("menu-hb").addEventListener("click", toggleMenu);
  document.getElementsByClassName("content")[0].addEventListener("click", toggleMenu);

  // event listeners to display active/inactive links
  addMenuClickListeners();
}


function addMenuClickListeners() {

  let links = document.getElementsByClassName("anchor");
  let borders = document.getElementsByClassName("border");

  for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function () {

      if (!isLinkExternal(this)) {
        deactivateLink();
        activateLink(links, borders, i);

      }
    })
  }
}

function addLanguageClickListeners() {

  let links = document.getElementsByClassName("js-anchor");
  let borders = document.getElementsByClassName("js-border");
  for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function () {

      if (!isLinkExternal(this)) {
        deactivateLanguageLink(links, borders, i);
        activateLanguageLink(links, borders, i);

      }
    })
  }
}


function toggleMenu() {

  // show/hide on hb menu icon click
  let linkContainer = document.getElementById("linkContainer");
  if (linkContainer.classList[0] !== 'responsive-links' && this.classList[0] == "menu-hb") {

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

  } else if (linkContainer.classList[0] == 'responsive-links' && this.classList[0] === "menu-hb") {

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
  if (linkContainer.classList[0] == 'responsive-links' && this.classList[0] == "content") {

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
// Work around for opacity issues
function is1080Wide(mediaQuery) {
  if (mediaQuery.matches) {
    document.getElementById("linkContainer").style.opacity = 1;
  }
  trace(document.getElementById("linkContainer").style.opacity);
}

var mQ = window.matchMedia("(min-width: 1080px)")

mQ.addEventListener("change", is1080Wide); // Attach listener function on state changes


