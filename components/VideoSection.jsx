"use client";
import { CirclePlay } from "lucide-react";
import { useEffect } from "react";
export default function VideoSection() {
  useEffect(() => {
    // Initialize lightbox here if you're using a library
  }, []);

  return (
    <>
      <section
        className="video-section centred"
        style={{ backgroundImage: "url(assets/img/home/video-1.jpg)" }}
      >
        <div className="auto-container">
          <div className="inner-box">
            <h2>Explore Your Travel</h2>
            <p>Your New Traveling Idea</p>
            <div className="video-btn">
              <a
                href="https://www.youtube.com/shorts/x_nke_drHtQ"
                className="lightbox-image"
                data-caption=""
              >
                <CirclePlay size={48} />
                <span className="border-animation border-1"></span>
                <span className="border-animation border-2"></span>
                <span className="border-animation border-3"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
