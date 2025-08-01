"use client";
import { useContext } from "react";
import { checkSession } from "../app/uitls/authFunctions";

import { LucideSearch, LucideUserRound, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import axios from "axios";

import Swal from "sweetalert2";
import Preloader from "./Preloader";
import { useRouter } from "next/navigation";
import { seoContextObj } from "../app/layout";
export default function Header() {
  let { categories, companyData, packageData } = useContext(seoContextObj);

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionUser = await checkSession();

      setUser(sessionUser);
    };

    fetchSession();
  }, []);
  function handleSearch() {
    setSearchToggle(!searchToggle);
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = `${SERVER_URL}/api/auth/logout`; // Redirect to logout
    } catch (error) {}
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const suggestionStyles = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1000,
    maxHeight: "300px",
    overflowY: "auto",
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 3) {
        const response = packageData;
        setSuggestions(response);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery("");
    setSuggestions([]);
    setSearchToggle(false);
    // Navigate to suggested item's page
    router.push(`/trip/${suggestion.titleSlug}`); // You'll need to use next/router
  };

  return (
    <>
      {isLoading === true ? (
        <Preloader />
      ) : (
        <>
          {categories.length !== 0 && (
            <>
              <header className="main-header style-one">
                <div className="header-lower">
                  <div
                    className="container-fluid"
                    style={{
                      padding: "0px 30px",
                    }}
                  >
                    <div className="outer-box">
                      <div className="logo-box">
                        <figure className="logo">
                          <Link href="/">
                            <Image
                              src={
                                companyData?.logo_image
                                  ? `${SERVER_URL}/${companyData.logo_image}`
                                  : "/assets/images/logo.png"
                              }
                              alt="image not found"
                              width="200"
                              height="100"
                            />
                          </Link>
                        </figure>
                      </div>
                      <div className="menu-area clearfix">
                        <div
                          className="mobile-nav-toggler"
                          onClick={toggleMobileMenu}
                        >
                          <i className="icon-bar"></i>
                          <i className="icon-bar"></i>
                          <i className="icon-bar"></i>
                        </div>
                        <nav className="main-menu navbar-expand-md navbar-light">
                          <div
                            className="collapse navbar-collapse show clearfix"
                            id="navbarSupportedContent"
                          >
                            <ul className="navigation clearfix">
                              <li className="current dropdown">
                                <Link href="/" style={{ color: "grey" }}>
                                  Home
                                </Link>
                              </li>
                              <li className="">
                                <Link href="/trips" style={{ color: "grey" }}>
                                  All Packages
                                </Link>
                              </li>

                              {categories &&
                                categories.map((category, index) => {
                                  return (
                                    category.isVisibleOnNavbar && (
                                      <li
                                        key={`category-${index}`} // Add unique key
                                        className={`dropdown ${
                                          activeDropdown === index + 1
                                            ? "open"
                                            : ""
                                        }`}
                                      >
                                        <Link
                                          href={`/${category.slugName}`}
                                          style={{ color: "grey" }}
                                          onClick={() =>
                                            toggleDropdown(index + 1)
                                          }
                                        >
                                          {category.name}
                                        </Link>
                                        {category.subCategoryId.length > 0 && (
                                          <ul>
                                            {category.subCategoryId.map(
                                              (subCategory, subIndex) => (
                                                <li
                                                  key={`subcategory-${subIndex}`} // Add unique key
                                                >
                                                  <Link
                                                    href={`/${category.slugName}/${subCategory.slugName}`}
                                                  >
                                                    {subCategory.name}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}
                                      </li>
                                    )
                                  );
                                })}
                              <li
                                className={`dropdown ${
                                  activeDropdown === 3 ? "open" : ""
                                }`}
                              >
                                <Link
                                  href="/about-us"
                                  style={{ color: "grey" }}
                                  onClick={() => toggleDropdown(3)}
                                >
                                  About Us
                                </Link>
                              </li>

                              <li className="dropdown">
                                <Link href="/blogs" style={{ color: "grey" }}>
                                  Blog
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </nav>
                      </div>
                      <ul className="menu-right-content clearfix">
                        <li className="search-box-outer" ref={searchRef}>
                          <div
                            className={`dropdown ${
                              searchToggle === true && "show"
                            }`}
                          >
                            <button
                              className="search-box-btn"
                              type="button"
                              id="dropdownMenu3"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded={`${searchToggle}`}
                              onClick={handleSearch}
                            >
                              <LucideSearch />
                            </button>
                            <div
                              className="dropdown-menu search-panel"
                              aria-labelledby="dropdownMenu3"
                              style={{ width: "800px" }}
                            >
                              <div className="form-container">
                                <form method="post" action="/search">
                                  <div
                                    className="form-group"
                                    style={{
                                      position: "relative",
                                      width: "750px",
                                    }}
                                  >
                                    <input
                                      type="search"
                                      name="search-field"
                                      placeholder="Search...."
                                      value={searchQuery}
                                      onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault(); // Prevent form submission
                                        }
                                      }}
                                      required
                                      style={{
                                        width: "100%",
                                        padding: "12px 20px",
                                        fontSize: "16px",
                                        height: "6ch",
                                      }}
                                    />

                                    {/* Suggestions dropdown */}
                                    {searchQuery && (
                                      <div
                                        style={{
                                          ...suggestionStyles,
                                          width: "100%",
                                          maxHeight: "400px",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {isLoadingSuggestions ? (
                                          <div className="p-2 text-muted">
                                            Loading suggestions...
                                          </div>
                                        ) : suggestions.length > 0 ? (
                                          suggestions
                                            .filter((suggestion) =>
                                              suggestion.title
                                                .toLowerCase()
                                                .includes(
                                                  searchQuery.toLowerCase()
                                                )
                                            )
                                            .map((suggestion) => (
                                              <div
                                                key={suggestion.id}
                                                className="suggestion-item p-3 hover-bg-gray-100 cursor-pointer"
                                                onClick={() =>
                                                  handleSuggestionClick(
                                                    suggestion
                                                  )
                                                }
                                                style={{
                                                  borderBottom:
                                                    "1px solid #eee",
                                                  cursor: "pointer",
                                                }}
                                              >
                                                {suggestion.title}
                                              </div>
                                            ))
                                        ) : (
                                          <div className="p-2 text-muted">
                                            No suggestions found
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-link">
                          {user ? (
                            <Link href="" onClick={openPanel}>
                              <img
                                src={user?.profilePicture}
                                alt=""
                                style={{
                                  borderRadius: "50%",
                                  backgroundColor: "transparent",
                                }}
                              />
                            </Link>
                          ) : (
                            <Link href="/sign-in">
                              <LucideUserRound />
                            </Link>
                          )}
                        </li>

                        {isPanelOpen ? (
                          <div
                            onClick={handleLogout}
                            style={{
                              color: "white",
                              marginRight: "end",
                              textAlign: "center",
                              backgroundColor: "#ff7c5b",
                              zIndex: "1000",
                              marginTop: "15px",
                              borderRadius: "2px 2px 2px 2px",
                            }}
                          >
                            Logout
                          </div>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="sticky-header">
                  <div className="auto-container">
                    <div className="outer-box">
                      <div className="logo-box">
                        <figure className="logo">
                          <Link href="/">
                            <Image
                              src="/assets/images/logo.png"
                              alt=""
                              height={30}
                              width={100}
                            />
                          </Link>
                        </figure>
                      </div>
                      <div className="menu-area">
                        <nav className="main-menu clearfix"></nav>
                      </div>
                      <ul className="menu-right-content clearfix">
                        <li className="search-box-outer">
                          <div className="dropdown">
                            <button
                              className="search-box-btn"
                              type="button"
                              id="dropdownMenu4"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <LucideSearch />
                            </button>
                            <div
                              className="dropdown-menu search-panel"
                              aria-labelledby="dropdownMenu4"
                            >
                              <div className="form-container">
                                <form method="post" action="blog.html">
                                  <div className="form-group">
                                    <input
                                      type="search"
                                      name="search-field"
                                      placeholder="Search...."
                                      required=""
                                    />
                                    <button
                                      type="submit"
                                      className="search-btn"
                                    >
                                      <LucideSearch />
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-link">
                          <Link href="signup.html">
                            <i className="icon-Profile"></i>
                            <LucideUserRound />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </header>

              <MobileMenu
                user={user}
                handleLogout={handleLogout}
                companyData={companyData}
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
                categories={categories}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
