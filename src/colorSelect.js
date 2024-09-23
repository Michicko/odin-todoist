{
  /* <div id="select-box">
    <input type="checkbox" id="options-view-button">
    <div id="select-button" class="brd">
      <div id="selected-value">
        <span>Select a platform</span>
      </div>
      <div id="chevrons">
        <i class="fas fa-chevron-up"></i>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <div id="options">
      <div class="option">
        <input class="s-c top" type="radio" name="platform" value="codepen">
        <input class="s-c bottom" type="radio" name="platform" value="codepen">
        <i class="fab fa-codepen"></i>
        <span class="label">CodePen</span>
        <span class="opt-val">CodePen</span>
      </div>
      <div class="option">
        <input class="s-c top" type="radio" name="platform" value="dribbble">
        <input class="s-c bottom" type="radio" name="platform" value="dribbble">
        <i class="fab fa-dribbble"></i>
        <span class="label">Dribbble</span>
        <span class="opt-val">Dribbble</span>
      </div>
      <div class="option">
        <input class="s-c top" type="radio" name="platform" value="behance">
        <input class="s-c bottom" type="radio" name="platform" value="behance">
        <i class="fab fa-behance"></i>
        <span class="label">Behance</span>
        <span class="opt-val">Behance</span>
      </div>
      <div class="option">
        <input class="s-c top" type="radio" name="platform" value="hackerrank">
        <input class="s-c bottom" type="radio" name="platform" value="hackerrank">
        <i class="fab fa-hackerrank"></i>
        <span class="label">HackerRank</span>
        <span class="opt-val">HackerRank</span>
      </div>
      <div class="option">
        <input class="s-c top" type="radio" name="platform" value="stackoverflow">
        <input class="s-c bottom" type="radio" name="platform" value="stackoverflow">
        <i class="fab fa-stack-overflow"></i>
        <span class="label">StackOverflow</span>
        <span class="opt-val">StackOverflow</span>
      </div>
      <div class="option">
        <input class="s-c top" type="radio" name="platform" value="freecodecamp">
        <input class="s-c bottom" type="radio" name="platform" value="freecodecamp">
        <i class="fab fa-free-code-camp"></i>
        <span class="label">FreeCodeCamp</span>
        <span class="opt-val">FreeCodeCamp</span>
      </div>
      <div id="option-bg"></div>
    </div>
  </div> */
}

const createSelectOption = (optionObj) => {
  const option = document.createElement("div");
  option.classList += "option";
  const span = document.createElement("span");
  const p = document.createElement("p");
  span.classList += "option-icon";
  p.textContent = optionObj.name;
  span.style.background = optionObj.color;
  option.append(span, p);

  return option;
};

export const colorSelect = (options) => {
  const select = document.createElement("div");
  const selectedValue = document.createElement("div");
  const optionsBox = document.createElement("div");
  optionsBox.classList += "options";
  selectedValue.classList += "selected-value";
  const span = document.createElement("span");
  const iconSpan = document.createElement('span');
  iconSpan.classList += "mdi mdi-chevron-down icon big";
  const p = document.createElement("p");
  p.textContent = options[0].name;
  span.style.background = options[0].color;
  selectedValue.append(span, p, iconSpan);
  select.classList += "select-box";
  const elOptions = options.map((el) => {
    return createSelectOption(el);
  });

  optionsBox.append(...elOptions);
  select.append(selectedValue, optionsBox);

  return select;
};
