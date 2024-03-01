import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke Test
it('it renders without crashing', () => {
  render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
      />);
});

// Snapshot Test
it("matches snapshot", () => {
  const {asFragment} = render(<Carousel
                                photos={TEST_IMAGES}
                                title="images for testing"
                                />);
  expect(asFragment()).toMatchSnapshot();
});

// Right Arrow Works
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// Left Arrow Works
it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

   // expect the second image to show, but not the first
   expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});


// Right arrow disappears when at the last index.
it("removes the right arrow when there are no more pictures", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel twice
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow to disappear and the left arrow to still be there
  expect(
    container.querySelector('i[class="bi bi-arrow-right-circle"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-left-circle"]')
  ).toBeInTheDocument();
});

// Left arrow disappears when at the first index.
it("removes the left arrow when there are no more pictures", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the left arrow to disappear and the right arrow to still be there
  expect(
    container.querySelector('i[class="bi bi-arrow-left-circle"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-right-circle"]')
  ).toBeInTheDocument();
});