class Router {
    constructor(routes) {
        this.routes = routes;
        this.appContainer = document.getElementById('app');
        window.addEventListener('hashchange', () => this.onHashChange());
        this.onHashChange();
    }

    onHashChange() {
        const hash = window.location.hash || '#/';
        let page = 'landing-page'; // Default page

        for (const route in this.routes) {
            const regex = new RegExp(`^${route.replace(/:(w+)/, '(?<$1>[^/]+)')}$`);
            const match = hash.match(regex);
            if (match) {
                page = this.routes[route];
                this.params = match.groups;
                break;
            }
        }

        this.loadPage(page);
    }

    loadPage(page) {
        this.appContainer.innerHTML = '';
        const pageElement = document.createElement(page);
        pageElement.params = this.params;
        pageElement.classList.add('fade-in');
        this.appContainer.appendChild(pageElement);
    }
}

class LandingPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container text-center">
                <div class="header">
                    <div class="badge" style="display: inline-block; margin-bottom: 1rem;">Premium AI Skin Diagnosis</div>
                    <h1>LUTI</h1>
                    <p style="font-size: 1.1rem; color: var(--text);">당신의 피부를 위한 최고의 선택.<br>AI 정밀 진단부터 맞춤 시술 매칭까지.</p>
                </div>
                <div class="card">
                    <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" alt="Skincare" style="width: 100%; border-radius: var(--radius-sm); margin-bottom: 1rem;">
                    <button id="start-diagnosis">지금 피부 진단 시작하기</button>
                </div>
                <p><a href="#">LUTI 서비스 소개</a></p>
            </div>
        `;
        this.querySelector('#start-diagnosis').addEventListener('click', () => {
            window.location.hash = '#/upload';
        });
    }
}
customElements.define('landing-page', LandingPage);

class PhotoUploadPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <div class="step-indicator">
                    <div class="step active">1</div>
                    <div class="step">2</div>
                    <div class="step">3</div>
                </div>
                <h2>피부 분석 정보 입력</h2>
                <div class="card">
                    <div class="form-group">
                        <label for="image-url">분석할 사진 (URL)</label>
                        <input type="text" id="image-url" placeholder="이미지 주소를 입력하세요">
                    </div>
                    <div class="form-group mt-4">
                        <label for="gender">성별</label>
                        <select id="gender">
                            <option value="F">여성</option>
                            <option value="M">남성</option>
                            <option value="OTHER">기타</option>
                        </select>
                    </div>
                    <div class="form-group mt-4">
                        <label for="birth-year">출생 연도</label>
                        <input type="number" id="birth-year" placeholder="YYYY" value="1995">
                    </div>
                    <button id="analyze-skin" class="mt-4">AI 정밀 분석 시작</button>
                </div>
            </div>
        `;
        this.querySelector('#analyze-skin').addEventListener('click', async () => {
            const imageUrl = this.querySelector('#image-url').value;
            if (!imageUrl) {
                alert('이미지 주소를 입력해주세요.');
                return;
            }

            window.location.hash = '#/analyzing';

            // Mock API call simulation
            await new Promise(resolve => setTimeout(resolve, 3000));
            const diagnosisId = 'LUTI-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            window.location.hash = `#/result/${diagnosisId}`;
        });
    }
}
customElements.define('photo-upload-page', PhotoUploadPage);

class AnalyzingState extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container text-center" style="margin-top: 4rem;">
                <div class="spinner"></div>
                <h2>AI 피부 정밀 분석 중…</h2>
                <p>당신의 피부 상태를 데이터로 변환하고 있습니다.<br>잠시만 기다려주세요.</p>
            </div>
        `;
    }
}
customElements.define('analyzing-state', AnalyzingState);

class ResultSummaryPage extends HTMLElement {
    connectedCallback() {
        const diagnosisId = this.params.id;
        this.innerHTML = `
            <div class="container">
                <div class="step-indicator">
                    <div class="step">1</div>
                    <div class="step active">2</div>
                    <div class="step">3</div>
                </div>
                <h2>진단 결과</h2>
                <div class="card text-center">
                    <div class="badge" style="margin-bottom: 0.5rem;">Diagnosis ID: ${diagnosisId}</div>
                    <div style="font-size: 3rem; font-weight: 800; color: var(--primary);">B+</div>
                    <p>전반적인 피부 상태는 양호하나,<br>모공과 색소 침착 관리가 필요합니다.</p>
                </div>
                <div class="card">
                    <h4>피부 분석 리포트</h4>
                    <canvas id="result-chart" class="result-chart"></canvas>
                </div>
                <button id="show-treatments">맞춤 시술 솔루션 보기</button>
                <button id="re-upload" style="background: var(--secondary); color: var(--text); margin-top: 12px;">다시 측정하기</button>
            </div>
        `;

        const ctx = this.querySelector('#result-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['모공', '주름', '색소', '트러블', '홍조', '탄력'],
                datasets: [{
                    label: '내 피부 점수',
                    data: [65, 59, 40, 81, 56, 75],
                    backgroundColor: 'oklch(70% 0.15 30 / 0.2)',
                    borderColor: 'oklch(70% 0.15 30)',
                    borderWidth: 2,
                    pointBackgroundColor: 'oklch(70% 0.15 30)',
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        this.querySelector('#show-treatments').addEventListener('click', () => {
            window.location.hash = `#/treatments/${diagnosisId}`;
        });
        this.querySelector('#re-upload').addEventListener('click', () => {
            window.location.hash = '#/upload';
        });
    }
}
customElements.define('result-summary-page', ResultSummaryPage);

class TreatmentRecommendationPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <div class="step-indicator">
                    <div class="step">1</div>
                    <div class="step">2</div>
                    <div class="step active">3</div>
                </div>
                <h2>추천 솔루션</h2>
                <div class="card treatment-card">
                    <div>
                        <h3>피코 토닝 (Pico Toning)</h3>
                        <p>색소 침착 및 기미 개선에 효과적인 프리미엄 레이저</p>
                    </div>
                    <div class="badge-container">
                        <span class="badge">통증 낮음</span>
                        <span class="badge">즉시 복귀 가능</span>
                    </div>
                </div>
                <div class="card treatment-card">
                    <div>
                        <h3>시크릿 RF</h3>
                        <p>모공 축소 및 탄력 개선을 위한 고주파 니들링</p>
                    </div>
                    <div class="badge-container">
                        <span class="badge">모공 특화</span>
                        <span class="badge">탄력 개선</span>
                    </div>
                </div>
                <button id="find-hospitals">이 시술 잘하는 병원 추천 받기</button>
            </div>
        `;

        this.querySelector('#find-hospitals').addEventListener('click', () => {
            window.location.hash = `#/hospitals/match-${Math.floor(Math.random()*1000)}`;
        });
    }
}
customElements.define('treatment-recommendation-page', TreatmentRecommendationPage);

class HospitalMatchPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <h2>매칭된 병원</h2>
                <p>LUTI가 엄선한 시술 전문 병원입니다.</p>
                <div class="card hospital-card">
                    <h3>강남 XX 피부과</h3>
                    <p>서울특별시 강남구 테헤란로</p>
                    <div class="badge-container">
                        <span class="badge" style="background: var(--primary); color: white;">추천</span>
                        <span class="badge">색소 전문</span>
                    </div>
                    <button class="book-now">상담 예약하기</button>
                </div>
                 <div class="card hospital-card">
                    <h3>청담 YY 의원</h3>
                    <p>서울특별시 강남구 도산대로</p>
                    <div class="badge-container">
                        <span class="badge">프리미엄</span>
                        <span class="badge">리프팅 전문</span>
                    </div>
                    <button class="book-now" style="background: var(--secondary); color: var(--text);">문의 남기기</button>
                </div>
            </div>
        `;
    }
}
customElements.define('hospital-match-page', HospitalMatchPage);

class MyPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <h2>마이 페이지</h2>
                <div class="card">
                    <h4>내 정보</h4>
                    <p><strong>이름:</strong> 사용자님</p>
                    <p><strong>최근 진단:</strong> 2026-03-12</p>
                </div>
                <div class="card">
                    <h4>진단 기록</h4>
                    <ul>
                        <li><a href="#/result/LUTI-MOCK">LUTI-MOCK (2026-03-12)</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
}
customElements.define('my-page', MyPage);

const routes = {
    '#/': 'landing-page',
    '#/upload': 'photo-upload-page',
    '#/analyzing': 'analyzing-state',
    '#/result/:id': 'result-summary-page',
    '#/treatments/:id': 'treatment-recommendation-page',
    '#/hospitals/:id': 'hospital-match-page',
    '#/mypage': 'my-page'
};

new Router(routes);
