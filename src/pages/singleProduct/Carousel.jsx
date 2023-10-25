import React from "react";
import { BsImageAlt } from "react-icons/bs";
import Slider from "react-slick";

export default function Carousel({ images }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // settings for the slider
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} alt="" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: "w-auto",
  };

  return (
    <div className="lg:w-1/2 md:w-2/3 w-full text-center">
      <Slider {...settings}>
        {images &&
          images.length > 0 &&
          images.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                className="mx-auto"
                alt=""
                style={{ display: imageLoaded ? "block" : "none" }}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="flex items-center justify-center h-96 mb-8 bg-gray-300 rounded dark:bg-gray-700">
                  <BsImageAlt size={50} className="text-gray-200" />
                </div>
              )}
            </div>
          ))}
      </Slider>
    </div>
  );
}
