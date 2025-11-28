document.addEventListener("DOMContentLoaded", () => {
  if (!window.UIComponents || !window.ReviewStore) return;

  const root = document.getElementById("reviews-root");
  if (!root) return;

  const actions = document.createElement("div");
  actions.className = "form-actions";

  const backButton = UIComponents.createButton({
    label: "Submit another review",
    variant: "secondary",
    onClick: () => (window.location.href = "index.html"),
  });

  const clearButton = UIComponents.createButton({
    label: "Clear all reviews",
    variant: "primary",
    onClick: () => {
      ReviewStore.clear();
      renderList();
    },
  });

  actions.append(backButton, clearButton);

  const listContainer = document.createElement("div");
  listContainer.className = "stack";

  const renderList = () => {
    const reviews = ReviewStore.getAll();
    listContainer.replaceChildren();
    if (!reviews.length) {
      listContainer.appendChild(
        UIComponents.createCard({
          title: "No reviews yet",
          body: "Submit a review on the first page to see it show up here.",
        })
      );
      return;
    }

    reviews.forEach((entry) => {
      listContainer.appendChild(
        UIComponents.createCard({
          title: entry.name,
          body: entry.review,
          footer: new Date(entry.createdAt).toLocaleString(),
        })
      );
    });
  };

  root.append(actions, listContainer);
  renderList();
});

