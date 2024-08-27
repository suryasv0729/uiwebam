const tabs_container = document.querySelector(".tabs-div");
const tabs = document.querySelectorAll(".tab");
let arr = [];

// Event listener for making tabs editable on click
tabs_container.addEventListener("click", function (e) {
  if (!e.target.classList.contains("tab")) return;

  e.target.setAttribute("contenteditable", "true");
  e.target.focus();
  tabs.forEach((tab) => {
    tab.addEventListener(
      "focus",
      function () {
        const svg = this.querySelector("svg");
        if (svg) svg.style.display = "block";
      },
      true
    );

    // Handle blur to hide the SVG
    tab.addEventListener(
      "blur",
      function () {
        const svg = this.querySelector("svg");
        if (svg) svg.style.display = "none";
      },
      true
    );
  });
  // Update the array with current tab text contents
  arr = Array.from(tabs)
    .filter((tab) => tab !== e.target) // Exclude the currently edited tab
    .map((tab) => tab.textContent.trim().toLowerCase());
});

// Event listener for checking duplicates on input
tabs_container.addEventListener("input", function (e) {
  if (!e.target.classList.contains("tab")) return;

  const userInput = e.target.innerText.trim().toLowerCase();

  // Check if the user input matches any tab name in the array (excluding itself)
  if (userInput === "") {
    e.target.classList.remove("duplicate", "unique");
  } else if (arr.includes(userInput)) {
    e.target.classList.add("duplicate");
    e.target.classList.remove("unique");
  } else {
    e.target.classList.add("unique");
    e.target.classList.remove("duplicate");
  }

  // Update the array after input change
  arr = Array.from(tabs)
    .filter((tab) => tab !== e.target) // Exclude the currently edited tab
    .map((tab) => tab.textContent.trim().toLowerCase());
});
