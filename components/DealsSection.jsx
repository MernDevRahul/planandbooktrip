import Link from "next/link";

export default function DealsSection() {
  return (
    <>
      <section
        className="deals-section"
        style={{
          backgroundImage: "url(/assets/img/home/deals-1.jpg)",
        }}
      >
        <div className="auto-container">
          <div className="content_block_2">
            <div className="content-box">
              <h3>
              Exclusive Group travel package Book Now and Save Big! <br />
              
              
              </h3>
              <div className="price">
                <h4>30% Off</h4>
                <del>50% off</del>
              </div>
              <p>
              Travel together, save more! Explore breathtaking destinations with adventure, culture, and relaxation. Book now!   </p>
              <Link href="tour-deals" className="theme-btn">
              Book now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
