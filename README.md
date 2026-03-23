# Advanced HR Performance Analytics & Predictive Modeling
**Academic Evaluation Target: 200 Marks**
**Complexity Level: Intermediate Data Analytics**

## Project Executive Summary
This project is an advanced Data Intelligence Dashboard designed to move beyond simple data storage into **Statistical Correlation** and **Predictive Modeling**. It utilizes a decoupled frontend architecture with a centralized Data Processing Engine to analyze workforce efficiency and attrition risk.

---

## Core Analytics Modules

### 1. Predictive Attrition Engine (Machine Learning Heuristics)
The system implements a predictive model that identifies "Retention Risk" by correlating performance ratings against market-adjusted compensation. 
- **Algorithm**: If `Performance ≥ 4.0` AND `Salary < (Global mean * 0.9)`, the subject is flagged as **High Attrition Risk**.
- **Utility**: Allows HR managers to preemptively adjust compensation for high-performing assets before they churn.

### 2. Statistical Correlation Analysis
The engine performs real-time variance analysis between compensation and merit:
- **Pay Variance Calculation**: Calculates the percentage difference between the mean salary of top performers vs. the rest of the workforce.
- **Skew Detection**: Automatically determines if the organization has a **Merit-heavy** or **Flat** compensation structure based on variance thresholds (>20%).

### 3. Multi-Variable Visualization Suite
Utilizes **Chart.js v4+** for high-dimensional data mapping:
- **Revenue vs Performance Matrix (Scatter Plot)**: Maps every employee as a data vector $(x, y)$ where $x$ is Rating and $y$ is Salary. This visualizes the correlation directly.
- **Salary Band Distribution (Histogram)**: Groups the population into Entry, Mid, and Senior tiers for budget analysis.
- **Retention Risk Profile (Pie/Doughnut)**: Provides a holistic view of workforce stability.

### 6. Cohort Analysis Engine
Groups personnel by hire date to track how performance and cultural integration evolve over time (e.g., comparing "Class of 2021" vs. recent hires).

### 7. Pay Equity Audit Module
Statistical analysis of compensation parity across genders and age groups, isolating bias factors to ensure organizational compliance.

### 8. Monte Carlo Attrition Simulation
Uses probabilistic modeling to project the financial impact of talent loss, calculating potential replacement costs based on high-risk employee profiles.

### 9. Organizational Network Analysis (ONA)
Identifies "Hidden Influencers" and knowledge hubs within the organization based on social impact scores and collaborative density.

### 10. Workforce Cost Forecasting
Linear and non-linear cost projections for 12–24 months, factoring in merit increases, growth rates, and attrition-adjusted budget buffers.

---

## Technical Architecture
- **Data Persistence**: HTML5 LocalStorage (v7 - Enterprise Schema).
- **Processing Engine**: Pure JavaScript (ES6+) with statistical functions.
- **UI Architecture**: CSS3 Grid & Flexbox (Responsive 4-column layout).
- **Libraries**: Chart.js (CDN Integrated).

## Data Dictionary
| Variable | Data Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Unique identifier (Primary Key) |
| `name` | String | Subject Identifier |
| `gender` | String | Demographic factor for Equity Audit |
| `hireDate` | Date | Temporal marker for Cohort Analysis |
| `salary` | Float | Quantitative variable (CTC) |
| `impactScore` | Float | Connectivity weight for ONA Hubs |

---

## Usage Instructions
1. Open `index.html` in a web browser.
2. The dashboard automatically initializes with 30 representative samples.
3. Observe the **Monte Carlo**, **Equity Audit**, and **Cohort Trends** modules update in real-time.
