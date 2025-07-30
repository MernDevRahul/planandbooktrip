
const BookingPage = () => {
    return (
        <>
            {/* Page Title */}
            <section
                className="page-title centred"
                style={{ backgroundImage: "url(assets/images/background/page-title-2.jpg)" }}
            >
                <div className="auto-container">
                    <div className="content-box">
                        <h1>Booking Process 1</h1>
                        <p>Discover your next great adventure</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* Booking Section */}
            <section className="booking-section booking-process-1">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="booking-process-content mr-20">
                                <ul className="process-label clearfix">
                                    <li className="current">
                                        <span>1.</span>Personal Info
                                    </li>
                                    <li>
                                        <span>2.</span>Payment Info
                                    </li>
                                    <li>
                                        <span>3.</span>Confirm
                                    </li>
                                </ul>
                                <div className="inner-box">
                                    <h3>Personal Info</h3>
                                    <form action="booking-2.html" method="post" className="processing-form">
                                        <div className="row clearfix">
                                            {[
                                                { label: "First Name", name: "fname" },
                                                { label: "Last Name", name: "lname" },
                                                { label: "Address 1", name: "address1" },
                                                { label: "Address 2", name: "address2" },
                                                { label: "City", name: "city" },
                                                { label: "Zip Code", name: "zip" },
                                                { label: "State", name: "state" },
                                                { label: "Country", name: "country" },
                                            ].map((field, index) => (
                                                <div className="col-lg-6 col-md-6 col-sm-12 column" key={index}>
                                                    <div className="form-group">
                                                        <label>{field.label}</label>
                                                        <input type="text" name={field.name} required />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="col-lg-12 col-md-12 col-sm-12 column">
                                                <div className="form-group">
                                                    <label>Message</label>
                                                    <textarea name="message"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 column">
                                                <div className="form-group message-btn text-right">
                                                    <button type="submit" className="theme-btn">
                                                        Next<i className="far fa-angle-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="process-sidebar ml-20">
                                <div className="content-box">
                                    <h3>Tour Summary</h3>
                                    <figure className="image-box">
                                        <img src="assets/images/resource/sidebar-1.jpg" alt="Tour Summary" />
                                    </figure>
                                    <h4>Mascow Red City Land</h4>
                                    <ul className="info clearfix">
                                        <li>
                                            <i className="far fa-calendar-alt"></i>From: <span>25 Oct, 2020</span>
                                        </li>
                                        <li>
                                            <i className="far fa-calendar-alt"></i>To: <span>29 Oct, 2020</span>
                                        </li>
                                        <li>
                                            <i className="far fa-user-alt"></i>Guests: <span>2 Adults, 1 Child</span>
                                        </li>
                                    </ul>
                                    <div className="price">
                                        <h4>Total: $170.00</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Booking Section End */}
        </>
    );
};

export default BookingPage;
