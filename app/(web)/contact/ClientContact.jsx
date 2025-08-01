"use client";

import { useState, useEffect } from "react";
import { Mail, MapPinHouse, PhoneCall } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { seoContextObj } from "../../layout";


// export const metadata = {
//   title: "Contact Us",
//   description: "Get in touch with us for any inquiries or support.",
 
//   icons: {
//     icon: "assets/images/logo/jivyuv-logo.png", // 👈 Different favicon
//   },
// };
export default function ClientContact() {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  let {companyData} = useContext(seoContextObj);
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
        error.response?.data?.message || "Failed to send your message. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
    

      <section className="page-title centred" style={{ backgroundImage: 'url(/assets/img/contact/contact-banner.webp)' }}>
        <div className="auto-container">
        </div>
      </section>

      <section className="contact-info-section bg-color-1">
        <div className="anim-icon">
          <div className="icon anim-icon-1" style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}></div>
          <div className="icon anim-icon-2" style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}></div>
        </div>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div className="single-info-box wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                <div className="inner-box">
                  <div className="icon-box">
                    <MapPinHouse />
                  </div>
                  <h3>Address</h3>
                  <p>
                    {contactInfo.address.street && (
                      <>
                        {contactInfo.address.street}, {contactInfo.address.city}, {contactInfo.address.state}, {contactInfo.address.postal_code}, {contactInfo.address.country}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div className="single-info-box wow fadeInUp animated animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                <div className="inner-box">
                  <div className="icon-box">
                    <PhoneCall />
                  </div>
                  <h3>Phone</h3>
                  <p>
                    {contactInfo.phone_number ? (
                      <a href={`tel:${contactInfo.phone_number}`}>{contactInfo.phone_number}</a>
                    ) : (
                      "Loading..."
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 info-column">
              <div className="single-info-box wow fadeInUp animated animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                <div className="inner-box">
                  <div className="icon-box">
                    <Mail />
                  </div>
                  <h3>Email</h3>
                  <p>
                    {contactInfo.email_id ? (
                      <a href={`mailto:${contactInfo.email_id}`}>{contactInfo.email_id}</a>
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
                    {Object.entries(contactInfo.social_media_links).map(([platform, link]) => (
                      <li key={platform}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          <i className={`fab fa-${platform}`}></i>
                        </a>
                      </li>
                    ))}
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
                      {errors.name && <p className="error-text" style={{ color: "red" }}>{errors.name}</p>}
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
                      {errors.email && <p className="error-text" style={{ color: "red" }}>{errors.email}</p>}
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
                      {errors.phone && <p className="error-text" style={{ color: "red" }}>{errors.phone}</p>}
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
                      {errors.subject && <p className="error-text" style={{ color: "red" }}>{errors.subject}</p>}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <textarea
                        name="message"
                        placeholder="Write Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      {errors.message && <p className="error-text" style={{ color: "red" }}>{errors.message}</p>}
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