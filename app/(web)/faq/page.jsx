
const FAQPage = () => {
    return (
        <>
            {/* Page Title */}
            <section
                className="page-title centred"
                style={{ backgroundImage: "url(assets/images/background/page-title-5.jpg)" }}
            >
                <div className="auto-container">
                    <div className="content-box">
                        <h1>FAQ</h1>
                        <p>Discover your next great adventure</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* FAQ Page Section */}
            <section className="faq-page-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="faq-content mr-20">
                                <div className="sec-title">
                                    <p>Choose Your place</p>
                                    <h2>
                                        Frequently Asked <br />
                                        Question
                                    </h2>
                                </div>
                                <ul className="accordion-box">
                                    {[
                                        {
                                            title: "Which payment methods are acceptable?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                            active: true,
                                        },
                                        {
                                            title: "How to book the new tour for 2 persons?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                        },
                                        {
                                            title: "Is it possible to manage details through dashboard?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                        },
                                        {
                                            title: "Multiple tour bookings are allowed?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                        },
                                        {
                                            title: "I want to cancel my booking?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                        },
                                        {
                                            title: "All taxes are included in the booking prices?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                        },
                                        {
                                            title: "Why are your tours so expensive?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                        },
                                        {
                                            title: "What is the best way to contact with the guide?",
                                            content:
                                                "Lorem ipsum dolor sit amet consectur adip icing sed do eiusmod tempor incididunt labore dolore magna aliqua enim ad minim veniam. quis nostrud exercitation amco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehen derit in voluptate velit esse cillum.",
                                            list: ["Air fares", "4 Nights Hotel Accomodation", "Entrance Fees"],
                                        },
                                    ].map((faq, index) => (
                                        <li
                                            className={`accordion block ${faq.active ? "active-block" : ""}`}
                                            key={index}
                                        >
                                            <div className={`acc-btn ${faq.active ? "active" : ""}`}>
                                                <div className="icon-outer"></div>
                                                <h4>{faq.title}</h4>
                                            </div>
                                            <div className={`acc-content ${faq.active ? "current" : ""}`}>
                                                <div className="text">
                                                    <p>{faq.content}</p>
                                                    <ul className="list clearfix">
                                                        {faq.list.map((item, idx) => (
                                                            <li key={idx}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="faq-sidebar ml-20">
                                <div className="sidebar-inner">
                                    <h3>Ask Your Valuable Question</h3>
                                    <form action="faq.html" method="post" className="faq-form">
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Your Name" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="Your Email" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="phone" placeholder="Phone Number" required />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" placeholder="Message"></textarea>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="theme-btn">
                                                Submit Now
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ Page Section End */}
        </>
    );
};

export default FAQPage;
