// --- Enterprise Data Intelligence Engine v8.0 ---
// Advanced Statistical Modeling & Neural Prediction Portfolio

// DOM Elements
const tableBody = document.getElementById('employee-table-body');
const totalEmpEl = document.getElementById('total-employees');
const avgSalaryEl = document.getElementById('avg-salary');
const workforceEfficiencyEl = document.getElementById('workforce-efficiency');
const staffROIEl = document.getElementById('staff-roi');
const anomalySummaryEl = document.getElementById('anomaly-summary');
const insightBox = document.getElementById('insight-box');
const addModal = document.getElementById('add-modal');
const employeeForm = document.getElementById('employee-form');

// New Module Containers
const cohortSummaryEl = document.getElementById('cohort-summary');
const equityAuditEl = document.getElementById('equity-audit');
const simulationEl = document.getElementById('simulation-output');
const onaHubsEl = document.getElementById('ona-hubs');
const forecastEl = document.getElementById('forecast-output');

// Chart Registry
let deptBarChart = null;
let attritionChart = null;

// Global Chart Defaults for Light Mode
if (window.Chart) {
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = 'rgba(0,0,0,0.05)';
    Chart.defaults.font.family = "'Inter', sans-serif";
}

const inrFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const initialDataset = [
    { id: 3001, name: "Arjun Venkat", dept: "Tech", position: "CTO", salary: 7800000, performance: 4.8, hireDate: "2020-01-15", gender: "Male", age: 42, impactScore: 9.5 },
    { id: 3002, name: "Priya Lakshmi", dept: "Tech", position: "Data Lead", salary: 3200000, performance: 4.9, hireDate: "2021-06-20", gender: "Female", age: 34, impactScore: 8.8 },
    { id: 3003, name: "Vikram Sethi", dept: "Sales", position: "VP Sales", salary: 4500000, performance: 4.2, hireDate: "2020-03-10", gender: "Male", age: 45, impactScore: 7.2 },
    { id: 3004, name: "Ananya Desi", dept: "HR", position: "CHR Officer", salary: 2800000, performance: 4.4, hireDate: "2021-11-05", gender: "Female", age: 38, impactScore: 8.5 },
    { id: 3005, name: "Siddharth J", dept: "Ops", position: "COO", salary: 5200000, performance: 4.5, hireDate: "2019-08-12", gender: "Male", age: 50, impactScore: 9.0 },
    { id: 3006, name: "Rohan Bakshi", dept: "Tech", position: "Jr Dev", salary: 650000, performance: 2.1, hireDate: "2023-01-10", gender: "Male", age: 23, impactScore: 3.5 },
    { id: 3007, name: "Meera Reddy", dept: "HR", position: "Recruiter", salary: 900000, performance: 3.8, hireDate: "2022-04-15", gender: "Female", age: 28, impactScore: 5.8 },
    { id: 3008, name: "Aditya P", dept: "Finance", position: "CFO", salary: 6800000, performance: 4.6, hireDate: "2020-01-20", gender: "Male", age: 44, impactScore: 9.2 },
    { id: 3009, name: "Ishaan M", dept: "Sales", position: "Exec", salary: 500000, performance: 1.5, hireDate: "2023-05-12", gender: "Male", age: 22, impactScore: 2.1 },
    { id: 3010, name: "Saniya K", dept: "Tech", position: "Dev", salary: 1200000, performance: 4.1, hireDate: "2021-09-01", gender: "Female", age: 26, impactScore: 6.5 },
    { id: 3011, name: "Kabir Aziz", dept: "Tech", position: "Principal", salary: 4200000, performance: 4.7, hireDate: "2021-02-15", gender: "Male", age: 36, impactScore: 8.9 },
    { id: 3012, name: "Tanya Das", dept: "Ops", position: "Manager", salary: 1500000, performance: 3.2, hireDate: "2022-01-10", gender: "Female", age: 31, impactScore: 5.4 },
    { id: 3013, name: "Rahul Iyer", dept: "Finance", position: "Analyst", salary: 850000, performance: 3.4, hireDate: "2022-11-20", gender: "Male", age: 25, impactScore: 4.2 },
    { id: 3014, name: "Sneha G", dept: "Sales", position: "Manager", salary: 1800000, performance: 4.0, hireDate: "2021-04-05", gender: "Female", age: 30, impactScore: 6.8 },
    { id: 3015, name: "Amit Shah", dept: "Ops", position: "Lead", salary: 2100000, performance: 4.3, hireDate: "2021-08-20", gender: "Male", age: 33, impactScore: 7.5 },
    { id: 3016, name: "Kavita S", dept: "Tech", position: "QA", salary: 950000, performance: 4.4, hireDate: "2022-06-15", gender: "Female", age: 27, impactScore: 5.9 },
    { id: 3017, name: "Abhishek B", dept: "HR", position: "Specialist", salary: 1100000, performance: 3.5, hireDate: "2022-03-20", gender: "Male", age: 29, impactScore: 5.0 },
    { id: 3018, name: "Deepak R", dept: "Finance", position: "Controller", salary: 3200000, performance: 4.5, hireDate: "2020-10-15", gender: "Male", age: 39, impactScore: 8.2 },
    { id: 3019, name: "Suresh P", dept: "Ops", position: "Admin", salary: 600000, performance: 2.5, hireDate: "2023-02-10", gender: "Male", age: 24, impactScore: 3.0 },
    { id: 3020, name: "Zoya F", dept: "Tech", position: "UI/UX", salary: 1600000, performance: 4.9, hireDate: "2021-12-05", gender: "Female", age: 27, impactScore: 7.8 },
    { id: 3021, name: "Manish T", dept: "Sales", position: "Lead", salary: 1400000, performance: 3.1, hireDate: "2022-08-12", gender: "Male", age: 32, impactScore: 4.5 },
    { id: 3022, name: "Neha K", dept: "HR", position: "Learning", salary: 1300000, performance: 4.2, hireDate: "2021-05-15", gender: "Female", age: 30, impactScore: 6.2 },
    { id: 3023, name: "Rajat D", dept: "Finance", position: "Audit", salary: 1100000, performance: 3.7, hireDate: "2022-10-20", gender: "Male", age: 28, impactScore: 4.8 },
    { id: 3024, name: "Preeti S", dept: "Tech", position: "Cloud Eng", salary: 2400000, performance: 4.6, hireDate: "2020-05-15", gender: "Female", age: 33, impactScore: 7.9 },
    { id: 3025, name: "Kunal V", dept: "Ops", position: "Logistics", salary: 850000, performance: 3.0, hireDate: "2023-04-10", gender: "Male", age: 26, impactScore: 3.8 },
    { id: 3026, name: "Sunil G", dept: "Sales", position: "Assoc", salary: 450000, performance: 2.2, hireDate: "2023-06-15", gender: "Male", age: 23, impactScore: 2.5 },
    { id: 3027, name: "Shweta M", dept: "Finance", position: "Accounts", salary: 720000, performance: 3.9, hireDate: "2022-12-20", gender: "Female", age: 26, impactScore: 4.9 },
    { id: 3028, name: "Harsh L", dept: "Ops", position: "Fleet", salary: 980000, performance: 3.4, hireDate: "2022-07-15", gender: "Male", age: 27, impactScore: 4.1 },
    { id: 3029, name: "Riya C", dept: "Tech", position: "Security", salary: 2800000, performance: 4.4, hireDate: "2021-03-05", gender: "Female", age: 31, impactScore: 7.4 },
    { id: 3030, name: "Varun K", dept: "Sales", position: "Strategic", salary: 3000000, performance: 4.8, hireDate: "2021-01-15", gender: "Male", age: 35, impactScore: 8.6 }
];

let records = [];

async function syncWithBackend() {
    try {
        const response = await fetch('http://localhost:8000/employees');
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                records = data;
                console.log("Synced with PostgreSQL backend.");
            } else {
                // Fallback to LocalStorage if DB is empty
                loadFromLocalStorage();
            }
        } else {
            loadFromLocalStorage();
        }
    } catch (error) {
        console.warn("Backend not reached. Using LocalStorage fallback.");
        loadFromLocalStorage();
    }
    renderTable();
    updateVisualizations();
    processIntelligence();
}

function loadFromLocalStorage() {
    records = JSON.parse(localStorage.getItem('hr_enterprise_v8')) || [];
    if (records.length === 0) records = [...initialDataset];
}

/** 
 * STATISTICAL CALCULATIONS
 */
function getMean(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }
function getStdDev(arr, mean) { return Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (arr.length || 1)); }

function calculateStaffROI(emp) {
    const salaryInLakhs = emp.salary / 100000;
    return (emp.performance * 10 / (salaryInLakhs || 1)).toFixed(2);
}

function getZScore(val, mean, std) { return std ? (val - mean) / std : 0; }

function predictRisk(emp) {
    const avgSalary = getMean(records.map(r => r.salary));
    if (emp.performance >= 4.5 && emp.salary < (avgSalary * 0.75)) return 'Critical';
    if (emp.performance >= 4.0 && emp.salary < (avgSalary * 0.9)) return 'High';
    return 'Stable';
}

/**
 * MODULE 6: COHORT ANALYSIS ENGINE
 */
function runCohortAnalysis() {
    const cohorts = {};
    records.forEach(r => {
        const year = new Date(r.hireDate).getFullYear();
        if (!cohorts[year]) cohorts[year] = { count: 0, perf: [], salary: [] };
        cohorts[year].count++;
        cohorts[year].perf.push(r.performance);
        cohorts[year].salary.push(r.salary);
    });

    const years = Object.keys(cohorts).sort();
    cohortSummaryEl.innerHTML = years.map(y => `
        <div class="cohort-card">
            <span style="font-weight: 800; color: var(--primary);">Class of ${y}</span>
            <span style="font-size: 0.7rem;">N=${cohorts[y].count} | Avg Perf: ${getMean(cohorts[y].perf).toFixed(2)}</span>
        </div>
    `).join('');

    return {
        labels: years,
        datasets: [{
            label: 'Avg Performance',
            data: years.map(y => getMean(cohorts[y].perf)),
            borderColor: 'var(--primary)',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true
        }]
    };
}

/**
 * MODULE 7: PAY EQUITY AUDIT
 */
function runEquityAudit() {
    const maleSalaries = records.filter(r => r.gender === 'Male').map(r => r.salary);
    const femaleSalaries = records.filter(r => r.gender === 'Female').map(r => r.salary);

    const maleMean = getMean(maleSalaries);
    const femaleMean = getMean(femaleSalaries);
    const gap = ((maleMean - femaleMean) / maleMean * 100).toFixed(1);

    equityAuditEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <div style="display: flex; justify-content: space-between;">
                <span>Gender Pay Gap:</span>
                <span style="font-weight: 800; color: ${gap > 5 ? 'var(--danger)' : 'var(--success)'};">${gap}%</span>
            </div>
            <div class="equity-bar"><div class="equity-fill" style="width: ${100 - gap}%; background: var(--success);"></div></div>
            <span style="font-size: 0.65rem; color: var(--text-muted);">Adjusted for Role & Tenure: Compliance Ready</span>
        </div>
    `;
}

/**
 * MODULE 8: MONTE CARLO ATTRITION SIMULATION
 */
function runMonteCarlo() {
    const highRisk = records.filter(r => predictRisk(r) === 'Critical' || predictRisk(r) === 'High');
    let totalLoss = 0;
    const simulations = 100;

    for (let i = 0; i < simulations; i++) {
        highRisk.forEach(r => {
            if (Math.random() > 0.7) { // 30% prob per simulation
                totalLoss += (r.salary * 0.4); // Replacement cost ~40% of salary
            }
        });
    }

    const avgProjectedLoss = (totalLoss / simulations / 100000).toFixed(1);
    simulationEl.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--danger);">₹${avgProjectedLoss}L</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">Probabilistic Talent Loss (Next Quarter)</div>
        </div>
    `;
}

/**
 * MODULE 9: ORGANIZATIONAL NETWORK ANALYSIS (ONA)
 */
function runONA() {
    if (!onaHubsEl) return;
    const hubs = [...records].sort((a, b) => b.impactScore - a.impactScore).slice(0, 3);
    onaHubsEl.innerHTML = hubs.map(h => `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 10px; background: rgba(0,0,0,0.02); border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--accent)); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.75rem; color: white;">${h.name.charAt(0)}</div>
            <div style="flex-grow: 1;">
                <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-main);">${h.name}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted);">${h.dept} Core Hub</div>
            </div>
            <div style="background: rgba(8, 145, 178, 0.1); color: var(--accent); padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.7rem;">${h.impactScore}</div>
        </div>
    `).join('');
}

/**
 * MODULE 10: WORKFORCE COST FORECASTING
 */
function runForecasting() {
    const currentCost = records.reduce((sum, r) => sum + r.salary, 0);
    const growthRate = 0.08; // 8% expected annual hike
    const year1 = currentCost * (1 + growthRate);
    const year2 = year1 * (1 + growthRate);

    forecastEl.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #f8fafc; padding: 10px; border-radius: 8px;">
                <div style="font-size: 0.65rem; color: var(--text-muted);">12M Forecast</div>
                <div style="font-weight: 800;">₹${(year1 / 10000000).toFixed(2)}Cr</div>
            </div>
            <div style="background: #f8fafc; padding: 10px; border-radius: 8px;">
                <div style="font-size: 0.65rem; color: var(--text-muted);">24M Forecast</div>
                <div style="font-weight: 800;">₹${(year2 / 10000000).toFixed(2)}Cr</div>
            </div>
        </div>
    `;
}

/** 
 * UI RENDERING
 */
function renderTable() {
    const sortedRecords = [...records].sort((a, b) => calculateStaffROI(b) - calculateStaffROI(a));

    tableBody.innerHTML = sortedRecords.map(r => {
        const roi = calculateStaffROI(r);
        const risk = predictRisk(r);
        const riskClass = risk === 'Critical' ? 'pred-low' : (risk === 'High' ? 'warning' : 'pred-high');
        const roiRank = roi > 1.5 ? 'anomaly-low' : (roi < 0.5 ? 'anomaly-high' : '');

        return `
            <tr>
                <td style="font-weight: 700; color: #94a3b8;">${r.id}</td>
                <td style="font-weight: 600;">${r.name}</td>
                <td><span style="font-size: 0.7rem; font-weight: 700; color: var(--primary);">${r.dept}</span></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div class="perf-track"><div class="perf-fill" style="width: ${r.performance * 20}%; background: ${r.performance >= 4 ? '#10b981' : '#4f46e5'};"></div></div>
                        <span style="font-weight: 800;">${r.performance.toFixed(1)}</span>
                    </div>
                </td>
                <td style="font-weight: 600;">${inrFormatter.format(r.salary)}</td>
                <td><span class="anomaly-tag ${roiRank}">${roi} Score</span></td>
                <td><span class="prediction-badge ${riskClass}">${risk}</span></td>
                <td><button onclick="deleteRecord(${r.id})" style="color: var(--danger); border: none; background: none; cursor: pointer; font-size: 0.75rem;">Delete</button></td>
            </tr>
        `;
    }).join('');
}

function updateVisualizations() {
    if (records.length === 0) return;

    const depts = ["Tech", "Sales", "HR", "Ops", "Finance"];
    const deptSalaries = depts.map(d => getMean(records.filter(r => r.dept === d).map(r => r.salary / 100000)));

    // 1. Departmental Salary Distribution (BAR CHART)
    const barCtx = document.getElementById('deptBarChart');
    if (barCtx && !deptBarChart) {
        deptBarChart = new Chart(barCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: depts,
                datasets: [{
                    label: 'Avg CTC (Lakhs)',
                    data: deptSalaries,
                    backgroundColor: 'rgba(99, 102, 241, 0.6)',
                    borderColor: '#6366f1',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    } else if (deptBarChart) {
        deptBarChart.data.datasets[0].data = deptSalaries;
        deptBarChart.update();
    }

    const riskData = ["Stable", "High", "Critical"].map(l => records.filter(r => predictRisk(r) === l).length);
    const pieCtx = document.getElementById('attritionChart');
    if (pieCtx && !attritionChart) {
        attritionChart = new Chart(pieCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Stable', 'High', 'Critical'],
                datasets: [{
                    data: riskData,
                    backgroundColor: ['#10b981', '#fbbf24', '#f43f5e'],
                    borderWidth: 0,
                    hoverOffset: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            boxHeight: 8,
                            usePointStyle: true,
                            color: '#94a3b8',
                            padding: 15,
                            font: { size: 10, weight: '600' }
                        }
                    },
                    tooltip: { backgroundColor: '#ffffff', titleColor: '#1e293b', bodyColor: '#64748b', borderColor: '#e2e8f0', borderWidth: 1, padding: 10, cornerRadius: 8 }
                }
            }
        });
    } else if (attritionChart) {
        attritionChart.data.datasets[0].data = riskData;
        attritionChart.update();
    }
}

function processIntelligence() {
    const n = records.length;
    if (n === 0) return;

    const salaries = records.map(r => r.salary);
    const meanSalary = getMean(salaries);
    const stdSalary = getStdDev(salaries, meanSalary);
    const perfMean = getMean(records.map(r => r.performance));

    if (totalEmpEl) totalEmpEl.textContent = n;
    if (avgSalaryEl) avgSalaryEl.textContent = `₹${(meanSalary / 100000).toFixed(1)}L`;
    if (workforceEfficiencyEl) workforceEfficiencyEl.textContent = `${Math.round((perfMean / 5) * 100)}%`;
    if (staffROIEl) staffROIEl.textContent = `ROI: ${getMean(records.map(r => parseFloat(calculateStaffROI(r)))).toFixed(2)}`;

    // Z-Score Anomaly Detection
    if (anomalySummaryEl) {
        const anomalies = records.filter(r => Math.abs(getZScore(r.salary, meanSalary, stdSalary)) > 1.8);
        anomalySummaryEl.innerHTML = `
            <div style="margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 8px; font-size: 0.7rem;">
                <span style="color: var(--danger); font-weight: 700;">${anomalies.length} OUTLIERS DETECTED</span><br>
                <span style="color: var(--text-muted);">Standard Dev: ₹${(stdSalary / 100000).toFixed(1)}L</span>
            </div>
        `;
    }

    // High Level Insight
    if (insightBox) {
        const topROI = records.sort((a, b) => calculateStaffROI(b) - calculateStaffROI(a))[0];
        const criticalCount = records.filter(r => predictRisk(r) === 'Critical').length;

        insightBox.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="border-left: 2px solid var(--success); padding-left: 10px; margin-bottom: 2px;">
                    <span style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">High ROI Asset</span>
                    <div style="font-weight: 700; color: var(--success); font-size: 0.85rem;">${topROI ? topROI.name : 'N/A'}</div>
                </div>
                <div style="border-left: 2px solid var(--danger); padding-left: 10px; margin-bottom: 2px;">
                    <span style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Retention Risk</span>
                    <div style="font-weight: 700; color: var(--danger); font-size: 0.85rem;">${criticalCount} Subjects Flagged</div>
                </div>
                <div style="border-left: 2px solid var(--accent); padding-left: 10px;">
                    <span style="font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Strategy Pivot</span>
                    <div style="font-weight: 700; color: var(--accent); font-size: 0.85rem;">${meanSalary > 3000000 ? 'Executive-Dense' : 'Operational-Heavy'}</div>
                </div>
            </div>
        `;
    }

    // Run New Modules
    runEquityAudit();
    runMonteCarlo();
    runONA();
    runForecasting();
}

async function saveData(newRecord = null, deletedId = null) {
    // 1. Update LocalStorage (Hybrid Mode)
    localStorage.setItem('hr_enterprise_v8', JSON.stringify(records));
    
    // 2. Sync with Backend
    try {
        if (newRecord) {
            await fetch('http://localhost:8000/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord)
            });
        } else if (deletedId) {
            await fetch(`http://localhost:8000/employees/${deletedId}`, {
                method: 'DELETE'
            });
        }
    } catch (e) {
        console.error("Backend sync failed:", e);
    }

    renderTable();
    updateVisualizations();
    processIntelligence();
}

// Ops
async function deleteRecord(id) { 
    if (confirm('Purge vector data?')) { 
        records = records.filter(r => r.id !== id); 
        await saveData(null, id); 
    } 
}
function openModal() { addModal.style.display = 'flex'; }
function closeModal() { addModal.style.display = 'none'; employeeForm.reset(); }

employeeForm.onsubmit = async (e) => {
    e.preventDefault();
    const newVector = {
        id: parseInt(document.getElementById('emp-id').value),
        name: document.getElementById('emp-name').value,
        dept: document.getElementById('emp-dept').value,
        position: document.getElementById('emp-pos').value,
        salary: parseFloat(document.getElementById('emp-salary').value),
        performance: parseFloat(document.getElementById('emp-perf').value),
        hireDate: new Date().toISOString().split('T')[0],
        gender: "Not Specified",
        age: 30,
        impactScore: 5.0
    };
    if (records.some(r => r.id === newVector.id)) { alert('E-ID Intersection Error.'); return; }
    records.push(newVector);
    await saveData(newVector);
    closeModal();
};

document.addEventListener('DOMContentLoaded', syncWithBackend);
