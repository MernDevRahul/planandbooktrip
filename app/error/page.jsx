
const ErrorPage = () => {
    return (
        <>
            {/* Page Title */}
            <section
                className="page-title centred"
                style={{ backgroundImage: "url(assets/images/background/page-title-5.jpg)" }}
            >
                <div className="auto-container">
                    <div className="content-box">
                        <h1>404</h1>
                        <p>page is not found</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* Error Section */}
            <section className="error-section centred">
                <div className="auto-container">
                    <div className="inner-box">
                        <h1>404</h1>
                        <h2>
                            page is not found. <br />
                            the page doesn’t exist or has been deleted
                        </h2>
                        <a href="index.html" className="theme-btn">
                            Go To Home
                        </a>
                    </div>
                </div>
            </section>
            {/* Error Section End */}
        </>
    );
};

export default ErrorPage;
