import {
  BriefcaseBusiness,
  ShieldCheck,
  SmilePlus,
  UsersRound,
} from "lucide-react";
import Image from "next/image";

export default function Feature() {
  return (
    <>
      <section className="feature-section centred bg-color-1 sec-pad">
        <div className="auto-container">
          <div className="sec-title text-center">
            <p>JivYuv Specials</p>
            <h2>Why Travel with JivYuv?
            </h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div
                className="feature-block-one wow fadeInUp animated animated"
                data-wow-delay="00ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <figure className="image-box">
                    <Image
                      src="/assets/img/home/feature-1.jpg"
                      alt=""
                      width={270}
                      height={170}
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <UsersRound />
                    </div>
                    <h4>Worldwide Destinations</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div
                className="feature-block-one wow fadeInUp animated animated"
                data-wow-delay="200ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <figure className="image-box">
                    <Image
                      src="/assets/img/home/feature-2.jpg"
                      alt=""
                      width={270}
                      height={170}
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <ShieldCheck />
                    </div>
                    <h4>Best Price Guarantee</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div
                className="feature-block-one wow fadeInUp animated animated"
                data-wow-delay="400ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <figure className="image-box">
                    <Image
                      src="/assets/img/home/feature-3.jpg"
                      alt=""
                      width={270}
                      height={170}
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <BriefcaseBusiness />
                    </div>
                    <h4>Hassle-Free Booking</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div
                className="feature-block-one wow fadeInUp animated animated"
                data-wow-delay="600ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <figure className="image-box">
                    <Image
                      src="/assets/img/home/feature-4.jpg"
                      alt=""
                      width={270}
                      height={170}
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <SmilePlus />
                    </div>
                    <h4>Local & International Tours
                    </h4>
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
