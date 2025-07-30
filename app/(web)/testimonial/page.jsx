
const TestimonialSection = () => {
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
                        <p>Testimonial Block</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}
            <section className="testimonial-section sec-pad centred">
                <div className="auto-container">
                    <div className="three-item-carousel owl-carousel owl-theme owl-nav-none owl-dots-none">
                        <div className="testimonial-block-one">
                            <div className="inner-box">
                                <ul className="rating-box clearfix">
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                </ul>
                                <div className="text">
                                    <div className="icon" style={{ backgroundImage: 'url(assets/images/icons/quote-1.png)' }}></div>
                                    <p>Lorem ipsum dolor amet consectet adipiscing sed do eiusmod tempor incididunt labore et dolore magna aliqua ipsum suspen disse ultrices gravida Risus</p>
                                </div>
                                <div className="author-box">
                                    <h4>Mike Hardson</h4>
                                    <span className="designation">Traveler</span>
                                    <figure className="thumb-box"><img src="assets/images/resource/testimonial-1.png" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-block-one">
                            <div className="inner-box">
                                <ul className="rating-box clearfix">
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                </ul>
                                <div className="text">
                                    <div className="icon" style={{ backgroundImage: 'url(assets/images/icons/quote-1.png)' }}></div>
                                    <p>Lorem ipsum dolor amet consectet adipiscing sed do eiusmod tempor incididunt labore et dolore magna aliqua ipsum suspen disse ultrices gravida Risus</p>
                                </div>
                                <div className="author-box">
                                    <h4>Amy Johnson</h4>
                                    <span className="designation">Traveler</span>
                                    <figure className="thumb-box"><img src="assets/images/resource/testimonial-2.png" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-block-one">
                            <div className="inner-box">
                                <ul className="rating-box clearfix">
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                    <li><i className="icon-Star"></i></li>
                                </ul>
                                <div className="text">
                                    <div className="icon" style={{ backgroundImage: 'url(assets/images/icons/quote-1.png)' }}></div>
                                    <p>Lorem ipsum dolor amet consectet adipiscing sed do eiusmod tempor incididunt labore et dolore magna aliqua ipsum suspen disse ultrices gravida Risus</p>
                                </div>
                                <div className="author-box">
                                    <h4>Luaka Smith</h4>
                                    <span className="designation">Traveler</span>
                                    <figure className="thumb-box"><img src="assets/images/resource/testimonial-3.png" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                        {/* Repeat for other testimonial blocks */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TestimonialSection;
