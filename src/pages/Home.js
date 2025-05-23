import { NavLink } from 'react-router-dom';
import avatar from './images/avatar.png';
import '../css/homepage.css';
import bulut from './images/bulut.png'; // src/pages/images klasöründeyse
import { Col } from 'react-bootstrap';

export default function HomePage() {
  return (
    <>
     <section className="hero">
  <div className="clouds-layer">
    <img src={bulut} className="cloud cloud-1" alt="cloud" />
    <img src={bulut} className="cloud cloud-2" alt="cloud" />
    <img src={bulut} className="cloud cloud-3" alt="cloud" />
    <img src={bulut} className="cloud cloud-4" alt="cloud" />
    <img src={bulut} className="cloud cloud-5" alt="cloud" />
  </div>


        <div className="container hero-content">
          <div className="text">
            <h1>Online learning platform</h1>
            <p>We are now on our own...</p>
            <button className="cta-button">Join For Free</button>
          </div>
          <div className="image">
            <img src="https://cdn-icons-png.flaticon.com/512/2942/2942841.png" alt="learning" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Ask for this:</h2>
          <div className="divider"></div>

          <div className="feature-cards">
            <div className="feature-card">
              <h3>66+ UK courses</h3>
              <p>The traditional person will pass within 18%</p>
            </div>
            <div className="feature-card">
              <h3>Expert instructors</h3>
              <p>The advanced person will play within 10%</p>
            </div>
            <div className="feature-card">
              <h3>Life time access</h3>
              <p>The instructor processes all your whole tasks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-courses">
        <div className="container">
          <h2>Our featured courses</h2>
          <div className="course-list">
            <div className="course-item">User Experience</div>
            <div className="course-item">Frontend Development</div>
            <div className="course-item">User Experience</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Online Learning Platform. All rights reserved.</p>
      </footer>
    </>
  );
}