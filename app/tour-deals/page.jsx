"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import bannerImg from "../../public/assets/images/banner/tripBanner.png";

export default function TourDeals() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [deals, setDeals] = useState([]); // Initialize deals as an empty array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/trip-packages`);
    
        setDeals(response.data || []); // Ensure data is an array
        
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response?.data?.message || "Something went wrong",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchDeals();
  }, []);

  

  if (isLoading) {
    return <div className="loader">Loading...</div>; // Simple loader
  }
const getUniqueDeals = (deals) => {
  const seen = new Set();
  return deals.filter((deal) => {
    const slugName = deal?.subCategoryId?.slugName;
    if (slugName && !seen.has(slugName)) {
      seen.add(slugName);
      return true;
    }
    return false;
  });
};

const domesticDeals = getUniqueDeals(
 
  deals.filter((deal) => deal?.categoryId?.slugName?.toLowerCase() === "india-packages")
);

const internationalDeals = getUniqueDeals(
  deals.filter((deal) => deal.categoryId?.slugName?.toLowerCase() === "international-packages")
);
  return (
    <>
      {/* Page Title */}
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${bannerImg.src})` }}
      >
        <div className="auto-container">
          <div className="content-box">
            <h1>Tour Deals</h1>
            <p>Discover your next great adventure</p>
          </div>
        </div>
      </section>
      {/* End Page Title */}

      {/* Domestic Deals Section */}
      <section className="offer-section sec-pad before-none tour-deals-page">
        <div className="auto-container">
          <div className="sec-title centred">
            <p>Domestic Deals</p>
            <h2>Explore India</h2>
          </div>
          <div className="row clearfix">
            {domesticDeals?.map((deal, index) => (
            
              <div
                key={deal._id || index} // Use a unique key
                className="col-lg-4 col-md-6 col-sm-12 offer-block"
              >
                <div
                  className="offer-block-one wow fadeInUp animated"
                  data-wow-delay={`${index * 300}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src={`${BASE_URL}/${deal.packageImage}`} alt={deal.title} />
                    </figure>
                    <div className="content-box">
                      <span style={{ textDecoration: "line-through" }}>
                        Rs.{deal.packagePromotional}
                      </span>
                      <h3>
                        <a href={`/india-packages/${deal?.subCategoryId?.slugName}`}>
                          {deal?.subCategoryId?.name || "Unknown"}
                        </a>
                      </h3>
                      <h4>Rs.{deal.packagePrice}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Deals Section */}
      <section className="offer-section sec-pad before-none tour-deals-page">
        <div className="auto-container">
          <div className="sec-title centred">
            <p>International Deals</p>
            <h2>Explore the World</h2>
          </div>
          <div className="row clearfix">
            {internationalDeals?.map((deal, index) => (
              <div
                key={deal._id || index} // Use a unique key
                className="col-lg-4 col-md-6 col-sm-12 offer-block"
              >
                <div
                  className="offer-block-one wow fadeInUp animated"
                  data-wow-delay={`${index * 300}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src={`${BASE_URL}/${deal.packageImage}`} alt={deal.title} />
                    </figure>
                    <div className="content-box">
                      <span style={{ textDecoration: "line-through" }}>
                        Rs.{deal.packagePromotional}
                      </span>
                      <h3>
                        <a href={`/international-packages/${deal?.subCategoryId?.slugName}`}>
                          {deal?.subCategoryId?.name || "Unknown"}
                        </a>
                      </h3>
                      <h4>Rs.{deal.packagePrice}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section bg-color-1">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-9.png)" }}
        ></div>
        <div className="outer-container">
          <div className="sec-title centred">
            <p>Modern & Beautiful</p>
            <h2>Explore the World for Travel</h2>
          </div>
          <div
            className="map-inner"
            style={{ backgroundImage: "url(assets/images/shape/map-1.png)" }}
          >
            <div className="map-content clearfix">
              {deals.map((deal, index) => (
                <div key={index} className="single-location-box">
                  <figure className="map-marker">
                    <img src="assets/images/icons/marker-1.png" alt="Marker" />
                    <span>{index + 1}</span>
                  </figure>
                  <div className="address-box">
                    <h3>{deal.title}</h3>
                    <p>{deal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Map Section End */}
    </>
  );
}
