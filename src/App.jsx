// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { PRODUCTS } from './constants';
import ContactForm from './components/ContactForm';
import { client, urlFor } from './sanity';

function App() {
  // 💡 상태 관리 (회사소개 데이터, 제품 리스트 데이터, 로딩 상태)
  const [aboutData, setAboutData] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 모바일 메뉴 토글용 함수
  const toggleMobileMenu = () => {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.toggle('open');
  };

  const closeMobileMenu = () => {
    const menu = document.querySelector('.mobile-menu');
    if (menu) menu.classList.remove('open');
  };

  // 💡 컴포넌트가 켜질 때 Sanity에서 데이터 동시 수집
  useEffect(() => {
    // about 데이터 최신 1개 + product 데이터 전체 가져오는 GROQ 쿼리
    const aboutQuery = '*[_type == "about"][0]';
    const productsQuery = '*[_type == "product"] | order(_createdAt asc)'; // 등록 순 정렬

    Promise.all([client.fetch(aboutQuery), client.fetch(productsQuery)])
      .then(([about, products]) => {
        setAboutData(about);
        setProductsData(products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity 데이터 연동 실패:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: 'white', background: '#0b111e', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>수예산업 데이터를 불러오는 중...</div>;
  }

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

      {/* 💡 ABOUT (Sanity 연동 완료!) */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-content">
            <div className="sec-tag">About Us</div>
            <h2 className="sec-title">
              {aboutData?.title || 'Atlas Copco\n공식 인증 대리점'}
            </h2>
            <p className="sec-desc">
              수예산업은 스웨덴 글로벌 산업 기업 Atlas Copco의 한국 공식 인증 대리점입니다.
              30년 이상의 경험을 바탕으로 다양한 산업 현장에 최적화된 압축기 솔루션을 제공하고 있습니다.
            </p>
          </div>
          
          {/* 우측 이미지 박스에 Sanity 짤방 투척! */}
          <div className="about-image-box" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {aboutData?.aboutImage ? (
              <img 
                src={urlFor(aboutData.aboutImage).url()} 
                alt="수예산업 전경" 
                className="about-img" 
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
            ) : (
              <div className="fallback-img">이미지를 등록해 주세요.</div>
            )}
          </div>
        </div>
      </section>

      {/* 💡 PRODUCTS (Sanity 연동 완료!) */}
      <section className="products" id="products">
        <div className="products-head">
          <div>
            <div className="sec-tag">Products &amp; Services</div>
            <h2 className="sec-title">제품 및 서비스</h2>
          </div>
        </div>
        <div className="products-grid">
          {productsData.length > 0 ? (
            productsData.map((item) => (
              <div key={item._id} className="product-card">
                <div className="product-img" style={{ backgroundImage: item.productImage ? `url(${urlFor(item.productImage).url()})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', position: 'relative', borderRadius: '8px 8px 0 0' }}>
                  <span className="p-tag">Authorized</span>
                </div>
                <div className="product-body">
                  <h3>{item.name}</h3>  
                  <p>{item.description}</p>
                  <a href="#contact" className="product-link">문의하기</a>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--gray)', gridColumn: '1/-1', textAlign: 'center', padding: '3rem 0' }}>
              등록된 제품이 없습니다. Sanity 관리자 창에서 제품을 추가해 주세요!
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <ContactForm />

      {/* FOOTER */}
      <footer>
        <p className="footer-copy">© 2026 수예산업. All rights reserved. Atlas Copco Authorized Distributor.</p>
      </footer>
    </>
  );
}

export default App;