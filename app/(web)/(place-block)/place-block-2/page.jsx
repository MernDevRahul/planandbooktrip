
const FeatureSection = () => {
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
                        <p>Place Block 02</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* Feature Section */}
            <section className="feature-section centred bg-color-1 sec-pad-2">
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Feature Block 1 */}
                        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                            <div
                                className="feature-block-one wow fadeInUp animated"
                                data-wow-delay="00ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="assets/images/resource/feature-1.jpg" alt="" />
                                    </figure>
                                    <div className="lower-content">
                                        <div className="icon-box">
                                            <i className="icon-1"></i>
                                        </div>
                                        <h4>2000+ Our Worldwide Guides</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Block 2 */}
                        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                            <div
                                className="feature-block-one wow fadeInUp animated"
                                data-wow-delay="200ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="assets/images/resource/feature-2.jpg" alt="" />
                                    </figure>
                                    <div className="lower-content">
                                        <div className="icon-box">
                                            <i className="icon-2"></i>
                                        </div>
                                        <h4>100% Trusted Tour Agency</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Block 3 */}
                        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                            <div
                                className="feature-block-one wow fadeInUp animated"
                                data-wow-delay="400ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="assets/images/resource/feature-3.jpg" alt="" />
                                    </figure>
                                    <div className="lower-content">
                                        <div className="icon-box">
                                            <i className="icon-3"></i>
                                        </div>
                                        <h4>12+ Years of Travel Experience</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Block 4 */}
                        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
                            <div
                                className="feature-block-one wow fadeInUp animated"
                                data-wow-delay="600ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="assets/images/resource/feature-4.jpg" alt="" />
                                    </figure>
                                    <div className="lower-content">
                                        <div className="icon-box">
                                            <i className="icon-4"></i>
                                        </div>
                                        <h4>98% of Our Travelers are Happy</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Feature Section End */}
        </>
    );
};

export default FeatureSection;
