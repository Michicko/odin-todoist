import colors from "./colors";

const colorDropdown = (function () {
  const options = colors.map((el) => {
    return {
      name: el.name,
      value: el.hex,
    };
  });

  let currentColor = null;

  const selectDropdownOption = (e) => {
    const option = e.target;
    const selectedValue =
      option.parentElement.parentElement.previousElementSibling;
    const selectedColor = selectedValue.querySelector(".option-color");
    const selectedName = selectedValue.querySelector(".option-name");
    const selectedCheck = selectedValue.querySelector("#selected-value");
    const value = e.target.value;

    selectedName.textContent = option.id;
    selectedColor.style.background = value;
    selectedCheck.checked = false;
    option.checked = true;
    currentColor = {
      name: option.id,
      value,
    };
  };

  const createDropdownOption = (
    { name, value },
    isSelectedValue,
    currentDropdownOption
  ) => {
    const optionClassName = isSelectedValue ? "selected-value" : "option";
    const optionFor = isSelectedValue ? "selected-value" : name;
    const optionInputType = isSelectedValue ? "checkbox" : "radio";
    const optionCheckClassName = isSelectedValue
      ? "selected-value"
      : "option-check";
    const optionCheckId = isSelectedValue ? "selected-value" : name;
    const optionCheckName = isSelectedValue
      ? "selected-value"
      : "select-option";

    const label = document.createElement("label");
    const optionColor = document.createElement("span");
    const optionName = document.createElement("p");
    const input = document.createElement("input");
    const icon = document.createElement("span");

    label.setAttribute("for", optionFor);
    label.classList += optionClassName;
    optionName.classList += "option-name";
    optionName.textContent = name;
    optionColor.style.background = value;
    optionColor.classList += "option-color";
    icon.classList += "mdi mdi-chevron-down icon big";
    input.type = optionInputType;
    input.classList += optionCheckClassName;
    input.id = optionCheckId;
    input.value = value;
    input.name = optionCheckName;

    if (!isSelectedValue) {
      input.addEventListener("click", selectDropdownOption);
      if (currentDropdownOption.name === name) {
        input.checked = true;
      }
    }

    const optionChildren = [optionColor, optionName, input, icon];

    if (!isSelectedValue) {
      optionChildren.pop();
    }

    label.append(...optionChildren);
    return label;
  };

  const getDropdownOptions = (options, currentDropdownOption) => {
    const selectOptions = document.createElement("div");
    selectOptions.classList += "select-options";

    const selectOptionsChildren = options.map((option) => {
      return createDropdownOption(option, false, currentDropdownOption);
    });

    selectOptions.append(...selectOptionsChildren);

    return selectOptions;
  };

  const getSelectedDropdownValue = (option) => {
    const selectedValue = createDropdownOption(option, true);
    return selectedValue;
  };

  const getCurrentColor = () => {
    return currentColor;
  };

  const initialOption = options[0];
  const dropdownSelectedValue = getSelectedDropdownValue(initialOption);
  const dropdownOptions = getDropdownOptions(options, initialOption);
  const dropdownElements = [dropdownSelectedValue, dropdownOptions];

  const displayOnDom = (container) => {
    container.append(...dropdownElements);
  };

  return { displayOnDom, getCurrentColor };
})();

export default colorDropdown;
