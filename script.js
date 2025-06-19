const DELAY_TYPEWRITER = 50;
const INTERVAL_BANNER = 100;

function animTypewriter(el) {
  const original = el.textContent;
  el.textContent = '';
  let i = 0;
  let id;

  const delayClass = Array.from(el.classList).find(cls => /^\d+$/.test(cls));
  const delay = delayClass ? parseInt(delayClass, 10) : DELAY_TYPEWRITER;

  function showNext() {
    if (i < original.length) {
      // Add next character and append the static cursor
      el.textContent = original.slice(0, i) + '|';
      i++;
      id = setTimeout(showNext, delay);
    } else {
      // Remove cursor after finishing (optional)
      el.textContent = original;
    }
  }

  showNext();

  return () => {
    clearTimeout(id);
    el.textContent = original;
  }
}

function addHoverChange(elements, hoverTexts) {
  const original = Array.from(elements).map(el => el.textContent);
  function applyHover() {
    elements.forEach((el, i) => {
      el.textContent = hoverTexts[i] || el.textContent;
      el.classList.add('hover');  // add hover class
    });
  }

  function removeHover() {
    elements.forEach((el, i) => {
      el.textContent = original[i];
      el.classList.remove('hover');  // remove hover class
    });
  }
  elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        elements.forEach((e, i) => e.textContent = hoverTexts[i] || e.textContent);
      });
      el.addEventListener('mouseleave', () => {
        elements.forEach((e, i) => e.textContent = original[i]);
      });
      // el.addEventListener('mouseenter', applyHover);
      // el.addEventListener('mouseleave', removeHover);
  });
}

const x1e = Array.from(document.getElementsByClassName("x1"));
const x1t = [
  ".sss.",
  "#####",
  "'***'"
];

const door1e = Array.from(document.getElementsByClassName("door1"));
const door2e = Array.from(document.getElementsByClassName("door2"));
const door12e = Array.from(document.getElementsByClassName("door12"));
const door22e = Array.from(document.getElementsByClassName("door22"));
const doorOpent = [
"   __,.=-'--..__   ",
".r_______________+.",
" >=?=<   .   >=?=< ",
"  } {  .'_'.  } {  ",
"  | | :/ | \\: | |  ",
"  | | :|*| |: | |  ",
"  | | :|,'_|: | |  ",
" [`` ] ----- [`` ] "
];
const door2Opent = [
  "_",
"/ | \\",
"|*| |",
"|,'_|",
];
addHoverChange(door1e, doorOpent);
addHoverChange(door2e, doorOpent);
addHoverChange(door12e, door2Opent);
addHoverChange(door22e, door2Opent);

const teste = Array.from(document.getElementsByClassName("test"));
const testt = [
  ",*,*,*,*,",
  ",*",
  "*,",
  ",*,",
  ",",
  ",*,",
  "*",
  "*",
  "*",
  "*"
];
addHoverChange(teste, testt);

const x2e = Array.from(document.getElementsByClassName("x2"));
const x2t = [
  "22222",
  "2   2",
  "22222"
];

addHoverChange(x1e, x1t);
addHoverChange(x2e, x2t);



const xige = Array.from(document.getElementsByClassName("xig"));
const xigt = [
  ".ssssss.",
  "88P''Y.8",
  "88s  s88",
  "'******'"
];

const xmase = Array.from(document.getElementsByClassName("xmas"));
const xmast = [
  ".ssssss.",
  "8 y``-)8",
  "8 L l J8",
  "'******'"
];

const xbse = Array.from(document.getElementsByClassName("xbs"));
const xbst = [
  ".ssssss.",
  "8('?P`)8",
  "88*,.*88",
  "'******'"
];

const xxe = Array.from(document.getElementsByClassName("xx"));
const xxt = [
  ".ssssss.",
  "88,`P'88",
  "88'd,`88",
  "'******'"
];

addHoverChange(xige, xigt);
addHoverChange(xmase, xmast);
addHoverChange(xbse, xbst);
addHoverChange(xxe, xxt);


function animBanner(el) {
  const original = el.textContent;
  const lines = el.textContent
    .split('\n')
    .filter(l => l.trim().length > 0);

  const intervalClass = Array.from(el.classList).find(cls => /^\d+$/.test(cls));
  const interval = intervalClass ? parseInt(intervalClass, 10) : INTERVAL_BANNER;

  function shiftLeft(linesArray) {
    return linesArray.map(l => l.slice(1) + l[0]);
  }

  function updateBanner() {
    el.textContent = lines.join('\n');
    lines.splice(0, lines.length, ...shiftLeft(lines));
  }

  const id = setInterval(updateBanner, interval);

  return () => {
    clearInterval(id);
    el.textContent = original;
  }
}


// const allPre = document.querySelectorAll("pre");
// for (const element of allPre) {
//   reveal(element)
// }








let banners = [];
let typewriters = [];

function stopAnimations() {
  banners.forEach(stop => stop());
  typewriters.forEach(stop => stop());
}

function startAnimations() {
  banners = Array.from(document.getElementsByClassName("banner")).map(e => animBanner(e));
  typewriters = Array.from(document.getElementsByClassName("typewriter")).map(e => animTypewriter(e));
}


const toggleLink = document.getElementById('toggle-animations');
let effectsOn = true;

document.getElementById('toggle-animations').addEventListener('click', e => {
  e.preventDefault();
  effectsOn = !effectsOn;
  e.target.textContent = effectsOn ? '[X]' : '[ ]';
  effectsOn ? startAnimations() : stopAnimations();
});

startAnimations();