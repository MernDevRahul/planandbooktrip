"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { CalendarDays } from "lucide-react"

const BlogDetails = ({ params }) => {
  const { slug } = params; // Get the slug from params
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [latestBlog, setLatestBlogs] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!slug) return; // Wait until slug is available
    async function fetchBlog() {
      try {
        const response = await axios.get(`${BASE_URL}/api/blogs/slug/${slug}`);

        setBlog(response.data.data);
        const res = await axios.get(`${BASE_URL}/api/blogs`);

        setLatestBlogs(res.data.data);
        // Access the blog data inside the "data" field

      } catch (error) {
   
        Swal.fire("Error", "Failed to load blog details.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire("Error", "Please fix the errors in the form.", "error");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
    
      const response = await axios.post(`${BASE_URL}/api/queries`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Swal.fire("Success", "Your message has been submitted!", "success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
     
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to submit your message. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (!blog) {
    return <div className="error">Blog not found</div>;
  }

  return (
    <>
      {/* Page Title */}
      <section className="page-title centred" style={{ backgroundImage: `url(${BASE_URL}/${blog.blogImage})` }}>
        <div className="auto-container">
          <div className="content-box">
            <h1>{blog.blogTitle}</h1>
            <p>{blog.blogTag}</p>
          </div>
        </div>
      </section>
      {/* End Page Title */}

      {/* Blog Details Section */}
      <section className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-details-content">
                <div className="news-block-one">
                  <div className="inner-box">
                    <div className="lower-content">
                      <div className="category">
                        <Link href="#">{blog.blogTag}</Link>
                      </div>
                      <h2>{blog.blogTitle}</h2>
                      <ul className="post-info clearfix">
                        <li>
                          <span>By</span> <Link href="#">{blog.createdBy}</Link>
                        </li>


                      </ul>
                    </div>
                    <figure className="image-box">
                      <Image src={`${BASE_URL}/${blog.blogImage}`} alt={blog.blogTitle} width={800} height={400} />
                      <span className="post-date">
                        <CalendarDays />{new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </figure>
                  </div>
                </div>
                <div className="text">
                  <p>{blog?.blogDescription}</p>
                </div>
                <div className="image-box clearfix">
                  {blog?.additionalImages?.map((image, index) => (
                    <figure key={index} className="image">
                      <Image src={`${BASE_URL}/${image}`} alt={`Additional image ${index + 1}`} width={400} height={300} />
                    </figure>
                  ))}
                </div>

                <div className="comments-form-area">
                  <div className="group-title">
                    <h2>Leave Your Comments</h2>
                    <p>We value your feedback. Share your thoughts below.</p>
                  </div>
                  <div className="form-inner">
                    <form onSubmit={handleSubmit} className="default-form">
                      <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.name && <p className="error-text" style={{ color: "red" }}>{errors.name}</p>}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email && <p className="error-text" style={{ color: "red" }}>{errors.email}</p>}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.phone && <p className="error-text" style={{ color: "red" }}>{errors.phone}</p>}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                          <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.subject && <p className="error-text" style={{ color: "red" }}>{errors.subject}</p>}
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                          <textarea
                            name="message"
                            placeholder="Write Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                          {errors.message && <p className="error-text" style={{ color: "red" }}>{errors.message}</p>}
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                          <button className="theme-btn" type="submit">
                            Submit Now
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar default-sidebar ml-20">
                {/* <div className="sidebar-widget sidebar-search">
                  <div className="widget-title">
                    <h3>Search</h3>
                  </div>
                  <form action="/search" method="post" className="search-form">
                    <div className="form-group">
                      <input type="search" name="search-field" placeholder="Search" required />
                      <button type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>
                </div> */}
                {/* <div className="sidebar-widget category-widget">
                  <div className="widget-title">
                    <h3>Categories</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      {blog.categories?.map((category, index) => (
                        <li key={index}>
                          <Link href={`/category/${category.slug}`}>
                            <i className="icon-Hover-Arrow"></i> {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}'
                <div className="sidebar-widget post-widget" style={{
                  marginTop: '190px',
                  wordWrap: 'break-word',
                  overflowY: 'auto',
                  whiteSpace: 'normal',
                  maxWidth: '100%'
                }}>
                  <div className="widget-title">
                    <h3>Latest Blogs</h3>
                  </div>
                  <div className="post-inner" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxHeight: '300px', /* Set desired height */
                    overflowWrap: 'break-wrap', /* Enables vertical scrolling */
                    scrollbarWidth: 'thin', /* For Firefox */
                    msOverflowStyle: 'none' /* Hides scrollbar in IE/Edge */
                  }}>
                    {latestBlog?.map((blog, index) => (
                      <div key={index} className="post" style={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                        maxWidth: '100%'
                      }}>
                        <figure className="post-thumb">
                          <Link href={`/blogs/${blog.slugName}`}>
                            <Image
                              src={`${BASE_URL}/${blog.blogImage}`}
                              alt={blog.blogTitle}
                              width='50'
                              height="50"
                            />
                          </Link>
                        </figure>
                        <span className="post-date" style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          whiteSpace: 'normal'
                        }}>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <h4 style={{
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          whiteSpace: 'normal',
                          display: 'block'
                        }}>
                          <Link href={`/blogs/${blog.slugName}`}>{blog.blogTitle}</Link>
                        </h4>
                      </div>
                    ))}
                  </div>

                </div>

                <div className="advice-widget">
                  <div className="inner-box" style={{ backgroundImage: 'url(/assets/images/resource/advice-1.jpg)' }}>
                    <div className="text">
                      <h2>Get <br />25% Off <br />On New York Tours</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Details Section End */}
    </>
  );
};

export default BlogDetails;