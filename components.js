/**
 * Minimal UI components factory for the portal.
 * Provides Button, TextInput, and Card components that can be reused.
 */
(function () {
  const createButton = ({
    label,
    variant = "primary",
    type = "button",
    onClick,
    fullWidth = false,
    ariaLabel,
  }) => {
    const button = document.createElement("button");
    button.className = `component-btn component-btn--${variant}${
      fullWidth ? " component-btn--full" : ""
    }`;
    button.type = type;
    button.textContent = label;
    if (ariaLabel) {
      button.setAttribute("aria-label", ariaLabel);
    }
    if (typeof onClick === "function") {
      button.addEventListener("click", onClick);
    }
    return button;
  };

  const createTextInput = ({
    id,
    label,
    name,
    placeholder = "",
    type = "text",
    required = false,
  }) => {
    const fieldWrapper = document.createElement("label");
    fieldWrapper.className = "component-field";
    if (id) {
      fieldWrapper.setAttribute("for", id);
    }

    const labelEl = document.createElement("span");
    labelEl.className = "component-field__label";
    labelEl.textContent = label;

    const input = document.createElement("input");
    input.className = "component-input";
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    if (id) {
      input.id = id;
    }
    if (required) {
      input.required = true;
    }

    fieldWrapper.appendChild(labelEl);
    fieldWrapper.appendChild(input);

    return { element: fieldWrapper, input };
  };

  const createCard = ({ title, body, footer }) => {
    const card = document.createElement("article");
    card.className = "component-card";

    if (title) {
      const heading = document.createElement("h3");
      heading.className = "component-card__title";
      heading.textContent = title;
      card.appendChild(heading);
    }

    if (body) {
      const bodyEl = document.createElement("p");
      bodyEl.className = "component-card__body";
      bodyEl.textContent = body;
      card.appendChild(bodyEl);
    }

    if (footer) {
      const footerEl = document.createElement("div");
      footerEl.className = "component-card__footer";
      footerEl.textContent = footer;
      card.appendChild(footerEl);
    }

    return card;
  };

  window.UIComponents = {
    createButton,
    createTextInput,
    createCard,
  };
})();

