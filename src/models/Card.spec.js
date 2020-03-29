import { createCard } from "./Card";

test("Card Model", () => {
  const title = "title";
  const description = "description";
  const image = "image";

  const card = createCard(title, description, image);

  expect(card.title).toBe(title);
  expect(card.description).toBe(description);
  expect(card.img).toBe(image);
});
