
const GalleryPage = () => {
    return (
        <>
            {/* Page Title */}
            <section
                className="page-title centred"
                style={{ backgroundImage: "url(assets/images/background/page-title-4.jpg)" }}
            >
                <div className="auto-container">
                    <div className="content-box">
                        <h1>Gallery 2</h1>
                        <p>Discover your next great adventure</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        {[
                            "assets/images/gallery/gallery-1.jpg",
                            "assets/images/gallery/gallery-2.jpg",
                            "assets/images/gallery/gallery-3.jpg",
                            "assets/images/gallery/gallery-4.jpg",
                            "assets/images/gallery/gallery-5.jpg",
                            "assets/images/gallery/gallery-6.jpg",
                            "assets/images/gallery/gallery-7.jpg",
                            "assets/images/gallery/gallery-8.jpg",
                            "assets/images/gallery/gallery-9.jpg",
                        ].map((image, index) => (
                            <div className="col-lg-4 col-md-6 col-sm-12 gallery-block" key={index}>
                                <div className="gallery-block-one">
                                    <div className="inner-box">
                                        <figure className="image-box">
                                            <img src={image} alt={`Gallery Image ${index + 1}`} />
                                        </figure>
                                        <div className="view-btn">
                                            <a
                                                href={image}
                                                className="lightbox-image"
                                                data-fancybox="gallery"
                                            >
                                                <i className="icon-Plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Gallery Section End */}
        </>
    );
};

export default GalleryPage;
