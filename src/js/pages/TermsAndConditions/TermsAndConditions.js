import React from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import ResortsParallaxBackground from '../../components/ResortsParallaxBackground/ResortsParallaxBackground';

const TermsAndConditions = () => (
  <CContainer>
    <ResortsParallaxBackground />
    <CRow className="row justify-content-md-center mt-4">
      <CCol lg={8}>
        <h1 className="mb-4">Terms and Conditions</h1>

        <CCard className="mb-4">
          <CCardHeader><h2>1. Introduction</h2></CCardHeader>
          <CCardBody>
            <p>Welcome to ShredIndex. These terms and conditions outline the rules and regulations for the use of ShredIndex's website, located at https://shredindex.com.</p>
            <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use ShredIndex if you do not agree to all of the terms and conditions stated on this page.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>2. Intellectual Property Rights</h2></CCardHeader>
          <CCardBody>
            <p>Unless otherwise stated, ShredIndex and/or its licensors own the intellectual property rights for all material on ShredIndex. All intellectual property rights are reserved. You may access this from ShredIndex for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from ShredIndex</li>
              <li>Sell, rent, or sub-license material from ShredIndex</li>
              <li>Reproduce, duplicate, or copy material from ShredIndex</li>
              <li>Redistribute content from ShredIndex</li>
            </ul>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>3. User Comments</h2></CCardHeader>
          <CCardBody>
            <p>This Agreement shall begin on the date hereof.</p>
            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. ShredIndex does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of ShredIndex,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, ShredIndex shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
            <p>ShredIndex reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.</p>
            <p>You warrant and represent that:</p>
            <ul>
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
              <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>
            <p>You hereby grant ShredIndex a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader><h2>4. Hyperlinking to our Content</h2></CCardHeader>
          <CCardBody>
            <p>The following organizations may link to our Website without prior written approval:</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
);

export default TermsAndConditions;
