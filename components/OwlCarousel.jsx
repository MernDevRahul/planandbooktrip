// use client side rendering for owl carousel
"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const ThreeItemCarousel = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures client-side rendering
  }, []);

  const options = {
    margin: 10,
    responsiveClass: true,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  };

  return isClient ? (
    <OwlCarousel className="owl-theme" {...options}>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      <div className="item">Item 3</div>
      <div className="item">Item 4</div>
    </OwlCarousel>
  ) : null;
};

export default ThreeItemCarousel;
