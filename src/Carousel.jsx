import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(true);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    const nextIndex = currCardIdx + 1
    setCurrCardIdx(nextIndex);

    //Always can go left if moving forward.
    setCanGoLeft(true)

    // Can go right if next index is less than the total.
    setCanGoRight(nextIndex < total - 1);
  }

  function goBack() {
    const nextIndex = currCardIdx - 1
    setCurrCardIdx(nextIndex);

    //Can go left if next index is greater than 0.
    setCanGoLeft(nextIndex > 0)

    // Can always go right if moving backward.
    setCanGoRight(true);
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {canGoLeft ? <i
          className="bi bi-arrow-left-circle"
          onClick={goBack}
        /> : <i></i>}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {canGoRight ? <i
          className="bi bi-arrow-right-circle"
          onClick={goForward}
        /> : <i></i>}
      </div>
    </div>
  );
}

export default Carousel;
