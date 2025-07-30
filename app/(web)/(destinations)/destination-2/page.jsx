export default function Destination2() {
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
                        <div className="col-lg-8 col-md-15 col-sm-15 big-column">
                            <div className="row clearfix">
                                {[
                                    { image: "place-1.jpg", title: "New York City" },
                                    { image: "place-5.jpg", title: "Mont Blanc" },
                                    { image: "place-2.jpg", title: "African Park" },
                                    { image: "place-3.jpg", title: "Vietnam" },
                                ].map((place, index) => (
                                    <div className="col-lg-6 col-md-12 col-sm-12 place-block" key={index}>
                                        <div className="place-block-one">
                                            <div className="inner-box">
                                                <figure className="image-box">
                                                    <img src={`/assets/img/destination-2/${place.image}`} alt={place.title} />
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
                        <div className="col-lg-4 col-md-12 col-sm-12 place-block">
                            <div className="place-block-one">
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="/assets/img/destination-2/place-13.jpg" alt="Norway Lake" />
                                    </figure>
                                    <div className="text">
                                        <h3>
                                            <a href="/destination-details">Norway Lake</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 place-block">
                            <div className="place-block-one">
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="/assets/img/destination-2/place-14.jpg" alt="Netherland" />
                                    </figure>
                                    <div className="text">
                                        <h3>
                                            <a href="/destination-details">Netherland</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 place-block">
                            <div className="place-block-one">
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src="/assets/img/destination-2/place-10.jpg" alt="Costa Rica" />
                                    </figure>
                                    <div className="text">
                                        <h3>
                                            <a href="/destination-details">Costa Rica</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Place Section End */}
        </>
    );
}
