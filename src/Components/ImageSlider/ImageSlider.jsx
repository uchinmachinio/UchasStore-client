import { useState } from "react";
import "./ImageSlider.css";
import { IKImage } from "imagekitio-react";
const imagekitUrl = "https://ik.imagekit.io/uchasstore/";

function ImageSlider({ images, page }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  function slideRight(e) {
    e.preventDefault();
    e.stopPropagation();
    if (activeImageIndex + 1 < images.length) {
      setActiveImageIndex((prev) => prev + 1);
    }
    console.log("click");
  }

  function slideLeft(e) {
    e.preventDefault();
    e.stopPropagation();
    if (activeImageIndex - 1 >= 0) {
      setActiveImageIndex((prev) => prev - 1);
    }
  }

  return (
    <div
      className={page === "orders" ? "order-image" : "product-img"}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="image-slider">
        <button className="image-slider-btn-left" onClick={slideLeft}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.25em"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
        <button className="image-slider-btn" onClick={slideRight}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.25em"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </div>

      <IKImage
        key={images[activeImageIndex]} //makes react differentiate between instances
        urlEndpoint={imagekitUrl}
        path={images[activeImageIndex]}
        loading="lazy"
        lqip={{ active: true, quality: 20 }}
      />
    </div>
  );
}

export default ImageSlider;
