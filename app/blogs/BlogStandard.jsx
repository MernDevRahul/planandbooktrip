"use client";
import { useState, useEffect,useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {CalendarDays,Search,MoveRight } from 'lucide-react'
import Preloader from "../../components/Preloader";
import dayjs from "dayjs";


const BlogStandard = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
 
 
  const [blogs, setBlogs] = useState([]);
  const [originalBlogs,setOriginalBlogs]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestNews,setLatestNews]=useState([]);
  const [searchQuery,setSearchQuery]=useState("");
  const [currentPage,setCurrentPage]=useState(1);
       const itemPerPage=5;
       const [totalPage, setTotalPage] = useState(0);
    
       const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        return latestNews?.slice(startIndex, endIndex);
      }, [currentPage, latestNews, itemPerPage]);
 
  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      try {
      
        let response = await axios.get(`${BASE_URL}/api/blogs`);
    
         
          setOriginalBlogs((state)=>{
          return response.data.data
        });
        setBlogs((state)=>{
          return response.data.data;

        }); // Use response.data.data to access the blogs

        let latestBlog=response.data.data.sort((a,b)=>{
          //  return new Date(a.createdAt)-Date(b.createdAt);
          return dayjs(b.createdAt).valueOf()- dayjs(a.createdAt).valueOf();



        });
        if(latestBlog.length>=3){
            setLatestNews(latestBlog.splice(0,3));
        }else{
            setLatestNews(latestBlog);
        }
        setTotalPage(Math.ceil(latestBlog?.length / itemPerPage));

      } catch (error) {
        Swal.fire({icon:"error",text:error?.response?.data?.message || "Something Went wrong"});
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);
  useEffect(() => {
    setCurrentPage(1); 
    setTotalPage(Math.ceil(latestNews?.length / itemPerPage));
  }, [latestNews]);
  useEffect(() => {

  
     
    if (searchQuery.length > 0) {
      let filteredBlogs = originalBlogs.filter((item) =>
        item.blogTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBlogs(filteredBlogs);
    } else {
      setBlogs(originalBlogs);
    }
   
  }, [searchQuery, originalBlogs,]); // Add originalBlogs here




  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }
  function handleSearchQuery(event){
  setSearchQuery(event.target.value);

  }

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       let filteredBlogs = originalBlogs.filter((item) =>
//         item.blogTitle.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setBlogs(filteredBlogs);
//     } else {
//       setBlogs(originalBlogs);
//     }
//   }, [searchQuery]);




      // <section className="page-title centred" style={{ backgroundImage: 'url(/assets/images/banner/tt.avif)' }}>



 
  return (
    <>
    {isLoading===true? <Preloader/>:<>
      {/* Page Title */}
      
      <section className="page-title centred" style={{ backgroundImage: 'url(/assets/images/banner/tt.avif)' }}>
        <div className="auto-container">
          <div className="content-box">
            <h1>Blog Standard </h1>
            {/* <p>page is not found</p> */}
          </div>
        </div>
      </section>

      
      {/* End Page Title */}

      {/* sidebar-page-container */}
      <section className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-standard-content">
                {latestNews.length===0 &&<div style={{fontSize:"26px", fontWeight:"700", marginBottom:"50px", textAlign:"center"}}>
                No matching results found
                </div>
                }
                
                {currentItems?.map((blog) => (
                  <div key={blog._id} className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <figure className="image-box" >
                        <Link href={`/blogs/${blog.slugName}`} legacyBehavior>
                          <a>
                            <Image src={`${BASE_URL}/${blog.blogImage}`} alt={blog.title} width={800} height={400} />
                          </a>
                        </Link>
                        <span className="post-date"><CalendarDays />{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </figure>
                      <div className="lower-content">
                        {/* <div style={{display:"flex", gap:"10px"}}>
                        {blog.blogTag.map((tagName)=>{
                            return <div class="category"><Link href="#" onClick={(event)=>{
                                event.preventDefault();
                            }}>{tagName}</Link></div>
                        })
                        
                      }
                      </div> */}
                        <h2><Link href={`/blogs/${blog.slugName}`} legacyBehavior><a>{blog.blogTitle}</a></Link></h2>
                        <ul className="post-info clearfix">
                          <li><span>By</span> <Link href="#" legacyBehavior><a>{blog.createdBy}</a></Link></li>
                          <li> - {new Date(blog.createdAt).toLocaleDateString()}</li>
                        </ul>
                        <p>{blog.excerpt}</p>
                        <div className="btn-box">
                          <Link href={`/blogs/${blog.slugName}`} legacyBehavior>
                            <a className="theme-btn-two">See Details</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pagination-wrapper">
                  <ul className="pagination clearfix">



                  {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
            <li key={page}>
                <a 
                    href="#" 
                    className={currentPage === page ? "current" : ""} 
                    onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage(page);
                    }}
                >
                    {page}
                </a>
            </li>
        ))}
                    {/* <li><a href="#" className="current">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#"><MoveRight /></a></li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar default-sidebar ml-20">
                <div className="sidebar-widget sidebar-search">
                  <div className="widget-title">
                    <h3>Search</h3>
                  </div>
                  <div action="/search" method="post" className="search-form">
                    <div className="form-group">
                      <input type="search" name="search-field" placeholder="Search" required onChange={handleSearchQuery} value={searchQuery} />
                      {/* <button type="submit"><Search /></button> */}
                    </div>
                  </div>
                </div>
                {/* <div className="sidebar-widget category-widget">
                  <div className="widget-title">
                    <h3>Categories</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      <li><Link href="/category/travel-direction" legacyBehavior><a><i className="icon-Hover-Arrow"></i>Travel Direction</a></Link></li>
                      <li><Link href="/category/documentation" legacyBehavior><a><i className="icon-Hover-Arrow"></i>Documentation</a></Link></li>
                      <li><Link href="/category/logo-assets" legacyBehavior><a><i className="icon-Hover-Arrow"></i>Logo & Assets</a></Link></li>
                    </ul>
                  </div>
                </div> */}
                <div className="sidebar-widget post-widget">
                  <div className="widget-title">
                    <h3>Latest Blogs</h3>
                  </div>
                  <div className="post-inner">
                    {latestNews.map((blog) => {return (
                       <div key={blog._id} className="post">
                        <figure className="post-thumb">
                          <Link href={`/blogs/${blog.slugName}`} legacyBehavior>
                            <a>
                              <Image src={`${BASE_URL}/${blog.blogImage}`} alt={blog.title} width={50} height={50} />
                            </a>
                          </Link>
                        </figure>
                        <span className="post-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <h4><Link href={`/blogs/${blog.slugName}`} legacyBehavior><a>{blog.blogTitle}</a></Link></h4>
                      </div>
                    )})}
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
      {/* sidebar-page-container end */}
      </>
      }
    </>
  );
};

export default BlogStandard;