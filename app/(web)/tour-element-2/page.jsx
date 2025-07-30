
const PageTitleAndTours = () => {
    return (
        <>
            {/* Page Title */}
            <section
                className="page-title centred"
                style={{ backgroundImage: "url(assets/images/background/page-title-5.jpg)" }}
            >
                <div className="auto-container">
                    <div className="content-box">
                        <h1>Elements</h1>
                        <p>Tour Block 02</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* tour-section */}
            <section className="tour-section bg-color-1 sec-pad-2">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-6 col-sm-12 tour-block">
                            <div
                                className="tour-block-one wow fadeInUp animated"
                                data-wow-delay="00ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="assets/images/tour/tour-1.jpg" alt="" />
                                        <a href="tour-details.html">
                                            <i className="fas fa-link"></i>
                                        </a>
                                    </figure>
                                    <div className="lower-content">
                                        <div className="rating">
                                            <span>
                                                <i className="fas fa-star"></i>8.0 Superb
                                            </span>
                                        </div>
                                        <h3>
                                            <a href="tour-details.html">Moscow Red City Land</a>
                                        </h3>
                                        <h4>
                                            $170.00<span> / Per person</span>
                                        </h4>
                                        <ul className="info clearfix">
                                            <li>
                                                <i className="far fa-clock"></i>5 Days
                                            </li>
                                            <li>
                                                <i className="far fa-map"></i>G87P, Birmingham
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                        <div className="btn-box">
                                            <a href="tour-details.html">See Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 tour-block">
                            <div
                                className="tour-block-one wow fadeInUp animated"
                                data-wow-delay="300ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="assets/images/tour/tour-2.jpg" alt="" />
                                        <a href="tour-details.html">
                                            <i className="fas fa-link"></i>
                                        </a>
                                    </figure>
                                    <div className="lower-content">
                                        <div className="rating">
                                            <span>
                                                <i className="fas fa-star"></i>8.0 Superb
                                            </span>
                                        </div>
                                        <h3>
                                            <a href="tour-details.html">Moscow Red City Land</a>
                                        </h3>
                                        <h4>
                                            $170.00<span> / Per person</span>
                                        </h4>
                                        <ul className="info clearfix">
                                            <li>
                                                <i className="far fa-clock"></i>5 Days
                                            </li>
                                            <li>
                                                <i className="far fa-map"></i>G87P, Birmingham
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                        <div className="btn-box">
                                            <a href="tour-details.html">See Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12 tour-block">
                            <div
                                className="tour-block-one wow fadeInUp animated"
                                data-wow-delay="600ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="assets/images/tour/tour-3.jpg" alt="" />
                                        <a href="tour-details.html">
                                            <i className="fas fa-link"></i>
                                        </a>
                                    </figure>
                                    <div className="lower-content">
                                        <div className="rating">
                                            <span>
                                                <i className="fas fa-star"></i>8.0 Superb
                                            </span>
                                        </div>
                                        <h3>
                                            <a href="tour-details.html">Moscow Red City Land</a>
                                        </h3>
                                        <h4>
                                            $170.00<span> / Per person</span>
                                        </h4>
                                        <ul className="info clearfix">
                                            <li>
                                                <i className="far fa-clock"></i>5 Days
                                            </li>
                                            <li>
                                                <i className="far fa-map"></i>G87P, Birmingham
                                            </li>
                                        </ul>
                                        <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                        <div className="btn-box">
                                            <a href="tour-details.html">See Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* tour-section end */}
        </>
    );
};

export default PageTitleAndTours;
