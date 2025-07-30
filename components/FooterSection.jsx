"use client";
import { SquareX, MessageSquareMore, Youtube } from "lucide-react"; // Import the message icon
import {useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPinCheckInside,
  PhoneCall,
  Twitter,
} from "lucide-react";
import "./Ctaform.css";
import {seoContextObj} from "../app/layout";
export default function Footer() {
  let { companyData,categories } = useContext(seoContextObj);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${SERVER_URL}/api/queries`, formData);
      Swal.fire({
        title: "Success",
        text: "Your query has been submitted successfully!",
        icon: "success",
      });
      setShowPopup(false); // Hide the popup on success
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to submit your query. Please try again later.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="main-footer bg-color-2">
        <div className="footer-top">
          <div
            className="vector-bg"
            style={{
              backgroundImage: "url(/assets/images/shape/shape-11.png)",
            }}
          ></div>
          <div className="auto-container">
            <div className="row clearfix">
              {/* Logo and Description */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget logo-widget">
                  <figure className="footer-logo">
                    <Link href="/">
                      <Image
                        src={
                          companyData?.logo_image
                            ? `${SERVER_URL}/${companyData.logo_image}`
                            : ""
                        }
                        width={100}
                        height={30}
                        alt="Company Logo"
                      />
                    </Link>
                  </figure>
                  <div className="text">
                    <p>
                      {companyData?.company_description ||
                        "Your trusted travel partner."}
                    </p>
                  </div>
                  <ul className="social-links clearfix">
                    <li>
                      <Link
                        href={companyData?.social_media_links?.facebook || "#"}
                        target="_blank"
                      >
                        <Facebook />
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        href={companyData?.social_media_links?.twitter || "#"}
                        target="_blank"
                      >
                        <Twitter />
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        href={companyData?.social_media_links?.instagram || "#"}
                        target="_blank"
                      >
                        <Instagram />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={companyData?.social_media_links?.linkedin || "#"}
                        target="_blank"
                      >
                        <Linkedin />
                      </Link>
                    </li>

                    <li>
                      <Link
                        href={companyData?.social_media_links?.youtube || "#"}
                        target="_blank"
                      >
                        <Youtube />
                      </Link>
                    </li>


                  </ul>
                </div>
              </div>

              {/* Services */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h3>Services</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      {/* <li>
                        <Link href="/listing">Listing</Link>
                      </li> */}
{categories &&categories.map((category, index) => (
  <li key={`footer-category-${index}`}>
    <Link href={`/${category.slugName}`}>
      {category.name}
    </Link>
  </li>
))}

                      <li>
                        <Link href="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link href="/blogs">Our Blog</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget gallery-widget">
                  <div className="widget-title">
                    <h3>Gallery</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="image-list clearfix">
                      {companyData?.footer_sub_images?.map((image, index) => (
                        <li key={`footer-gallery-${index}`}>
                          <figure className="image-box">
                          
                              <Image
                                src={`${SERVER_URL}/${image}`}
                                alt={`Gallery Image ${index + 1}`}
                                width={90}
                                height={90}
                              />
                            
                          </figure>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget contact-widget">
                  <div className="widget-title">
                    <h3>Contacts</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="info-list clearfix">
                      <li>
                        <MapPinCheckInside />{" "}
                        {companyData?.address
                          ? `${companyData.address.street}, ${companyData.address.city}, ${companyData.address.state}, ${companyData.address.postal_code}, ${companyData.address.country}`
                          : "Address not available"}
                      </li>
                      <li>
                        <PhoneCall />&nbsp;&nbsp;
                        <Link
                          href={`tel:${companyData?.phone_number || "#"}`}
                        >
                          {companyData?.phone_number || "Phone not available"}
                        </Link>
                      </li>
                      <li>
                        <Mail />
                        <Link
                          href={`mailto:${companyData?.email_id || "#"}`}
                        >&nbsp;&nbsp;
                          {companyData?.email_id || "Email not available"}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popup CTA Form */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            bottom: "55px",
            right: "35px",
            width: "7%",
            height: "4%",
            zIndex: "1000",
          }}
        >
        <div className="btn-social">
        <button className="pop-icon" onClick={togglePopup} >
            <MessageSquareMore color="blue" size={50} /> {/* Corrected icon usage */}
          </button>
          <button
           className="whatsapp-icon"
           onClick={() => window.open("https://wa.me/8368088945", "_blank")}
         >
           <img src="/assets/images/cta/whatsapp.jpeg" alt="whatsapp" style={{borderRadius:"100%"}}/>
         </button>
         {/* Phone Button */}
         <button
           className="phone-icon"
           onClick={() => (window.location.href = "tel:8368088945")}
         >
           {/* <i className="fas fa-phone-alt"></i> */}
           <img src="/assets/images/cta/telephone.jpeg" alt="telephone" style={{borderRadius:"100%"}} />
         </button>

        </div>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <div className="popup-left">
                  <img
                    src="/assets/images/cta/ctaimage.avif"
                    alt="Description"
                  />
                </div>
                <div className="popup-right">
                  <form onSubmit={handleSubmit}>
                    <h2 style={{ fontWeight: "800" }}>
                      Please fill the required fields. We will get back to you
                      shortly.
                    </h2>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                    <label>
                      Message:
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </label>
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
              <button className="close-popup" onClick={togglePopup}>
                <SquareX />
              </button>
            </div>
          )}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="bottom-inner clearfix">
              <div className="copyright pull-left">
                <p>
                  <Link href="/">JivYuv</Link> &copy; 2025 All Rights Reserved
                </p>
              </div>
              <ul className="footer-nav pull-right">
                <li>
                  <Link href="/terms-and-conditions">Terms of Services</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
