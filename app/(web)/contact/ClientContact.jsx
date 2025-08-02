"use client";

import { useState, useEffect } from "react";
import { Mail, MapPinHouse, PhoneCall } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { seoContextObj } from "../../layout";
import Link from "next/link";

// export const metadata = {
//   title: "Contact Us",
//   description: "Get in touch with us for any inquiries or support.",

//   icons: {
//     icon: "assets/images/logo/jivyuv-logo.png", // 👈 Different favicon
//   },
// };
export default function ClientContact() {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  let { companyData } = useContext(seoContextObj);
  const [contactInfo, setContactInfo] = useState({
    address: {},
    email_id: "",
    phone_number: "",
    social_media_links: {},
    company_description: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = companyData;
        setContactInfo(response);
      } catch (error) {
        console.error("Error fetching contact info:", error);
        Swal.fire("Error", "Failed to load contact information.", "error");
      }
    }
    fetchContactInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire("Error", "Please fix the errors in the form.", "error");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/api/queries`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Swal.fire("Success", "Your message has been sent!", "success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // console.error("Error submitting contact form:", error.response || error.message);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Failed to send your message. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
      <section
        className="page-title centred"
        style={{
          backgroundImage: "url(/assets/img/contact/contact-banner.webp)",
        }}
      >
        <div className="auto-container"></div>
      </section>

      <section className="contact-info-section bg-color-1">
        <div className="anim-icon">
          <div
            className="icon anim-icon-1"
            style={{ backgroundImage: "url(assets/images/shape/shape-3.png)" }}
          ></div>
          <div
            className="icon anim-icon-2"
            style={{ backgroundImage: "url(assets/images/shape/shape-3.png)" }}
          ></div>
        </div>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div
                className="single-info-box wow fadeInUp animated animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="icon-box">
                    <MapPinHouse />
                  </div>
                  <h3>Address</h3>
                  <p>
                    {contactInfo?.address?.street && (
                      <Link 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${contactInfo?.address.street}, ${contactInfo?.address.city}, ${contactInfo?.address.state}, ${contactInfo?.address.postal_code}, ${contactInfo?.address.country}`
                      )}`}
                      target="_blank"
                      >
                      <>
                        {contactInfo.address.street}, {contactInfo.address.city}
                        , {contactInfo.address.state},{" "}
                        {contactInfo.address.postal_code},{" "}
                        {contactInfo.address.country}
                      </>
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div
                className="single-info-box wow fadeInUp animated animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="icon-box">
                    <PhoneCall />
                  </div>
                  <h3>Phone</h3>
                  <p>
                    {contactInfo.phone_number ? (
                      <a href={`tel:${contactInfo.phone_number}`}>
                        {contactInfo.phone_number}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div
                className="single-info-box wow fadeInUp animated animated"
                data-wow-delay="600ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="icon-box">
                    <Mail />
                  </div>
                  <h3>Email</h3>
                  <p>
                    {contactInfo.email_id ? (
                      <a href={`mailto:${contactInfo.email_id}`}>
                        {contactInfo.email_id}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-5 col-md-12 col-sm-12 content-column">
              <div className="content_block_5">
                <div className="content-box">
                  <div className="sec-title">
                    <p>Get in touch</p>
                    <h2>Feel Free to Contact with us</h2>
                  </div>
                  <div className="text">
                    <p>{contactInfo.company_description || "Loading..."}</p>
                  </div>
                  <ul className="social-links clearfix">
                    {/* {Object.entries(contactInfo.social_media_links).map(([platform, link]) => (
                      <li key={platform}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <i className={`fab fa-${platform}`}></i>
                        </a>
                      </li>
                    ))} */}
                    <li key="instagram">
                      <a
                        href="https://www.instagram.com/planandbooktrip/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-instagram"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                        </svg>
                      </a>
                    </li>
                    <li key="youtube">
                      <a
                        href="https://www.youtube.com/@PlanandBookTrip"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-youtube"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                        </svg>
                      </a>
                    </li>
                    <li key="facebook">
                      <a
                        href="https://www.facebook.com/profile.php?id=61573902808542"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="white"
                          class="bi bi-facebook"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 form-column">
              <div className="form-inner">
                <form onSubmit={handleSubmit} className="default-form">
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.name && (
                        <p className="error-text" style={{ color: "red" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && (
                        <p className="error-text" style={{ color: "red" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.phone && (
                        <p className="error-text" style={{ color: "red" }}>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.subject && (
                        <p className="error-text" style={{ color: "red" }}>
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <textarea
                        name="message"
                        placeholder="Write Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      {errors.message && (
                        <p className="error-text" style={{ color: "red" }}>
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                      <button className="theme-btn" type="submit">
                        Submit Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
