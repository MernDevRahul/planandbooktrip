"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TourDetails({ params }) {
  let slug = params.slug;
  const [isLoading, setIsLoading] = useState(false);

  const [packageData, setPackageData] = useState();
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [bookingTourData, setBookingTourData] = useState({
    name: "",
    email: "",
    phone: "",
    totalMembers: "",
    tourDate: "",
    message: "",
    tourName: "",
  });
  const [errors, setErrors] = useState({});

  function handleOnChange(event) {
    setBookingTourData({
      ...bookingTourData,
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: "" });
  }

  async function fetchPackageData() {
    setIsLoading(true);
    try {
      let response = await axios.get(
        `${SERVER_URL}/api/trip-packages/slug/${slug}`
      );

      setPackageData(response.data);
      setBookingTourData({
        ...bookingTourData,
        tourName: response.data?.titleSlug,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchPackageData();
  }, [slug]);
  async function sendToServer(payload) {
    try {
      setIsLoading(true);

      const [tourQueryResponse, googleScriptResponse] = await axios.all([
        axios.post(`${SERVER_URL}/api/tour-queries`, payload),
        axios.post(
          "https://script.google.com/macros/s/AKfycbygYxZy0xD2heYWF9Bxowgnz8Dk1FzV1Xbo6OW-bPzS7lVQc_EBCHCsCpDUxWt7RPl4EA/exec",
          JSON.stringify(payload)
        ),
      ]);

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: "Your tour booking request has been successfully submitted. We will contact you soon!",
        confirmButtonText: "OK",
      });

      setBookingTourData({
        name: "",
        email: "",
        phone: "",
        totalMembers: "",
        tourDate: "",
        message: "",
        tourName: packageData?.titleSlug,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong.",
        text: "We are currently unable to process your request. Please try again later.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  }
  function validateForm() {
    let newErrors = {};
    if (!bookingTourData.name.trim()) newErrors.name = "Name is required";
    if (!bookingTourData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingTourData.email))
      newErrors.email = "Enter a valid email";
    if (!bookingTourData.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(bookingTourData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!bookingTourData.totalMembers.trim())
      newErrors.totalMembers = "Total members are required";
    else if (
      isNaN(bookingTourData.totalMembers) ||
      bookingTourData.totalMembers <= 0
    )
      newErrors.totalMembers = "Enter a valid number";
    if (!bookingTourData.tourDate.trim())
      newErrors.tourDate = "Tour date is required";
    if (!bookingTourData.message.trim())
      newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      sendToServer(bookingTourData);
    }
  }

  return (
    <div className="tour-details-page">
      {/* Page Title */}
      <section
        className="page-title style-three"
        style={{
          backgroundImage: `url(${SERVER_URL}/${packageData?.packageImage})`,
        }}
      >
        <div className="auto-container">
          <div className="inner-box">
            <div className="rating">
              <span>
                <i className="fas fa-star"></i>8.0 Superb
              </span>
            </div>
            <h2>{packageData?.title}</h2>
            <h3>
              {packageData?.packagePrice}
              <span> / Per person</span>
            </h3>
          </div>
        </div>
      </section>

      {/* Tour Details */}
      <section className="tour-details">
        <div className="auto-container">
          <div className="row clearfix">
            {/* Content Side */}
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="tour-details-content">
                <div className="inner-box">
                  <div className="text">
                    <ul className="info-list clearfix">
                      <li>
                        <span style={{ fontWeight: "bolder" }}>
                          Pickup & Drop
                        </span>
                        <br />
                        {/* <i className="far fa-clock">{packageData?.isPickupAndDropAvailable==true?<span style={{fontWeight:"bold"}}>{packageData?.pickupLocation}-{packageData?.dropLocation}</span>:"Available"}</i> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-clock"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>{" "}
                        {packageData?.isPickupAndDropAvailable == true ? (
                          <span style={{ fontWeight: "bold" }}>
                            {packageData?.pickupLocation}-
                            {packageData?.dropLocation}
                          </span>
                        ) : (
                          "Available"
                        )}
                      </li>
                      <li>
                        <span style={{ fontWeight: "bolder" }}>Duration</span>
                        <br />
                        {/* <i className="far fa-user">
                          <span style={{ fontWeight: "bold" }}>
                            {packageData?.numberOfDays === "" &&
                            packageData?.numberOfNights === ""
                              ? " Ask Expert"
                              : `${packageData?.numberOfNights}N - ${packageData?.numberOfDays}D`}
                          </span>
                        </i> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <span style={{ fontWeight: "bold" }}>
                          {packageData?.numberOfDays === "" &&
                          packageData?.numberOfNights === ""
                            ? " Ask Expert"
                            : `${packageData?.numberOfNights}N - ${packageData?.numberOfDays}D`}
                        </span>
                      </li>
                      <li>
                        <span style={{ fontWeight: "bolder" }}>Country</span>
                        <br />
                        {/* <i className="far fa-map">
                          <span style={{ fontWeight: "bold" }}>
                            {packageData?.country}
                          </span>
                        </i> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-geo-alt-fill"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg><span style={{ fontWeight: "bold" }}>
                            {packageData?.country}
                          </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Tour Plan */}
                <div className="tour-plan">
                  <div className="text">
                    <h2>{packageData?.title}</h2>
                    <p style={{ textAlign: "justify" }}>
                      {packageData?.overview}
                    </p>
                  </div>

                  {packageData?.activityData?.map((activity) => {
                    return (
                      <div className="content-box">
                        <div className="single-box">
                          <span>{activity?.activityDay}</span>

                          <h3>{activity?.activityTitle}</h3>

                          <ul className="list clearfix">
                            {activity?.activityDescription?.map((list) => {
                              return (
                                <li style={{ textAlign: "justify" }}>{list}</li>
                              );
                            })}
                          </ul>
                          <br />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Photo Gallery */}
                <div className="photo-gallery">
                  <div className="text">
                    <h2>Photo Gallery</h2>
                  </div>
                  <div className="image-box clearfix">
                    {packageData?.packageSubImages?.map((img) => {
                      return (
                        <figure
                          className="image"
                          style={{ width: "300px", height: "100px" }}
                        >
                          {" "}
                          <Image
                            src={`${SERVER_URL}/${img}`}
                            alt="Gallery Image"
                            style={{ objectFit: "fill" }}
                            width={400}
                            height={600}
                          />
                        </figure>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="default-sidebar tour-sidebar ml-20">
                {/* Booking Form */}
                <div className="form-widget">
                  <div className="widget-title">
                    <h3>Book This Tour </h3>
                  </div>
                  <form className="tour-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="totalMembers"
                        placeholder="Tour Name"
                        value={packageData?.titleSlug}
                        readOnly
                        required
                        style={{ backgroundColor: " #d3d3d3" }}
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={bookingTourData.name}
                        onChange={handleOnChange}
                      />
                      {errors.name && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={bookingTourData.email}
                        onChange={handleOnChange}
                      />
                      {errors.email && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        required
                        value={bookingTourData.phone}
                        onChange={handleOnChange}
                      />
                      {errors.phone && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="totalMembers"
                        placeholder="Total members in numbers"
                        required
                        value={bookingTourData.totalMembers}
                        onChange={handleOnChange}
                      />
                      {errors.totalMembers && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errors.totalMembers}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <input
                        type="date"
                        name="tourDate"
                        placeholder="dd/mm/yy"
                        value={bookingTourData.tourDate}
                        onChange={handleOnChange}
                        style={{
                          width: "100%",
                          height: "60px",
                          display: "block",
                          position: "relative",
                          display: "block",
                          width: "100%",
                          height: "60px",
                          background: "#ffffff",
                          border: "1px solid #ffffff",
                          borderRadius: "10px",
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#848484",
                          padding: "10px 20px",
                          transition: "all 500ms ease",
                        }}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.tourDate && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errors.tourDate}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        placeholder="Message"
                        value={bookingTourData.message}
                        onChange={handleOnChange}
                      ></textarea>
                      {errors.message && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group message-btn">
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={isLoading}
                      >
                        {isLoading === true ? (
                          <span>Loading...</span>
                        ) : (
                          <span>Book Tour</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Downloads */}
                {/* <div className="sidebar-widget downloads-widget">
                  <div className="widget-title">
                    <h3>Downloads</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="download-links clearfix">
                   
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
