const DestinationDetails = () => {
    return (
        <>
            {/* Page Title */}
            <section
                className="page-title centred"
                style={{ backgroundImage: 'url(/assets/img/destination-details/page-title-2.jpg)' }}
            >
                <div className="auto-container">
                    <div className="content-box">
                        <h1>Destination Details</h1>
                        <p>Discover your next great adventure</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* Destination Details */}
            <section className="destination-details">
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Content Side */}
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="destination-details-content">
                                <div className="inner-box">
                                    <div className="text">
                                        <h2>Mont Blanc Mountain</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                        </p>
                                    </div>
                                    <div className="image-box clearfix">
                                        <figure className="image">
                                            <img src="assets/img/destination-details/destination-1.jpg" alt="" />
                                        </figure>
                                        <figure className="image">
                                            <img src="assets/img/destination-details/destination-2.jpg" alt="" />
                                        </figure>
                                        <figure className="image">
                                            <img src="assets/img/destination-details/destination-3.jpg" alt="" />
                                        </figure>
                                    </div>
                                    <div className="text">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                        </p>
                                    </div>
                                </div>
                                <div className="country-details">
                                    <div className="text">
                                        <h3>Country Details</h3>
                                        <p>
                                            Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex commodo consequat. Duis aute irure dolor in reprehenderit in
                                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        </p>
                                    </div>
                                    <ul className="details-list clearfix">
                                        <li>
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>Address:</span> New York City
                                        </li>
                                        <li>
                                            <i className="far fa-id-card"></i>
                                            <span>Visa Requirements:</span> Yes Required
                                        </li>
                                        <li>
                                            <i className="fas fa-globe"></i>
                                            <span>Country:</span> New York City
                                        </li>
                                        <li>
                                            <i className="far fa-comments"></i>
                                            <span>Languages spoken:</span> English & Spanish
                                        </li>
                                        <li>
                                            <i className="fas fa-dollar-sign"></i>
                                            <span>Currency Used:</span> USD
                                        </li>
                                        <li>
                                            <i className="fas fa-phone"></i>
                                            <span>Support Phone:</span>
                                            <a href="tel:310215402">+310215402</a>
                                        </li>
                                        <li>
                                            <i className="far fa-envelope-open"></i>
                                            <span>Emergency Email:</span>
                                            <a href="mailto:info@example.com">info@example.com</a>
                                        </li>
                                        <li>
                                            <i className="far fa-map"></i>
                                            <span>Distance:</span> 10.7m
                                        </li>
                                    </ul>
                                </div>
                                {/* Other sections omitted for brevity */}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="default-sidebar destination-sidebar ml-20">
                                <div className="sidebar-widget sidebar-search">
                                    <div className="widget-title">
                                        <h3>Search</h3>
                                    </div>
                                    <form action="destination-details.html" method="post" className="search-form">
                                        <div className="form-group">
                                            <input type="search" name="search-field" placeholder="Search " required />


                                            <button type="submit">

                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* Other widgets omitted for brevity */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DestinationDetails;
