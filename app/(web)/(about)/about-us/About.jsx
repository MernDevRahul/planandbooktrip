"use client";

import { useState, useEffect } from "react";
import AboutSection from "../../../../components/AboutSection";
import VideoSection from "../../../../components/VideoSection";
import axios from "axios";
import Swal from "sweetalert2";
import {useContext} from 'react';
import { seoContextObj } from "../../../layout";
import {Youtube,Instagram,Linkedin,Facebook} from "lucide-react"

export default function About() {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  let {companyData}=useContext(seoContextObj);
  
  const [contactInfo, setContactInfo] = useState({
    address: {},
    email_id: "",
    phone_number: "",
    social_media_links: {},
    company_description: "",
  });

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response =companyData
        setContactInfo(response);
      } catch (error) {
        // console.error("Error fetching contact info:", error);
        Swal.fire("Error", "Failed to load contact information.", "error");
      }
    }
    fetchContactInfo();
  }, []);

  return (
    <>
      <section className="page-title centred" style={{ backgroundImage: 'url(/assets/images/banner/tt.avif)' }}>
        <div className="auto-container">
          <div className="content-box">
            <h1>About Us</h1>
            <p>Discover your next great adventure</p>
          </div>
        </div>
      </section>

  

      <AboutSection contactInfo={contactInfo} />

      <VideoSection />
      <section className="team-section sec-pad bg-color-1 centred">
  <div className="auto-container">
    <div className="sec-title">
      <p>Tour Guide</p>
      <h2>Expert Tour Guides</h2>
    </div>
    <div className="row clearfix">
      {/* Example static data for guides */}
      <div className="col-lg-4 col-md-6 col-sm-12 team-block">
        <div className="team-block-one">
          <div className="inner-box">
            <figure className="image-box">
              <img src="/assets/img/destination-details/destination-1.jpg" alt="Guide 1" />
            </figure>
            <div className="lower-content">
              <h3>Skilled Guides for Memorable Trips</h3>
              <span className="designation">Tour Guide</span>
              <ul style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 0,
                listStyle: "none",
                margin: "auto",
                width: "70%",
                opacity: 0, /* Initially hidden */
                visibility: "hidden", /* Hide the icons */
                transition: "opacity 0.3s ease, visibility 0s 0.3s", /* Smooth transition */
              }}>
                <li><Youtube /></li>
                <li><Instagram /></li>
                <li><Linkedin /></li>
                <li><Facebook /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Repeat for other guides */}
      <div className="col-lg-4 col-md-6 col-sm-12 team-block">
        <div className="team-block-one">
          <div className="inner-box">
            <figure className="image-box">
              <img src="/assets/img/destination-details/destination-2.jpg" alt="Guide 1" />
            </figure>
            <div className="lower-content">
              <h3>Local Experts With Global Knowledge</h3>
              <span className="designation">Tour Guide</span>
              <ul style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 0,
                listStyle: "none",
                margin: "auto",
                width: "70%",
                opacity: 0, /* Initially hidden */
                visibility: "hidden", /* Hide the icons */
                transition: "opacity 0.3s ease, visibility 0s 0.3s", /* Smooth transition */
              }}>
                <li><Youtube /></li>
                <li><Instagram /></li>
                <li><Linkedin /></li>
                <li><Facebook /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Next one */}
      <div className="col-lg-4 col-md-6 col-sm-12 team-block">
        <div className="team-block-one">
          <div className="inner-box">
            <figure className="image-box">
              <img src="/assets/img/destination-details/destination-3.jpg" alt="Guide 1" />
            </figure>
            <div className="lower-content">
              <h3>Local Experts With Global Knowledge</h3>
              <span className="designation">Tour Guide</span>
              <ul style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 0,
                listStyle: "none",
                margin: "auto",
                width: "70%",
                opacity: 0, /* Initially hidden */
                visibility: "hidden", /* Hide the icons */
                transition: "opacity 0.3s ease, visibility 0s 0.3s", /* Smooth transition */
              }}>
                <li><Youtube /></li>
                <li><Instagram /></li>
                <li><Linkedin /></li>
                <li><Facebook /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
}