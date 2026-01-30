"use client";

import React, { useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import JuniorMascot from "./JuniorMascot";
import "./book.css";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Book() {
  const router = useRouter();
  const bookRef = useRef();
  const flipSound = typeof Audio !== 'undefined' ? new Audio("/flip.mp3") : null;
  const isFlipping = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    // Auto open after 1 sec
    setTimeout(() => {
      if (bookRef.current) {
        bookRef.current.pageFlip().flipNext();
      }
    }, 1000);

    // Scroll handler with throttle
    const handleScroll = (e) => {
      e.preventDefault();

      if (isFlipping.current) return;
      isFlipping.current = true;

      if (e.deltaY > 0) {
        // Scroll down - next page
        bookRef.current.pageFlip().flipNext();
      } else {
        // Scroll up - previous page
        bookRef.current.pageFlip().flipPrev();
      }

      setTimeout(() => {
        isFlipping.current = false;
      }, 800); // Normal scrolling speed
    };

    // Mobile touch handler
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isFlipping.current) return;

      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      // Minimum swipe distance
      if (Math.abs(diff) > 50) {
        isFlipping.current = true;

        if (diff > 0) {
          // Swipe up - next page
          bookRef.current.pageFlip().flipNext();
        } else {
          // Swipe down - previous page
          bookRef.current.pageFlip().flipPrev();
        }

        setTimeout(() => {
          isFlipping.current = false;
        }, 800); // Normal scrolling speed
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleFlip = () => {
    if (flipSound) {
      flipSound.play().catch(() => {
        // Ignore audio play errors
      });
    }
  };

  return (
    <div className="book-scene">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 z-50 bg-white/80 hover:bg-white text-pink-500 font-bold py-3 px-6 rounded-full shadow-lg border-2 border-pink-200 transform transition-all hover:scale-110 hover:shadow-xl flex items-center gap-2"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-lg">Back Home</span>
      </button>

      {/* Book - Enhanced with animations */}
      <HTMLFlipBook
        ref={bookRef}
        width={600}
        height={800}
        maxShadowOpacity={0.6}
        drawShadow={true}
        flippingTime={1000}
        showCover={true}
        className="real-book"
        onFlip={handleFlip}
        useMouseEvents={false}
      >
        {/* Cover Page */}
        <div className="page cover">
          <div className="cover-content">
            <h1>My Journey</h1>
            <div className="squirrel-icon">🐿️</div>
            <p>Welcome to your magical school diary!</p>
          </div>
        </div>

        {/* Page 1 - About Us Heading (Left) */}
        <div className="page page-heading">
          <div className="page-content">
            <div className="page-icon">🏫</div>
            <h1 className="main-heading">About Us</h1>
            <div className="decorative-line"></div>
            <p className="subtitle">Nurturing Young Minds Since 2000</p>
          </div>
          <div className="page-number">Page 1</div>
        </div>

        {/* Page 2 - About Us Description (Right) */}
        <div className="page page-description">
          <div className="page-content text-left">
            <h2 className="page-title">Our Story</h2>
            <p className="description-text">
              Welcome to our wonderful school! We are dedicated to providing a safe,
              nurturing, and stimulating environment where young children can explore,
              learn, and grow.
            </p>
            <p className="description-text">
              Our experienced teachers use play-based learning to help children develop
              essential skills in literacy, numeracy, creativity, and social interaction.
            </p>
            <p className="description-text">
              We believe every child is unique and special, and we celebrate their
              individual talents and achievements every day.
            </p>
            <div className="mission-box">
              <strong>Our Mission:</strong> To inspire a lifelong love of learning
              through joy, discovery, and friendship.
            </div>
          </div>
          <div className="page-number">Page 2</div>
        </div>

        {/* Page 3 - Gallery Heading (Left) */}
        <div className="page page-heading page-purple">
          <div className="page-content">
            <div className="page-icon">📸</div>
            <h1 className="main-heading">Gallery</h1>
            <div className="decorative-line"></div>
            <p className="subtitle">Moments of Joy & Learning</p>
          </div>
          <div className="page-number">Page 3</div>
        </div>

        {/* Page 4 - Gallery Description (Right) */}
        <div className="page page-description">
          <div className="page-content text-left">
            <h2 className="page-title">Our Memories</h2>
            <div className="image-grid">
              <div className="image-placeholder">🎨 Art Class</div>
              <div className="image-placeholder">🎭 Drama Time</div>
              <div className="image-placeholder">🏃 Sports Day</div>
              <div className="image-placeholder">📚 Story Hour</div>
            </div>
            <p className="description-text">
              Explore our vibrant gallery showcasing the amazing activities,
              celebrations, and daily adventures of our students.
            </p>
          </div>
          <div className="page-number">Page 4</div>
        </div>

        {/* Page 5 - Facilities Heading (Left) */}
        <div className="page page-heading page-green">
          <div className="page-content">
            <div className="page-icon">🏢</div>
            <h1 className="main-heading">Facilities</h1>
            <div className="decorative-line"></div>
            <p className="subtitle">World-Class Learning Environment</p>
          </div>
          <div className="page-number">Page 5</div>
        </div>

        {/* Page 6 - Facilities Description (Right) */}
        <div className="page page-description">
          <div className="page-content text-left">
            <h2 className="page-title">Our Amenities</h2>
            <div className="facility-list">
              <div className="facility-item">
                <span className="facility-icon">🎨</span>
                <div>
                  <strong>Art Studio</strong>
                  <p>Fully equipped creative space</p>
                </div>
              </div>
              <div className="facility-item">
                <span className="facility-icon">📚</span>
                <div>
                  <strong>Library</strong>
                  <p>Thousands of children's books</p>
                </div>
              </div>
              <div className="facility-item">
                <span className="facility-icon">🏃</span>
                <div>
                  <strong>Play Area</strong>
                  <p>Safe outdoor playground</p>
                </div>
              </div>
              <div className="facility-item">
                <span className="facility-icon">💻</span>
                <div>
                  <strong>Computer Lab</strong>
                  <p>Modern technology learning</p>
                </div>
              </div>
            </div>
          </div>
          <div className="page-number">Page 6</div>
        </div>

        {/* Page 7 - Brochures Heading (Left) */}
        <div className="page page-heading page-orange">
          <div className="page-content">
            <div className="page-icon">📋</div>
            <h1 className="main-heading">Brochures</h1>
            <div className="decorative-line"></div>
            <p className="subtitle">Download Our Information</p>
          </div>
          <div className="page-number">Page 7</div>
        </div>

        {/* Page 8 - Brochures Description (Right) */}
        <div className="page page-description">
          <div className="page-content text-left">
            <h2 className="page-title">Available Downloads</h2>
            <div className="brochure-list">
              <div className="brochure-item">
                <span className="brochure-icon">📄</span>
                <div>
                  <strong>Admission Guide 2026</strong>
                  <p>Complete enrollment information</p>
                </div>
              </div>
              <div className="brochure-item">
                <span className="brochure-icon">📅</span>
                <div>
                  <strong>Academic Calendar</strong>
                  <p>Important dates and events</p>
                </div>
              </div>
              <div className="brochure-item">
                <span className="brochure-icon">🎓</span>
                <div>
                  <strong>Curriculum Overview</strong>
                  <p>Our learning programs</p>
                </div>
              </div>
              <div className="brochure-item">
                <span className="brochure-icon">💰</span>
                <div>
                  <strong>Fee Structure</strong>
                  <p>Transparent pricing details</p>
                </div>
              </div>
            </div>
          </div>
          <div className="page-number">Page 8</div>
        </div>

        {/* Page 9 - Contact Us Heading (Left) */}
        <div className="page page-heading page-blue">
          <div className="page-content">
            <div className="page-icon">📞</div>
            <h1 className="main-heading">Contact Us</h1>
            <div className="decorative-line"></div>
            <p className="subtitle">We'd Love to Hear From You</p>
          </div>
          <div className="page-number">Page 9</div>
        </div>

        {/* Page 10 - Contact Us Description (Right) */}
        <div className="page page-description">
          <div className="page-content text-left">
            <h2 className="page-title">Get in Touch</h2>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>123 Learning Lane, Education City</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>info@ourschool.edu</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <strong>Hours</strong>
                  <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="page-number">Page 10</div>
        </div>

        {/* Back Cover - Thank You */}
        <div className="page cover">
          <div className="cover-content">
            <div className="page-icon">👋</div>
            <h1>Thank You!</h1>
            <p>We look forward to welcoming you to our school family! ❤️</p>
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
}
