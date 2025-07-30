'use client';
import { useEffect, useState } from 'react';

export default function Funfact() {
  const [counts, setCounts] = useState({
    hikers: 0,
    places: 0,
    miles: 0,
    years: 0
  });

  useEffect(() => {
    // Implement counter animation here
    setCounts({
      hikers: 2000,
      places: 70,
      miles: 1200,
      years: 15
    });
  }, []);

  return (
    <>
      <section className="funfact-section centred">
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
          <div className="inner-container">
            <div className="row clearfix">
              <div className="col-lg-3 col-md-6 col-sm-12 counter-block">
                <div className="counter-block-one">
                  <div className="inner-box">
                    <div
                      className="pattern"
                      style={{
                        backgroundImage: "url(assets/images/shape/shape-5.png)",
                      }}
                    ></div>
                    <div className="count-outer count-box">
                      <span
                        className="count-text"
                        data-speed="1500"
                        data-stop="2000"
                      >
                        {counts.hikers}
                      </span>
                      <span>+</span>
                      <p>Awesome Hikers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 counter-block">
                <div className="counter-block-one">
                  <div className="inner-box">
                    <div
                      className="pattern"
                      style={{
                        backgroundImage: "url(assets/images/shape/shape-6.png)",
                      }}
                    ></div>
                    <div className="count-outer count-box">
                      <span
                        className="count-text"
                        data-speed="1500"
                        data-stop="70"
                      >
                        {counts.places}
                      </span>
                      <span>+</span>
                      <p>Stunning Places</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 counter-block">
                <div className="counter-block-one">
                  <div className="inner-box">
                    <div
                      className="pattern"
                      style={{
                        backgroundImage: "url(assets/images/shape/shape-7.png)",
                      }}
                    ></div>
                    <div className="count-outer count-box">
                      <span
                        className="count-text"
                        data-speed="1500"
                        data-stop="1200"
                      >
                        {counts.miles}
                      </span>
                      <span>+</span>
                      <p>Miles to Hike</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 counter-block">
                <div className="counter-block-one">
                  <div className="inner-box">
                    <div
                      className="pattern"
                      style={{
                        backgroundImage: "url(assets/images/shape/shape-8.png)",
                      }}
                    ></div>
                    <div className="count-outer count-box">
                      <span
                        className="count-text"
                        data-speed="1500"
                        data-stop="15"
                      >
                        {counts.years}
                      </span>
                      <p>Years in Service</p>
                    </div>
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
