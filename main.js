
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
        this.appContainer.appendChild(pageElement);
    }
}

class LandingPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container text-center">
                <div class="header">
                    <h1>AI 피부 진단 & 맞춤 시술 · 병원 매칭</h1>
                    <p>Upload your selfie, get AI skin diagnosis, recommended treatments, and matching clinics.</p>
                </div>
                <button id="start-diagnosis">지금 피부 진단 시작하기</button>
                <p><a href="#">서비스 소개</a></p>
            </div>
        `;
        document.getElementById('start-diagnosis').addEventListener('click', () => {
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
                <h2>Upload Photo</h2>
                <div class="form-group">
                    <label for="image-url">Image URL</label>
                    <input type="text" id="image-url" placeholder="Enter image URL">
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender">
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="birth-year">Birth Year</label>
                    <input type="number" id="birth-year" placeholder="YYYY">
                </div>
                <button id="analyze-skin">AI로 분석하기</button>
            </div>
        `;
        document.getElementById('analyze-skin').addEventListener('click', async () => {
            const imageUrl = document.getElementById('image-url').value;
            if (!imageUrl) {
                alert('Please enter an image URL.');
                return;
            }

            window.location.hash = '#/analyzing';

            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 3000));
            const diagnosisId = 'mock-diagnosis-id';
            window.location.hash = `#/result/${diagnosisId}`;
        });
    }
}
customElements.define('photo-upload-page', PhotoUploadPage);

class AnalyzingState extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container text-center">
                <h2>AI가 당신의 피부를 분석 중입니다…</h2>
                <p>보통 5~10초 정도 소요됩니다.</p>
                <div class="spinner"></div>
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
                <h2>Diagnosis Result: ${diagnosisId}</h2>
                <div class="card">
                    <img src="https://via.placeholder.com/150" alt="User Photo">
                    <p><strong>Skin Type:</strong> Oily</p>
                    <p><strong>Overall Grade:</strong> B</p>
                </div>
                <div class="card">
                    <h4>Skin Scores</h4>
                    <canvas id="result-chart" class="result-chart"></canvas>
                </div>
                <button id="show-treatments">맞춤 시술 추천 보기</button>
                <button id="re-upload">다시 촬영하기</button>
            </div>
        `;

        const ctx = document.getElementById('result-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Pore', 'Wrinkle', 'Pigment', 'Acne', 'Redness', 'Elasticity'],
                datasets: [{
                    label: 'Skin Score',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: 'rgba(255, 140, 107, 0.2)',
                    borderColor: 'rgba(255, 140, 107, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });


        document.getElementById('show-treatments').addEventListener('click', () => {
            window.location.hash = `#/treatments/${diagnosisId}`;
        });
        document.getElementById('re-upload').addEventListener('click', () => {
            window.location.hash = '#/upload';
        });
    }
}
customElements.define('result-summary-page', ResultSummaryPage);

class TreatmentRecommendationPage extends HTMLElement {
    connectedCallback() {
        const diagnosisId = this.params.id;
        this.innerHTML = `
            <div class="container">
                <h2>Recommended Treatments for ${diagnosisId}</h2>
                <div class="treatment-card">
                    <h3>Pico Laser</h3>
                    <p>Main Target: Pigment</p>
                    <div class="badge-container">
                        <span class="badge">Downtime: LOW</span>
                        <span class="badge">Pain: LOW</span>
                        <span class="badge">Price: MID</span>
                    </div>
                    <p>A popular laser treatment for pigmentation issues.</p>
                </div>
                <div class="treatment-card">
                    <h3>Secret RF</h3>
                    <p>Main Target: Pore</p>
                    <div class="badge-container">
                        <span class="badge">Downtime: MID</span>
                        <span class="badge">Pain: MID</span>
                        <span class="badge">Price: HIGH</span>
                    </div>
                    <p>Microneedling with radiofrequency for pore tightening.</p>
                </div>
                <button id="find-hospitals">이 시술 잘하는 병원 추천 받기</button>
            </div>
        `;

        document.getElementById('find-hospitals').addEventListener('click', () => {
            const matchId = 'mock-match-id';
            window.location.hash = `#/hospitals/${matchId}`;
        });
    }
}
customElements.define('treatment-recommendation-page', TreatmentRecommendationPage);

class HospitalMatchPage extends HTMLElement {
    connectedCallback() {
        const matchId = this.params.id;
        this.innerHTML = `
            <div class="container">
                <h2>Recommended Hospitals for Match ${matchId}</h2>
                <div class="form-group">
                    <label for="region">Region</label>
                    <select id="region">
                        <option>Seoul Gangnam-gu</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="price">Price Level</label>
                    <select id="price">
                        <option>MID</option>
                    </select>
                </div>
                <div class="hospital-card">
                    <h3>XX Dermatology</h3>
                    <p>Type: DERMATOLOGY</p>
                    <p>Region: Seoul Gangnam-gu</p>
                    <p>Main Strength: Pigment</p>
                    <div class="badge-container">
                        <span class="badge">Price: MID</span>
                    </div>
                    <button class="book-now">예약 / 문의 남기기</button>
                </div>
                 <div class="hospital-card">
                    <h3>YY Clinic</h3>
                    <p>Type: PLASTIC_SURGERY</p>
                    <p>Region: Seoul Gangnam-gu</p>
                    <p>Main Strength: Lifting</p>
                    <div class="badge-container">
                        <span class="badge">Price: HIGH</span>
                    </div>
                    <button class="book-now">예약 / 문의 남기기</button>
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
                <h2>My Page</h2>
                <div class="card">
                    <h4>Profile</h4>
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Gender:</strong> Male</p>
                    <p><strong>Birth Year:</strong> 1990</p>
                </div>
                <div class="card">
                    <h4>My Diagnoses</h4>
                    <ul>
                        <li><a href="#/result/mock-diagnosis-id">mock-diagnosis-id</a></li>
                    </ul>
                </div>
                <div class="card">
                    <h4>My Bookings</h4>
                    <p>No bookings yet.</p>
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
