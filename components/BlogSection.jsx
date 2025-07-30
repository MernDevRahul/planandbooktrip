import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogSection({ blogs = [] }) {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  // Ensure blogs is an array
  const validBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <>
      <section className="news-section sec-pad pb-220">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(/assets/images/shape/shape-10.png)" }}
        ></div>
        <div className="auto-container">
          <div className="sec-title">
            <p>Stay updated with Plan and Book Trip</p>
            <h2>Explore Our Latest Blogs</h2>
          </div>
          <div className="row clearfix">
            {validBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className="col-lg-4 col-md-6 col-sm-12 news-block"
              >
                <div
                  className="news-block-one wow fadeInUp animated"
                  data-wow-delay={`${index * 300}ms`}
                  data-wow-duration="1500ms"
                >
                  <div className="inner-box">
                    <figure className="image-box">
                      <Link href={`/blogs/${blog.slugName || blog._id}`}>
                        <Image
                          src={`${BASE_URL}/${blog.blogImage}`}
                          alt={blog.blogTitle.trim()}
                          width={370}
                          height={270}
                        />
                      </Link>
                      <span className="post-date">
                        <CalendarDays />{" "}
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </figure>
                    <div className="lower-content">
                      <h3>
                        <Link href={`/blogs/${blog.slugName || blog._id}`}>
                          {blog.blogTitle.trim()}
                        </Link>
                      </h3>
                      <ul className="post-info clearfix">
                        <li>
                          <span>By</span> <a href="#">{blog.createdBy.trim()}</a>
                        </li>
                        <li>
                          -{" "}
                          {new Date(blog.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </li>
                      </ul>
                      <p>{blog.blogDescription.trim().slice(0, 100)}...</p>
                      <div className="btn-box">
                        <Link
                          href={`/blogs/${blog.slugName || blog._id}`}
                          className="theme-btn-two"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
