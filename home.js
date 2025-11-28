document.addEventListener("DOMContentLoaded", () => {
  if (!window.UIComponents || !window.ReviewStore) return;

  const root = document.getElementById("home-root");
  if (!root) return;

  const heroCard = UIComponents.createCard({
    title: "Reusable components demo",
    body: "Both pages use the same Button, Text Input, and Card building blocks from a tiny utility library.",
    footer: "Fields: name + review (text inputs only)",
  });

  const formCard = UIComponents.createCard({
    title: "Share your review",
    body: "Enter your name and short review, then save using the shared button component.",
  });

  const form = document.createElement("form");
  const nameField = UIComponents.createTextInput({
    id: "name",
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    required: true,
  });

  const reviewField = UIComponents.createTextInput({
    id: "review",
    label: "Review",
    name: "review",
    placeholder: "Write a brief review",
    required: true,
  });

  const saveButton = UIComponents.createButton({
    label: "Save review",
    type: "submit",
    variant: "primary",
  });

  const viewButton = UIComponents.createButton({
    label: "View reviews",
    variant: "secondary",
    onClick: () => (window.location.href = "reviews.html"),
  });

  const actions = document.createElement("div");
  actions.className = "form-actions";
  actions.append(saveButton, viewButton);

  const feedback = document.createElement("div");
  feedback.className = "feedback-text";

  const latestContainer = document.createElement("div");

  form.append(nameField.element, reviewField.element, actions);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameField.input.value.trim();
    const review = reviewField.input.value.trim();
    if (!name || !review) {
      feedback.textContent = "Both fields are required.";
      feedback.style.color = "#dc2626";
      return;
    }

    const entry = ReviewStore.add(name, review);
    feedback.textContent = "Review saved locally. View it on the reviews page.";
    feedback.style.color = "#16a34a";
    nameField.input.value = "";
    reviewField.input.value = "";
    latestContainer.replaceChildren(
      UIComponents.createCard({
        title: entry.name,
        body: entry.review,
        footer: new Date(entry.createdAt).toLocaleString(),
      })
    );
  });

  formCard.append(form, feedback, latestContainer);

  root.append(heroCard, formCard);
});

