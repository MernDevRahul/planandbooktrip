import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Mail ,SquareX,Twitter, Facebook,Instagram, Youtube} from "lucide-react";

const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu, categories, companyData, user,handleLogout }) => {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
   const [activeDropdown, setActiveDropdown] = useState(null);
   const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMenuItemClick = () => {
    toggleMobileMenu(); // Close the mobile menu on click
  };

   const menuItemStyle = {
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#2d3748",
    textDecoration: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0"
  };

  const dropdownIconStyle = {
    marginLeft: "15px",
    transition: "transform 0.3s ease",
    fontSize: "0.8rem"
  };

  const subMenuStyle = {
    backgroundColor: "#f7fafc",
    padding: "8px 0",
    borderLeft: "3px solid #4299e1"
  };

  const subMenuItemStyle = {
    padding: "10px 25px",
    color: "#4a5568",
    textDecoration: "none",
    display: "block",
    fontSize: "0.9rem",
    transition: "all 0.2s ease"
  };
  const socialPlatforms = [
    { name: "Twitter", component: Twitter },
    { name: "Facebook", component: Facebook },
    { name: "Instagram", component: Instagram },
    { name: "Youtube", component: Youtube }
  ];
  

  return (
    <>
<div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu-visible open" : ""}`}>
      <div className="menu-backdrop" onClick={toggleMobileMenu} />
      <div className="menu-content">
        <button className="close-btn" style={{color:"orange"}} onClick={toggleMobileMenu}>
        <SquareX />
        </button>

        <nav className="menu-box">
          <div className="nav-logo">
            <Link href="/" onClick={handleMenuItemClick}>
            <Image
  src={
    companyData?.logo_image
      ? `${SERVER_URL}/${companyData.logo_image}`
      : "/assets/images/logo.png"
  }
  width={100}
  height={30}
  alt="Logo"
/>
            </Link>
          </div>

          <div className="menu-outer">
            <ul>
              {/* Home Link */}
              <li>
                <Link 
                  href="/" 
                  style={{ 
                    ...menuItemStyle,
                    borderTop: "1px solid #e2e8f0"
                  }}
                  onClick={handleMenuItemClick}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/trips" 
                  style={{ 
                    ...menuItemStyle,
                    borderTop: "1px solid #e2e8f0"
                  }}
                  onClick={handleMenuItemClick}
                >
                  All Packages
                </Link>
              </li>

              {/* Categories */}
              {categories && categories.map((category, index) => (
                category.isVisibleOnNavbar && (
                  <li 
                    key={category._id}
                    style={{ position: "relative" }}
                  >
                    <Link
                        href={`/${category.slugName}`}
                      style={{
                        ...menuItemStyle,
                        backgroundColor: activeDropdown === index ? "#f0f4f8" : "#ffffff"
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown(index);
                      }}
                    >
                      {category.name}
                      {category.subCategoryId.length > 0 && (
                        <span style={{
                          ...dropdownIconStyle,
                          transform: activeDropdown === index ? "rotate(180deg)" : "none"
                        }}>
                          ▼
                        </span>
                      )}
                    </Link>

                    {/* Sub Categories */}
                    {activeDropdown === index && category.subCategoryId.length > 0 && (
                      <ul style={subMenuStyle}>
                        {category.subCategoryId.map((subCategory) => (
                          <li key={subCategory._id}>
                            <Link
                              href={`/${category.slugName}/${subCategory.slugName}`}
                              style={{
                                ...subMenuItemStyle,
                                ":hover": {
                                  color: "#4299e1",
                                  paddingLeft: "30px"
                                }
                              }}
                              onClick={handleMenuItemClick}
                            >
                              {subCategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              ))}

             { /* Other Links */}
                      {['About Us', 'Blogs', 'Contact'].map((item, index) => (
                      <li key={index}>
                        <Link 
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} 
                        style={menuItemStyle}
                        onClick={handleMenuItemClick}
                        >
                        {item}
                        </Link>
                      </li>
                      ))}
                    </ul>
                    </div>

                     {/* Profile Details */} 
                    <div style={{  borderTop: "1px solid #e2e8f0" }}>
                      
                      <ul style={{ listStyle: "none", padding: 0 }}>
                      {user ? (
                  <li style={{ ...subMenuItemStyle, color: "#718096" }}>
                    <Link
                      href="#"
                      style={{
                        ...menuItemStyle,
                        backgroundColor: activeDropdown === "profile" ? "#f0f4f8" : "#ffffff",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("profile");
                      }}
                    >
                     <img src={user.profilePicture} style={{width:50,height:50}} /> {user?.firstName} {user?.lastName}
                      <span
                        style={{
                          ...dropdownIconStyle,
                          transform: activeDropdown === "profile" ? "rotate(180deg)" : "none",
                        }}
                      >
                        ▼
                      </span>
                    </Link>
                    {activeDropdown === "profile" && (
                      <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                        <Link href="/" onClick={() => { handleLogout(); handleMenuItemClick(); }}>
                        <li style={{ ...subMenuItemStyle, color: "white" }}>Profile</li>

                        </Link>
                        <Link href="#" onClick={() => { handleLogout(); handleMenuItemClick(); }}>
                        <li style={{ ...subMenuItemStyle, color: "white" }}>
                            Logout
                        </li>
                        </Link>
                      </ul>
                    )}
                  </li>
                ) : (
                  <li>
                    <Link href="/sign-in" style={menuItemStyle} onClick={handleMenuItemClick}>
                      Log-in
                    </Link>
                  </li>
                )}
                      </ul>
                    </div>

                    {/* Contact Info */}
          <div className="contact-info" style={{
            padding: "20px",
            marginTop: "30px",
            borderTop: "1px solid #e2e8f0",
            color:"whitesmoke"
          }}>
            <h4 style={{ 
              color: "#2d3748", 
              marginBottom: "15px",
              fontSize: "1.1rem"
            }}>
              Contact Info
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ ...subMenuItemStyle, color: "#718096" }}>
              <MapPin />
  {`${companyData.address.street}, ${companyData.address.city}, ${companyData.address.state}, ${companyData.address.postal_code}, ${companyData.address.country}`}
</li>
              <li style={{ ...subMenuItemStyle }}>
                <Link href="tel:+918882405049" style={{ color: "#4299e1" }}>
                <Phone />
                  +91 {companyData.phone_number}
                </Link>
              </li>
              <li style={{ ...subMenuItemStyle ,display:"flex",alignItems:"center"}}>
              
             
              <Link href={`mailto:${companyData.email_id}`} style={{ color: "#4299e1" }}>
  {companyData.email_id}
  
</Link><Mail />
              </li>
            </ul>
          </div>

          {/* Social Links */}
          
<div className="social-links" style={{
  padding: "20px",
  borderTop: "1px solid #e2e8f0"
}}>
  <ul style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: 0
  }}>
    {socialPlatforms.map((platform) => {
      const IconComponent = platform.component;
      return (
        <li key={platform.name}>
          <Link 
            href="/" 
            style={{ 
              color: "#718096",
              ":hover": { color: "#4299e1" },
              transition: "color 0.3s ease"
            }}
          >
            <IconComponent />
          </Link>
        </li>
      );
    })}
  </ul>
</div>
        </nav>
      </div>
    </div>



    </>
  );
};

export default MobileMenu;
