import React from "react";
import Slider from "react-slick";
import banner from "../../assets/banner.png";
import headphone from "../../assets/headphone.png";

export default function Hero() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // carousel items
  const items = [
    {
      id: 1,
      image: "https://picsum.photos/800/400",
      title: "Special Sale",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      button: "Shop Now",
    },
    {
      id: 2,
      image: "https://picsum.photos/800/400",
      title: "Special Sale",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10 flex">
        {/* First */}
        <div className="w-3/12 flex flex-col space-y-4 mr-4">
          <div className="rounded-md overflow-hidden bg-sky-300">
            <img src={headphone} alt="hero" />
          </div>
          <div className="rounded-md overflow-hidden bg-gray-300">
            <img src={headphone} alt="hero" />
          </div>
        </div>

        {/* Middle */}
        <div className="w-6/12">
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item} className="rounded-md overflow-hidden">
                <img src={banner} alt="hero" className="w-full h-full" />
              </div>
            ))}
          </Slider>
        </div>

        {/* Last */}
        <div className="w-3/12 flex flex-col space-y-4 ml-4">
          <div className="rounded-md overflow-hidden bg-blue-300">
            <img src={headphone} alt="hero" />
          </div>
          <div className="rounded-md overflow-hidden bg-red-400">
            <img src={headphone} alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
}
