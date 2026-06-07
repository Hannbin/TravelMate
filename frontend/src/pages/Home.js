import React from 'react';
import "../styles/home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="travelmate-home">
      {/* Navigation Header */}
      <header className="header">
        <div className="container">
          <div className="header-row">
            <div className="logo">
              <span className="logo-text">Travel<span className="accent">Mate</span></span>
            </div>
            <nav className="nav">
              <ul className="nav-list">
                <li><a href="#find-companions" className="nav-link">Find Companions</a></li>
                <li><a href="#create-trip" className="nav-link">Create Trip</a></li>
                <li><a href="#community" className="nav-link">Community</a></li>
                <li><a href="#about" className="nav-link">About Us</a></li>
              </ul>
            </nav>
            <div className="auth">
              <button className="btn btn-outline"onClick={() => navigate("/login")}>Log In</button>
              <button className="btn btn-primary" onClick={() => navigate("/register")}>Sign Up</button>
            </div>
            <button className="menu-btn" aria-label="Toggle menu">
              <span className="menu-line"></span>
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find your next travel companion</h1>
            <p className="hero-subtitle">Connect with like-minded travelers and share unforgettable journeys.</p>
            
            <div className="search-box">
              <div className="search-field">
                <label className="search-label">Location</label>
                <div className="input-wrapper">
                  <span className="icon-location"></span>
                  <input type="text" placeholder="Where are you going?" className="search-input" />
                </div>
              </div>
              <div className="search-field">
                <label className="search-label">Date</label>
                <div className="input-wrapper">
                  <span className="icon-calendar"></span>
                  <input type="text" placeholder="Select dates" className="search-input" />
                </div>
              </div>
              <div className="search-field">
                <label className="search-label">Group Size</label>
                <div className="input-wrapper">
                  <select className="search-select">
                    <option>Any size</option>
                    <option>2-4 People</option>
                    <option>5-8 People</option>
                    <option>9+ People</option>
                  </select>
                </div>
              </div>
              <div className="search-actions">
                <button className="btn btn-primary btn-large">Search</button>
                <button className="btn btn-outline btn-large">Create Trip</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Trips Section */}
      <section className="trending">
        <div className="container">
          <h2 className="section-title">Trending Trips</h2>
          <div className="trip-grid">
            {/* Trip Card 1 */}
            <article className="trip-card">
              <div className="trip-image-wrapper">
                <img src="/api/placeholder/400/250" alt="Iceland" className="trip-image" />
                <span className="badge badge-success">Open</span>
              </div>
              <div className="trip-content">
                <h3 className="trip-title">Iceland Ring Road Adventure</h3>
                <p className="trip-info">
                  <span className="icon-location-small"></span> Iceland
                </p>
                <p className="trip-info">
                  <span className="icon-calendar-small"></span> June 27 - May 23
                </p>
                <div className="trip-footer">
                  <div className="trip-members">
                    <span className="members-count">4/6 Members</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Trip Card 2 */}
            <article className="trip-card">
              <div className="trip-image-wrapper">
                <img src="/api/placeholder/400/250" alt="Tokyo" className="trip-image" />
                <span className="badge badge-warning">Filling Fast</span>
              </div>
              <div className="trip-content">
                <h3 className="trip-title">Tokyo Cherry Blossom Tour</h3>
                <p className="trip-info">
                  <span className="icon-location-small"></span> Tokyo, Japan
                </p>
                <p className="trip-info">
                  <span className="icon-calendar-small"></span> March 20 - April 5
                </p>
                <div className="trip-footer">
                  <div className="trip-members">
                    <span className="members-count">3/6 Members</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Trip Card 3 */}
            <article className="trip-card">
              <div className="trip-image-wrapper">
                <img src="/api/placeholder/400/250" alt="Peru" className="trip-image" />
                <span className="badge badge-danger">Almost Full</span>
              </div>
              <div className="trip-content">
                <h3 className="trip-title">Backpacking Peru's Andes</h3>
                <p className="trip-info">
                  <span className="icon-location-small"></span> Cusco, Peru
                </p>
                <p className="trip-info">
                  <span className="icon-calendar-small"></span> July 10 - July 25
                </p>
                <div className="trip-footer">
                  <div className="trip-members">
                    <span className="members-count">7/8 Members</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Trip Card 4 */}
            <article className="trip-card">
              <div className="trip-image-wrapper">
                <img src="/api/placeholder/400/250" alt="Tanzania" className="trip-image" />
                <span className="badge badge-danger">Almost Full</span>
              </div>
              <div className="trip-content">
                <h3 className="trip-title">Safari in Tanzania</h3>
                <p className="trip-info">
                  <span className="icon-location-small"></span> Serengeti, Tanzania
                </p>
                <p className="trip-info">
                  <span className="icon-calendar-small"></span> August 15 - August 30
                </p>
                <div className="trip-footer">
                  <div className="trip-members">
                    <span className="members-count">3/4 Members</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title text-center">How it Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">
                <span className="icon-search-large"></span>
              </div>
              <h3 className="step-title">1. Discover Your Trip</h3>
              <p className="step-description">Search through hundreds of planned trips or create your own adventure.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <span className="icon-users-large"></span>
              </div>
              <h3 className="step-title">2. Connect with Travelers</h3>
              <p className="step-description">Chat with potential companions, view profiles, and find the right fit.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <span className="icon-plane-large"></span>
              </div>
              <h3 className="step-title">3. Travel Together</h3>
              <p className="step-description">Finalize plans, book your adventure, and make lifelong memories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon-wrapper"><span className="icon-user-blue"></span></div>
              <div className="stat-info">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Users</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper"><span className="icon-plane-blue"></span></div>
              <div className="stat-info">
                <span className="stat-number">1,500+</span>
                <span className="stat-label">Trips</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper"><span className="icon-globe-blue"></span></div>
              <div className="stat-info">
                <span className="stat-number">50+</span>
                <span className="stat-label">Countries</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper"><span className="icon-star-blue"></span></div>
              <div className="stat-info">
                <span className="stat-number">4.8/5</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo logo-footer">
                <span className="logo-text">Travel<span className="accent">Mate</span></span>
              </div>
              <p className="footer-tagline">Connecting travelers for meaningful experiences around the globe.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-title">Company</h4>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#press">Press</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-title">Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#safety">Safety</a></li>
                  <li><a href="#terms">Terms</a></li>
                  <li><a href="#privacy">Privacy</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-title">Community</h4>
                <ul>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#forum">Forum</a></li>
                  <li><a href="#guidelines">Guidelines</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-title">Follow Us</h4>
                <ul className="social-links">
                  <li><a href="#facebook"><span className="icon-facebook"></span> Facebook</a></li>
                  <li><a href="#twitter"><span className="icon-twitter"></span> Twitter</a></li>
                  <li><a href="#instagram"><span className="icon-instagram"></span> Instagram</a></li>
                  <li><a href="#linkedin"><span className="icon-linkedin"></span> LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2026 TravelMate </p>
            <div className="language-selector">
              <select className="lang-select">
                <option>English (US)</option>
                <option>Tiếng Việt</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
