import React from "react";
import Slider from "react-slick";

export default function Carousel({ image_urls }) {
  // settings for the slider
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={image_urls[i]} alt="" />
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
    <div className="w-1/2 text-center">
      <Slider {...settings}>
        {image_urls &&
          image_urls.length > 0 &&
          image_urls.map((url, index) => (
            <div key={index}>
              <img src={url} className="mx-auto" alt="" />
            </div>
          ))}
      </Slider>
    </div>
  );
}
