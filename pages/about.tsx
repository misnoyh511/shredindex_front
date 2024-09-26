import React from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import ResortsParallaxBackground
  from '../components/ResortsParallaxBackground/ResortsParallaxBackground';

const About = () => (
  /* eslint-disable max-len */

  <CContainer>
    <ResortsParallaxBackground />
    <CRow className="row justify-content-md-center mt-4">
      <CCol lg={8}>
        <h1 className="mb-4">About Us</h1>

        <CCard className="mb-4">
          <CCardHeader><h2>Our Mission</h2></CCardHeader>
          <CCardBody>
            <p>At ShredIndex, our mission is to be your ultimate guide in discovering the best snow resorts around the world. We aim to provide detailed, accurate, and up-to-date information to help you find the perfect destination for your skiing and snowboarding adventures.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>Who We Are</h2></CCardHeader>
          <CCardBody>
            <p>ShredIndex is a team of passionate skiers, snowboarders, and travel enthusiasts who are dedicated to bringing you the most comprehensive and reliable information on snow resorts. Our team members have firsthand experience in visiting and reviewing numerous resorts, ensuring that our recommendations are based on real-world experiences.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>What We Offer</h2></CCardHeader>
          <CCardBody>
            <ul>
              <li>Comprehensive Resort Listings: Explore our extensive database of over 6,000 snow resorts worldwide.</li>
              <li>Detailed Resort Information: Find information on snowfall, terrain, amenities, and more.</li>
              <li>User Reviews and Ratings: Read reviews and ratings from fellow snow enthusiasts.</li>
              <li>Expert Advice: Get tips and insights from our team of experts to make the most of your snow adventures.</li>
            </ul>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>Our Values</h2></CCardHeader>
          <CCardBody>
            <ul>
              <li>
                <strong>Passion:</strong>
                We are passionate about skiing and snowboarding and are committed to sharing that passion with our users.
              </li>
              <li>
                <strong>Trust:</strong>
                We strive to provide reliable and trustworthy information.
              </li>
              <li>
                <strong>Community:</strong>
                We believe in building a community of snow sports enthusiasts who can share their experiences and knowledge.
              </li>
              <li>
                <strong>Sustainability:</strong>
                We promote sustainable practices in snow sports and encourage resorts to implement environmentally friendly measures.
              </li>
            </ul>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>Contact Us</h2></CCardHeader>
          <CCardBody>
            <p>We love hearing from our users! Whether you have a question, feedback, or just want to share your snow adventure stories, feel free to reach out to us.</p>
            <p>
              <strong>Email:</strong>
              <a href="mailto:tom@shredindex.com">tom@shredindex.com</a>
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
);

export default About;
