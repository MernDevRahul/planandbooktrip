"use client";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { useEffect } from "react";
export default function Banner() {
  useEffect(() => {
    // Initialize datepicker here
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <section
        className="banner-section"
        style={{ backgroundImage: "url(assets/images/banner/banner-1.jpg)" }}
      >
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-1.png)" }}
        ></div>
        <div className="auto-container">
          <div className="content-box">
            <h2>
            Explore the World <br />
             </h2>
            <p>
            Unbeatable Deals, Unforgettable Journeys, Your Perfect Vacation Awaits!

            </p>
            {/* <div className="form-inner">
              <form onSubmit={handleSubmit} className="booking-form clearfix">
                <div className="form-group">
                  <MapPin />
                  <input
                    type="text"
                    name="service"
                    placeholder="Where to?"
                    required
                  />
                </div>
                <div className="form-group input-date">
                  <CalendarDays />{" "}
                  <input
                    type="text"
                    name="date"
                    placeholder="When?"
                    id="datepicker"
                  />
                </div>
                <div className="form-group">
                  <div className="select-box">
                    <select className="wide">
                      <option data-display="Travel Type">Travel Type</option>
                      <option value="1">Adventure Tours</option>
                      <option value="2">City Tours</option>
                      <option value="3">Couple Tours</option>
                      <option value="4">Group Tours</option>
                    </select>
                  </div>
                </div>
                <div className="message-btn">
                  <button type="submit" className="theme-btn">
                    <Search /> Find Now
                  </button>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
