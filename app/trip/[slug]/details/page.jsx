"use client";

export default function DestinationDetails({ params }) {
    const { slug } = params; // Access the dynamic slug parameter

    if (!slug) {
        return <p>Loading...</p>; // Handle cases where the parameter is not yet available
    }

    return (
        <div className="destination-details-page">
            {/* Page Title */}
            <section
                className="page-title style-three"
                style={{ backgroundImage: "url(/assets/images/background/page-title-3.jpg)" }}
            >
                <div className="auto-container">
                    <div className="inner-box">
                        <h2>{slug} - Destination Details</h2>
                        <p>Explore the destination details for {slug}</p>
                    </div>
                </div>
            </section>

            {/* Destination Details Section */}
            <section className="destination-details">
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Content Side */}
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="destination-details-content">
                                <div className="inner-box">
                                    <h2>About the Destination</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat.
                                    </p>
                                    <ul className="info-list clearfix">
                                        <li>
                                            <i className="far fa-map"></i>Location: {slug}
                                        </li>
                                        <li>
                                            <i className="far fa-clock"></i>Best Time to Visit: All Year Round
                                        </li>
                                        <li>
                                            <i className="far fa-user"></i>Suitable for All Ages
                                        </li>
                                    </ul>
                                </div>

                                {/* Highlights */}
                                <div className="highlights">
                                    <h2>Highlights</h2>
                                    <ul>
                                        <li>Beautiful landscapes and scenic views</li>
                                        <li>Rich cultural heritage</li>
                                        <li>Adventure activities and local cuisine</li>
                                    </ul>
                                </div>

                                {/* Photo Gallery */}
                                <div className="photo-gallery">
                                    <h2>Photo Gallery</h2>
                                    <div className="image-box clearfix">
                                        <figure className="image">
                                            <img src="/assets/images/resource/destination-1.jpg" alt="Gallery Image" />
                                        </figure>
                                        <figure className="image">
                                            <img src="/assets/images/resource/destination-2.jpg" alt="Gallery Image" />
                                        </figure>
                                        <figure className="image">
                                            <img src="/assets/images/resource/destination-3.jpg" alt="Gallery Image" />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="default-sidebar destination-sidebar ml-20">
                                {/* Quick Info */}
                                <div className="sidebar-widget quick-info-widget">
                                    <div className="widget-title">
                                        <h3>Quick Info</h3>
                                    </div>
                                    <ul className="info-list">
                                        <li>
                                            <span>Location:</span> {slug}
                                        </li>
                                        <li>
                                            <span>Best Time:</span> All Year Round
                                        </li>
                                        <li>
                                            <span>Activities:</span> Hiking, Sightseeing, Local Cuisine
                                        </li>
                                    </ul>
                                </div>

                                {/* Downloads */}
                                <div className="sidebar-widget downloads-widget">
                                    <div className="widget-title">
                                        <h3>Downloads</h3>
                                    </div>
                                    <ul className="download-links clearfix">
                                        <li>
                                            <a href="#">
                                                Travel Guide <i className="fas fa-download"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Map <i className="fas fa-download"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
