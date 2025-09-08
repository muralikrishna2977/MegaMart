import CartIcon from "../assets/cart.svg";
import ProfileIcon from "../assets/profile.svg";
import ClearSearch from "../assets/clearSearch.svg";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar({
  cartCount,
  onCartClick,
  userId,
  name,
  email,
  onSearch,
}) {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const popupRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    if (onSearch) {
      onSearch(search.trim());
    }
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <nav className="navbar">
      <p className="logo">MegaMart</p>

      <div className="search-bar">
        <div className="search-icon-container" onClick={() => setSearch("")}>
          <img src={ClearSearch} width="30px" height="30px" />
        </div>
        <input
          placeholder="Search in MegaMart"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {userId !== null && (
        <div
          className="profile-container"
          onClick={() => setShowProfile((prev) => !prev)}
          ref={popupRef}
        >
          <img src={ProfileIcon} height="35px" width="35px" />
          <p>Profile</p>

          {showProfile && (
            <div className="profile-popup">
              <p>
                <strong>Name: </strong>
                {name}
              </p>
              <p>
                <strong>Email: </strong>
                {email}
              </p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}

      {userId === null && (
        <div
          className="profile-container"
          style={{ padding: "10px" }}
          onClick={() => navigate("/signin")}
        >
          <p style={{ color: "white", fontWeight: "bold" }}>Hello, SignIn</p>
        </div>
      )}

      <div className="cart-container" onClick={onCartClick}>
        <img src={CartIcon} height="40px" width="40px" />
        <p className="cart-count">{cartCount}</p>
      </div>
    </nav>
  );
}
