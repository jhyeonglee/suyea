// src/App.jsx
import React from 'react';
import './App.css';
import { PRODUCTS } from './constants';
import ContactForm from './components/ContactForm';

function App() {
  // 모바일 메뉴 토글용 함수 (나중에 상태 관리로 고도화해도 좋아!)
  const toggleMobileMenu = () => {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.toggle('open');
  };

  const closeMobileMenu = () => {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.remove('open');
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          <div className="logo-ac">ATLAS COPCO<span>공식 대리점</span></div>
          <div className="logo-sep"></div>
          <span className="logo-company">수예산업</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">회사 소개</a></li>
          <li><a href="#products">제품/서비스</a></li>
          <li><a href="#gallery">갤러리</a></li>
          <li><a href="#contact">문의</a></li>
        </ul>
        <a href="#contact" className="nav-cta">견적 문의</a>
        <button className="hamburger" onClick={toggleMobileMenu} aria-label="메뉴">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* 모바일 메뉴 */}
      <div className="mobile-menu">
        <a href="#about" onClick={closeMobileMenu}>회사 소개</a>
        <a href="#products" onClick={closeMobileMenu}>제품/서비스</a>
        <a href="#gallery" onClick={closeMobileMenu}>갤러리</a>
        <a href="#contact" onClick={closeMobileMenu}>문의하기</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-lines"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
        <div className="hero-badge">Atlas Copco Authorized Distributor</div>
        <h1>COMPRESSED<br /><span className="blue">AIR</span><br />SOLUTIONS</h1>
        <p className="hero-desc">
          수예산업은 Atlas Copco의 공식 인증 대리점으로,<br />
          산업용 압축기 및 에너지 솔루션을 공급합니다.<br />
          최고의 기술력과 신뢰할 수 있는 서비스를 제공합니다.
        </p>
        <div className="hero-btns">
          <a href="#products" className="btn-blue">제품 보기</a>
          <a href="#contact" className="btn-ghost">견적 문의하기</a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-content">
            <div className="sec-tag">About Us</div>
            <h2 className="sec-title">Atlas Copco<br />공식 인증 대리점</h2>
            <p className="sec-desc">
              수예산업은 스웨덴 글로벌 산업 기업 Atlas Copco의 한국 공식 인증 대리점입니다.
              30년 이상의 경험을 바탕으로 다양한 산업 현장에 최적화된 압축기 솔루션을 제공하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="products">
        <div className="products-head">
          <div>
            <div className="sec-tag">Products &amp; Services</div>
            <h2 className="sec-title">제품 및 서비스</h2>
          </div>
        </div>
        <div className="products-grid">
          {PRODUCTS.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-img">
                <span className="p-tag">{item.tag}</span>
              </div>
              <div className="product-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href="#contact" className="product-link">문의하기</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <ContactForm />

      {/* FOOTER */}
      <footer>
        <p className="footer-copy">© 2025 수예산업. All rights reserved. Atlas Copco Authorized Distributor.</p>
      </footer>
    </>
  );
}

export default App;