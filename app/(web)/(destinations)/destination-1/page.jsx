export default function Destination1() {
    return (
        <>
            {/* Page Title */}
            <section
                className="page-title centred"
                style={{ backgroundImage: "url(/assets/img/destination-2/page-title.jpg)" }}
            >
                <div className="auto-container">
                    <div className="content-box">
                        <h1>Destinations</h1>
                        <p>Discover your next great adventure</p>
                    </div>
                </div>
            </section>
            {/* End Page Title */}

            {/* Place Section */}
            <section className="place-section sec-pad-2">
                <div className="anim-icon">
                    <div
                        className="icon anim-icon-1"
                        style={{ backgroundImage: "url(/assets/images/icons/anim-icon-1.png)" }}
                    ></div>
                    <div
                        className="icon anim-icon-2"
                        style={{ backgroundImage: "url(/assets/images/shape/shape-3.png)" }}
                    ></div>
                    <div
                        className="icon anim-icon-3"
                        style={{ backgroundImage: "url(/assets/images/shape/shape-3.png)" }}
                    ></div>
                </div>
                <div className="auto-container">
                    <div className="row clearfix">
                        {[
                            { image: "place-1.jpg", title: "New York City" },
                            { image: "place-5.jpg", title: "Mont Blanc" },
                            { image: "place-2.jpg", title: "Norway Lake" },
                            { image: "place-3.jpg", title: "African Park" },
                            { image: "place-4.jpg", title: "Vietnam" },
                            { image: "place-9.jpg", title: "Netherlands" },
                            { image: "place-10.jpg", title: "Greece" },
                            { image: "place-11.jpg", title: "Australia" },
                            { image: "place-12.jpg", title: "Costa Rica" },
                        ].map((place, index) => (
                            <div className="col-lg-4 col-md-6 col-sm-12 place-block" key={index}>
                                <div className="place-block-one">
                                    <div className="inner-box">
                                        <figure className="image-box">
                                            <img src={`/assets/img/destination-1/${place.image}`} alt={place.title} />
                                        </figure>
                                        <div className="text">
                                            <h3>
                                                <a href="/destination-details">{place.title}</a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Place Section End */}
        </>
    );
}
