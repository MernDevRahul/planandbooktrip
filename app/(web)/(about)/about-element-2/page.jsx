
const PageTitleAndAbout = () => {
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
                        <p>About Block 02</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* about-style-two */}
            <section className="about-style-two">
                <div
                    className="pattern-layer"
                    style={{ backgroundImage: "url(assets/images/shape/shape-2.png)" }}
                ></div>
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* Content Column */}
                        <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                            <div className="content_block_1">
                                <div className="content-box">
                                    <div className="sec-title">
                                        <p>About Travio</p>
                                        <h2>World Best Travel Agency Company Since 2008.</h2>
                                    </div>
                                    <div className="text">
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiu smod tempor
                                            incididunt ut labore eiu dolore magna aliqua.Quis ipsum suspen disse ultrices
                                            gravida Risus commodo.
                                        </p>
                                    </div>
                                    <div className="btn-box">
                                        <a href="about.html" className="theme-btn">
                                            Find Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                            <div className="image_block_2">
                                <div className="image-box">
                                    <div className="shape">
                                        <div
                                            className="shape-1"
                                            style={{ backgroundImage: "url(assets/images/shape/shape-13.png)" }}
                                        ></div>
                                        <div
                                            className="shape-2"
                                            style={{ backgroundImage: "url(assets/images/shape/shape-12.png)" }}
                                        ></div>
                                        <div
                                            className="shape-3"
                                            style={{ backgroundImage: "url(assets/images/shape/shape-12.png)" }}
                                        ></div>
                                    </div>
                                    <figure className="image">
                                        <img src="assets/images/resource/about-3.jpg" alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* about-style-two end */}
        </>
    );
};

export default PageTitleAndAbout;
