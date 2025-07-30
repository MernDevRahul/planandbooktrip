import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsSection({ packageData = [] }) {
  // Ensure packageData is an array and sort packages by startingDate in descending order
  const latestPackages = Array.isArray(packageData)
    ? [...packageData]
        .sort((a, b) => new Date(b.startingDate) - new Date(a.startingDate))
        .slice(0, 3)
    : [];

  return (
    <>
      <section className="news-section sec-pad pb-220">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(/assets/images/shape/shape-10.png)" }}
        ></div>
        <div className="auto-container">
          <div className="sec-title">
            <p>Upcoming Events</p>
            <h2>Stay Updated with JivYuv's Latest Events</h2>
            <Link href="/trips" className="theme-btn-two">
              Upcoming Events
            </Link>
          </div>
          <div className="row clearfix">
            {latestPackages.map((pkg, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 news-block" key={pkg._id}>
                <div
                  className="news-block-one wow fadeInUp animated animated"
                  data-wow-delay={`${index * 300}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box">
                    <figure className="image-box">
                      <Link href={`/trip/${pkg.titleSlug}`}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${pkg.packageImage}`}
                          alt={pkg.title}
                          width={370}
                          height={270}
                        />
                      </Link>
                      <span className="post-date">
                        <CalendarDays /> {new Date(pkg.startingDate).toLocaleDateString()}
                      </span>
                    </figure>
                    <div className="lower-content">
                      <div className="category">
                        <Link href={`/category/${pkg.categoryId.slugName}`}>
                          {pkg.categoryId.name}
                        </Link>
                      </div>
                      <h3>
                        <Link href={`/trip/${pkg.titleSlug}`}>{pkg.title}</Link>
                      </h3>
                      <ul className="post-info clearfix">
                        <li>
                          <span>Price:</span> ₹{pkg.packagePrice}
                        </li>
                        <li>- {pkg.numberOfNights}N / {pkg.numberOfDays}D</li>
                      </ul>
                      <p>{pkg.overview.slice(0, 100)}...</p>
                      <div className="btn-box">
                        <Link href={`/trip/${pkg.titleSlug}`} className="theme-btn-two">
                          See Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
