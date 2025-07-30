import Image from "next/image";

export default function MapSection() {
  return (
    <>
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
              <div className="single-location-box">
                <figure className="map-marker">
                  <Image
                    src="/assets/images/icons/marker-1.png"
                    alt=""
                    width={60}
                    height={72}
                  />
                  <span>1</span>
                </figure>
                <div className="address-box">
                  <h3>Mauritius
                  </h3>
                  <p>
                  Escape to the stunning beaches, crystal-clear waters, and lush landscapes of Mauritius with JivYuv’s exclusive Mauritius holiday packages. All vacation tastes come together in Mauritius where you can have either a love-struck honeymoon or an extravagance trip or an action-packed journey.
                  </p>
                </div>
              </div>
              <div className="single-location-box">
                <figure className="map-marker">
                  <Image
                    src="/assets/images/icons/marker-1.png"
                    alt=""
                    width={60}
                    height={72}
                  />
                  <span>2</span>
                </figure>
                <div className="address-box">
                  <h3>Europe</h3>
                  <p>
                  Discover the charm, history, and breathtaking landscapes of Europe with JivYuv’s exclusive Europe tour packages.  There are various places to visit in Europe with beautiful countryside that suits various types of travelers and their preferences.
                  </p>
                </div>
              </div>
              <div className="single-location-box current">
                <figure className="map-marker">
                  <Image
                    src="/assets/images/icons/marker-1.png"
                    alt=""
                    width={60}
                    height={72}
                  />
                  <span>3</span>
                </figure>
                <div className="address-box">
                  <h3>India</h3>
                  <p>
                  Discover India’s rich culture, scenic landscapes, and unforgettable experiences today!
                  </p>
                </div>
              </div>
              <div className="single-location-box">
                <figure className="map-marker">
                  <Image
                    src="/assets/images/icons/marker-1.png"
                    alt=""
                    width={60}
                    height={72}
                  />
                  <span>4</span>
                </figure>
                <div className="address-box">
                  <h3>Vietnam</h3>
                  <p>
                  Discover the beauty of Vietnam with JivYuv’s exclusive Vietnam tour packages. Every carefully planned package from JivYuv permits you to experience a remarkable exploration of Vietnam regardless of which aspects attract you the most.

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
