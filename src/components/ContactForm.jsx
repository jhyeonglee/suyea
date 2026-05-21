// src/components/ContactForm.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const fromName = formData.get('from_name')?.trim();
        const replyTo = formData.get('reply_to')?.trim();
        const message = formData.get('message')?.trim();

        if (!fromName || !replyTo || !message) {
            alert('성함, 연락처, 문의 내용은 필수 입력 사항입니다.');
            return;
        }

        setLoading(true);

        // emailjs.sendForm(서비스ID, 템플릿ID, 폼엘리먼트, 퍼블릭KEY)
        emailjs.sendForm(
            'service_0vn4yx9',
            'template_iaqgul1',
            formRef.current,
            'dfV1qvHvmXhNYCpae'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('문의가 성공적으로 전달되었습니다. 빠르게 연락드리겠습니다!');
                formRef.current.reset(); // 성공 시 입력창 초기화
            }, (error) => {
                console.log('FAILED...', error);
                alert('메일 전송에 실패했습니다. 오류코드: ' + JSON.stringify(error));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <section className="contact" id="contact">
            <div className="contact-inner">

                {/* 💡 누락되었던 회사 정보 좌측 섹션 복원 완료! */}
                <div>
                    <div className="sec-tag">Contact Us</div>
                    <h2 className="sec-title">문의하기</h2>
                    <p className="sec-desc">제품 문의, 견적 요청, A/S 신청 등 무엇이든 연락주세요. 전문 상담원이 빠르게 응대합니다.</p>

                    <div className="contact-info">
                        {/* 전화 문의 */}
                        <div className="info-row">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div className="info-text">
                                <h4>전화 문의</h4>
                                <p>010-4911-6732</p>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div className="info-row">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="info-text">
                                <h4>이메일</h4>
                                <p>info@suyeindustry.co.kr</p>
                            </div>
                        </div>

                        {/* 주소 */}
                        <div className="info-row">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                            </div>
                            <div className="info-text">
                                <h4>주소</h4>
                                <p>경기 수원시 권선구 새터로29번길 59</p>
                            </div>
                        </div>

                        {/* 영업시간 */}
                        <div className="info-row">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div className="info-text">
                                <h4>영업시간</h4>
                                <p>월–금 09:00 ~ 18:00<br /><span style={{ fontSize: '12px', color: 'var(--gray)' }}>긴급 A/S 24시간 접수</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 우측 견적/문의 폼 슬롯 */}
                <div className="contact-form">
                    <h3>견적 / 문의 신청</h3>
                    <form ref={formRef} onSubmit={sendEmail}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>성함</label>
                                <input type="text" name="from_name" placeholder="홍길동" required />
                            </div>
                            <div className="form-group">
                                <label>회사명</label>
                                <input type="text" name="company_name" placeholder="(주)회사명" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>연락처</label>
                                <input type="tel" name="reply_to" placeholder="010-0000-0000" required />
                            </div>
                            <div className="form-group">
                                <label>이메일</label>
                                <input type="email" name="from_email" placeholder="email@company.com" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>문의 유형</label>
                            <select name="inquiry_type">
                                <option value="">선택해 주세요</option>
                                <option value="제품 구매 문의">제품 구매 문의</option>
                                <option value="견적 요청">견적 요청</option>
                                <option value="A/S 신청">A/S 신청</option>
                                <option value="정기 유지보수 계약">정기 유지보수 계약</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>문의 내용</label>
                            <textarea name="message" placeholder="문의하실 내용을 자세히 적어주세요. (필요 모델, 용량, 설치 환경 등)" required></textarea>
                        </div>
                        <button type="submit" className="form-submit" disabled={loading}>
                            {loading ? '보내는 중...' : '문의 보내기'}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactForm;