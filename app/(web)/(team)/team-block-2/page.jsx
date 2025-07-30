
const NewsSection = () => {
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
                        <p>Team Block 02</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* News Section */}
            <section className="news-section sec-pad">
                <div className="auto-container">
                    <div className="row clearfix">
                        {/* News Block 1 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                            <div
                                className="news-block-one wow fadeInUp animated"
                                data-wow-delay="00ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <a href="blog-details.html">
                                            <img src="assets/images/news/news-1.jpg" alt="" />
                                        </a>
                                        <span className="post-date">
                                            <i className="icon-Calendar"></i>5 Oct, 2020
                                        </span>
                                    </figure>
                                    <div className="lower-content">
                                        <div className="category">
                                            <a href="blog-details.html">Lifestyle</a>
                                        </div>
                                        <h3>
                                            <a href="blog-details.html">Including animation in your design system</a>
                                        </h3>
                                        <ul className="post-info clearfix">
                                            <li>
                                                <span>By</span> <a href="index.html">Eva Green</a>
                                            </li>
                                            <li> - October 13, 2020</li>
                                        </ul>
                                        <p>
                                            Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore
                                            magna aliqua enim.
                                        </p>
                                        <div className="btn-box">
                                            <a href="blog-details.html" className="theme-btn-two">
                                                See Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* News Block 2 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                            <div
                                className="news-block-one wow fadeInUp animated"
                                data-wow-delay="300ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <a href="blog-details.html">
                                            <img src="assets/images/news/news-2.jpg" alt="" />
                                        </a>
                                        <span className="post-date">
                                            <i className="icon-Calendar"></i>4 Oct, 2020
                                        </span>
                                    </figure>
                                    <div className="lower-content">
                                        <div className="category">
                                            <a href="blog-details.html">Lifestyle</a>
                                        </div>
                                        <h3>
                                            <a href="blog-details.html">Including animation in your design system</a>
                                        </h3>
                                        <ul className="post-info clearfix">
                                            <li>
                                                <span>By</span> <a href="index.html">Eva Green</a>
                                            </li>
                                            <li> - October 13, 2020</li>
                                        </ul>
                                        <p>
                                            Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore
                                            magna aliqua enim.
                                        </p>
                                        <div className="btn-box">
                                            <a href="blog-details.html" className="theme-btn-two">
                                                See Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* News Block 3 */}
                        <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                            <div
                                className="news-block-one wow fadeInUp animated"
                                data-wow-delay="600ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <a href="blog-details.html">
                                            <img src="assets/images/news/news-3.jpg" alt="" />
                                        </a>
                                        <span className="post-date">
                                            <i className="icon-Calendar"></i>3 Oct, 2020
                                        </span>
                                    </figure>
                                    <div className="lower-content">
                                        <div className="category">
                                            <a href="blog-details.html">Lifestyle</a>
                                        </div>
                                        <h3>
                                            <a href="blog-details.html">Including animation in your design system</a>
                                        </h3>
                                        <ul className="post-info clearfix">
                                            <li>
                                                <span>By</span> <a href="index.html">Eva Green</a>
                                            </li>
                                            <li> - October 13, 2020</li>
                                        </ul>
                                        <p>
                                            Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore
                                            magna aliqua enim.
                                        </p>
                                        <div className="btn-box">
                                            <a href="blog-details.html" className="theme-btn-two">
                                                See Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* News Section End */}
        </>
    );
};

export default NewsSection;
