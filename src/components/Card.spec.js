import { shallowMount } from "@vue/test-utils";
import Card from "./Card";
import { createCard } from "../models/Card";

describe("Card", () => {
  const card = createCard(
    "Title Of Card",
    "Description of the card",
    "image.png"
  );

  const wrapper = shallowMount(Card, {
    propsData: {
      card
    },
    stubs: {
      "md-card": true,
      "md-card-media": true,
      "md-card-content": true,
      "md-card-actions": true,
      "md-button": true,
      "md-card-header": true
    }
  });

  it("renders component", () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });

  it("emits onAction when handler click is called", () => {
    wrapper.vm.click();
    console.log(wrapper.html());
    expect(wrapper.emitted().onAction).toBeTruthy();
  });

  it("has title, description and image of the card placed", () => {
    // How it would look visually is less important,
    // but we need to check that information is presented
    const titleIndex = wrapper
      .find("md-card-header-stub")
      .text()
      .indexOf(card.title);
    expect(titleIndex).toBeGreaterThanOrEqual(0);

    const descriptionIndex = wrapper.text().indexOf(card.description);
    expect(descriptionIndex).toBeGreaterThanOrEqual(0);

    const img = wrapper.find("img").element;
    expect(img.getAttribute("src")).toBe(card.img);
    expect(img.getAttribute("title")).toBe(card.title);
  });
});
