import React from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import ResortsParallaxBackground from '../components/ResortsParallaxBackground/ResortsParallaxBackground';

const PrivacyPolicy = () => (
  /* eslint-disable max-len */
  <CContainer>
    <ResortsParallaxBackground />
    <CRow className="row justify-content-md-center mt-4">
      <CCol lg={8}>
        <h1 className="mb-4">Privacy Policy</h1>
        <CCard className="mb-4">
          <CCardHeader><h2>1. Introduction</h2></CCardHeader>
          <CCardBody>
            <p>Welcome to ShredIndex. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share your personal information when you visit our website (https://shredindex.com) or use our services.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>2. Information We Collect</h2></CCardHeader>
          <CCardBody>
            <h3>2.1 Personal Information</h3>
            <p>We may collect the following personal information when you use our website or services:</p>
            <CListGroup flush>
              <CListGroupItem>Name</CListGroupItem>
              <CListGroupItem>Email address</CListGroupItem>
              <CListGroupItem>Mailing address</CListGroupItem>
              <CListGroupItem>Phone number</CListGroupItem>
              <CListGroupItem>Payment information</CListGroupItem>
              <CListGroupItem>IP address</CListGroupItem>
            </CListGroup>

            <h3 className="mt-4">2.2 Non-Personal Information</h3>
            <p>We may also collect non-personal information such as:</p>
            <CListGroup flush>
              <CListGroupItem>Browser type</CListGroupItem>
              <CListGroupItem>Operating system</CListGroupItem>
              <CListGroupItem>Pages viewed</CListGroupItem>
              <CListGroupItem>Time spent on our website</CListGroupItem>
              <CListGroupItem>Referring website</CListGroupItem>
            </CListGroup>

            <h3 className="mt-4">2.3 Cookies and Tracking Technologies</h3>
            <p>We use cookies and similar tracking technologies to track the activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>3. How We Use Your Information</h2></CCardHeader>
          <CCardBody>
            <p>We use your personal information for the following purposes:</p>
            <CListGroup flush>
              <CListGroupItem>To provide and maintain our services</CListGroupItem>
              <CListGroupItem>To process transactions</CListGroupItem>
              <CListGroupItem>To send periodic emails, including newsletters and promotional offers</CListGroupItem>
              <CListGroupItem>To improve our website and services</CListGroupItem>
              <CListGroupItem>To respond to inquiries and customer service requests</CListGroupItem>
              <CListGroupItem>To analyze usage patterns and trends to improve user experience</CListGroupItem>
              <CListGroupItem>To comply with legal obligations</CListGroupItem>
              <CListGroupItem>To prevent and detect fraud</CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>4. Legal Basis for Processing</h2></CCardHeader>
          <CCardBody>
            <p>We rely on the following legal bases to process your personal information:</p>
            <CListGroup flush>
              <CListGroupItem>
                <strong>Consent:</strong>
                {' '}
                You have given your consent for processing your personal data for one or more specific purposes.
              </CListGroupItem>
              <CListGroupItem>
                <strong>Contract:</strong>
                {' '}
                Processing is necessary for the performance of a contract with you or to take steps at your request before entering into a contract.
              </CListGroupItem>
              <CListGroupItem>
                <strong>Legal Obligation:</strong>
                {' '}
                Processing is necessary for compliance with a legal obligation to which we are subject.
              </CListGroupItem>
              <CListGroupItem>
                <strong>Legitimate Interests:</strong>
                {' '}
                Processing is necessary for our legitimate interests, provided your interests and fundamental rights do not override those interests.
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>5. Consent</h2></CCardHeader>
          <CCardBody>
            <p>By using our website and services, you consent to the collection and use of your personal information as described in this Privacy Policy. You may withdraw your consent at any time by contacting us at tom@shredindex.com.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>6. Sharing Your Information</h2></CCardHeader>
          <CCardBody>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described below:</p>
            <CListGroup flush>
              <CListGroupItem>To trusted third parties who assist us in operating our website, conducting our business, or providing services to you, as long as those parties agree to keep this information confidential and comply with data protection laws.</CListGroupItem>
              <CListGroupItem>To comply with legal obligations, enforce our site policies, or protect our or others&apos; rights, property, or safety.</CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>7. Your Rights</h2></CCardHeader>
          <CCardBody>
            <p>You have the following rights regarding your personal information:</p>
            <CListGroup flush>
              <CListGroupItem>
                <strong>The right to access:</strong>
                {' '}
                You have the right to request copies of your personal data.
              </CListGroupItem>
              <CListGroupItem>
                <strong>The right to rectification:</strong>
                {' '}
                You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
              </CListGroupItem>
              <CListGroupItem>
                <strong>The right to erasure:</strong>
                {' '}
                You have the right to request that we erase your personal data, under certain conditions.
              </CListGroupItem>
              <CListGroupItem>
                <strong>The right to restrict processing:</strong>
                {' '}
                You have the right to request that we restrict the processing of your personal data, under certain conditions.
              </CListGroupItem>
              <CListGroupItem>
                <strong>The right to object to processing:</strong>
                {' '}
                You have the right to object to our processing of your personal data, under certain conditions.
              </CListGroupItem>
              <CListGroupItem>
                <strong>The right to data portability:</strong>
                {' '}
                You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
              </CListGroupItem>
            </CListGroup>
            <p className="mt-3">If you make a request, we have one month to respond to you. To exercise any of these rights, please contact us at tom@shredindex.com.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>8. Data Security</h2></CCardHeader>
          <CCardBody>
            <p>We have implemented appropriate technical and organizational measures to protect your personal information from unauthorized access, accidental loss, or destruction. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>9. Data Retention</h2></CCardHeader>
          <CCardBody>
            <p>We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>10. Third-Party Links</h2></CCardHeader>
          <CCardBody>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to read the privacy policies of these websites before providing any personal information.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>11. Children&apos;s Privacy</h2></CCardHeader>
          <CCardBody>
            <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>12. Changes to This Privacy Policy</h2></CCardHeader>
          <CCardBody>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the `&quot;Effective Date`&quot; at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>13. International Data Transfers</h2></CCardHeader>
          <CCardBody>
            <p>Your information, including personal data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. If you are located outside [your country] and choose to provide information to us, please note that we transfer the data, including personal data, to [your country] and process it there.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>14. Contact Us</h2></CCardHeader>
          <CCardBody>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p>ShredIndex</p>
            <p>Email: tom@shredindex.com</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>15. Compliance with GDPR</h2></CCardHeader>
          <CCardBody>
            <p>ShredIndex is committed to complying with the General Data Protection Regulation (GDPR). If you are a resident of the European Economic Area (EEA), you have certain data protection rights. In addition to the rights outlined in Section 7, you also have:</p>
            <CListGroup flush>
              <CListGroupItem>The right to lodge a complaint with a supervisory authority</CListGroupItem>
              <CListGroupItem>The right to withdraw consent at any time, where we rely on consent as the legal basis for processing</CListGroupItem>
            </CListGroup>
            <p className="mt-3">We will take all reasonable steps to ensure that your data is treated securely and in accordance with this Privacy Policy and GDPR requirements.</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
);

export default PrivacyPolicy;
