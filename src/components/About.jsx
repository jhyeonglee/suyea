import React, { useEffect, useState } from 'react';
// 💡 아까 만든 sanity 설정과 이미지 URL 변환 함수를 불러옵니다!
import { client, urlFor } from '../sanity';

const About = () => {
    // 💡 CMS 데이터를 담아둘 State
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 💡 Sanity 전용 쿼리(GROQ):약속한 'about' 타입의 데이터 중 최신 1개만 가져오기
        const query = '*[_type == "about"][0]';

        client.fetch(query)
            .then((data) => {
                setAboutData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Sanity 데이터 로드 실패:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>로딩 중...</div>;

    return (
        <section className="about" id="about">
            <div className="about-inner">

                {/* 좌측: 텍스트 영역 */}
                <div className="about-content">
                    <div className="sec-tag">About Us</div>

                    {/* 💡 CMS에 한줄 타이틀이 있으면 그걸 보여주고, 없으면 기본 텍스트 출력 */}
                    <h2 className="sec-title">
                        {aboutData?.title || '최고의 기술력과 신뢰를 바탕으로 하는 수예산업'}
                    </h2>

                    <p className="about-desc">
                        저희 수예산업은 고효율 스크류 콤프레샤 및 에어 시스템 전문 대리점으로서,
                        철저한 유지보수와 신속한 A/S를 통해 고객사의 생산성 향상에 기여하고 있습니다.
                    </p>
                </div>

                {/* 우측: 이미지 영역 */}
                <div className="about-image-box">
                    {aboutData?.aboutImage ? (
                        // 💡 urlFor().url() 치트키로 Sanity 이미지를 다이렉트로 꽂아넣기!
                        <img
                            src={urlFor(aboutData.aboutImage).url()}
                            alt="수예산업 전경"
                            className="about-img"
                        />
                    ) : (
                        // 혹시 CMS에 이미지가 없을 때 띄워줄 기본 샘플 이미지
                        <div className="fallback-img">이미지를 등록해 주세요.</div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default About;