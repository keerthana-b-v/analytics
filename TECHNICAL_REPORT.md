# Enterprise Data Intelligence Engine (v8.0) - Technical Documentation

---

## 🚀 Overview

The **Enterprise Data Intelligence Engine** is a high-performance HR analytics platform designed to move beyond simple record-keeping into the realm of **Predictive Personnel Modeling**. It utilizes multi-variant statistical analysis to provide real-time insights into workforce efficiency, attrition risks, and organizational health.

Unlike a standard HR tool that just stores employee names and salaries, this project acts like a **smart data analyst** — it watches performance trends, detects salary anomalies, predicts who might quit, and projects future workforce costs, all in real-time.

---

## 🛠 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Foundation** | HTML5 Semantic Architecture | Scalable & Accessible Document Object Model |
| **Logic** | Vanilla JavaScript (ES2023) | High-speed data processing & state management |
| **Aesthetics** | CSS3 Variable-driven System | "Glassmorphism" UI with dark/light themes |
| **Visualization** | Chart.js 4.x | Neural-optimized graphical rendering |
| **Persistence** | HTML5 LocalStorage | Versioned (v8.0) client-side data buffering |
| **Backend (Ready)** | FastAPI / PostgreSQL | Scalable REST API & Relational Database layer |

---

## 🧠 Core Analytical Modules

### 1. **"Flight Risk" Prediction — Who Might Quit? (Attrition Engine)**
The system looks at every employee's **performance rating** and their **salary**. If someone is doing an amazing job but is being paid less than the company average, the system automatically flags them as a **"High Attrition Risk"** — meaning they are likely to quit for a better-paying job elsewhere. This gives HR managers a chance to give them a raise *before* they leave.

- **Algorithm**: If `Performance ≥ 4.5` AND `Salary < (Global Mean * 0.75)` → **Critical Risk**
- **Algorithm**: If `Performance ≥ 4.0` AND `Salary < (Global Mean * 0.90)` → **High Risk**
- **Utility**: Proactive retention management before talent churn occurs.

---

### 2. **Pay Fairness & Anomaly Detection (Z-Score Analysis)**
The system checks if everyone is being paid fairly compared to their peers. It uses a standard statistical formula called a **Z-Score** to detect outliers — people being paid *way too much* or *way too little* compared to their department.

- **Math**: `z = (x - μ) / σ` — where `x` is the individual salary, `μ` is the mean, and `σ` is the standard deviation.
- **Output**: Flags all employees whose salary is more than **1.8 standard deviations** away from the mean as outliers.
- **Utility**: Allows HR to identify billing errors, merit adjustment candidates, or cost-cutting opportunities.

---

### 3. **Key People Finder — Organizational Network Analysis (ONA)**
The system tries to figure out who the **"Informal Leaders"** or **"Knowledge Hubs"** of the company are. These are people who may not be official managers, but who hold critical knowledge or have high influence across teams.

- **Metric**: Every employee has an `impactScore` (0–10) representing their organizational connectivity and influence weight.
- **Output**: The top 3 highest-scoring employees are displayed as **Influencer Hubs**.
- **Utility**: Warns leadership that losing these specific people would have an outsized and disproportionate impact on overall productivity and team cohesion.

---

### 4. **Gender Pay Gap & Equity Audit**
The system automatically runs a pay equity analysis separated by gender across the entire workforce dataset.

- **Calculation**: Computes the mean salary for Male vs. Female employees and calculates the percentage gap.
- **Output**: Displays a gender pay gap percentage with a visual progress bar. A gap over **5%** is highlighted in red (danger), otherwise green (compliant).
- **Utility**: Helps organizations achieve pay equality compliance and identify systemic compensation bias.

---

### 5. **Monte Carlo Attrition Simulation**
Instead of giving a simple yes/no risk flag, the engine runs a **probabilistic simulation** (100 iterations) to project the **estimated financial cost** of potential talent loss in the next quarter.

- **Logic**: For each high-risk employee, there is a 30% probability (per simulation run) that they leave. The replacement cost is estimated at **~40% of their annual salary**.
- **Output**: Displays a projected talent loss figure in Indian Rupees (Lakhs).
- **Utility**: Turns vague "flight risk" flags into a concrete, board-presentable **financial impact number**.

---

### 6. **Cohort Analysis Engine — "Hire Class" Performance**
The system groups all employees by their year of joining (their "hire class") and tracks how their performance and salaries have evolved over time.

- **Example**: Compare "Class of 2020" vs. "Class of 2023" in terms of average performance rating.
- **Output**: Displays summary cards for each hire year with headcount and average performance.
- **Utility**: Detects "Burnout Trends" and evaluates whether training and onboarding programs are improving over time.

---

### 7. **Workforce Cost Forecasting (12 & 24 Months)**
The system projects the company's total salary bill for the next 1–2 years by applying a fixed **8% annual growth rate** (representing standard merit hikes) to the current total payroll.

- **Formula**: `Year1 = CurrentCost × 1.08`, `Year2 = Year1 × 1.08`
- **Output**: Displays projected 12-Month and 24-Month workforce costs in Crores (₹Cr).
- **Utility**: Enables CFOs and finance teams to proactively budget for workforce expansion.

---

### 8. **Staff ROI Calculator**
Every employee is assigned an **ROI (Return on Investment) Score** that measures how much performance value the company gets per Lakh of salary spent.

- **Formula**: `ROI = (Performance × 10) / Salary_in_Lakhs`
- **Output**: Employees are ranked by ROI in the main table. High-ROI employees are highlighted as "anomaly-low" (efficient), while low-ROI entries are flagged as "anomaly-high" (expensive).
- **Utility**: Identifies the most cost-effective employees and flags overpaid underperformers.

---

## 📊 Visual Intelligence Layers

### **Departmental Asset Distribution (Bar Chart)**
Visualizes the **average salary investment per business vertical** (Tech, Sales, HR, Ops, Finance).
- **Context**: Helps leadership rebalance talent budgets. For example, if the Tech department average CTC is ₹30L but Sales is ₹5L, this may signal under-investment in a revenue-generating function.

### **Talent Stability Index (Doughnut Chart)**
A high-impact, at-a-glance view of the **overall workforce risk profile**.
- **Segments**: `Stable` (Green) | `High Risk` (Amber) | `Critical` (Red)
- **Context**: Provides a simple executive summary of how stable or volatile the workforce is at any given moment.

---

## 🗄️ How the Database Works — Full Explanation

This project has **two completely separate data storage systems** that are not connected to each other. Understanding the difference is important.

---

### Mode 1: ACTIVE — Browser LocalStorage (Frontend Mode)

When you open `index.html` in your web browser, **no traditional database is being used at all**. Instead, the data is stored directly inside the web browser using a built-in feature called **HTML5 LocalStorage**.

Here is exactly how it works, step by step:

1. **Baseline Dataset**: The `index.js` file itself contains a hardcoded `initialDataset` array with **30 pre-built sample employee records** (e.g., "Arjun Venkat", "Priya Lakshmi", "Vikram Sethi", etc.) complete with salaries, performance ratings, departments, hire dates, and impact scores.

2. **First Load**: When the page loads for the very first time, JavaScript checks your browser's LocalStorage for a key called `hr_enterprise_v8`. If it finds nothing (meaning you're a new user), it loads those 30 default employees and saves them.
    ```javascript
    let records = JSON.parse(localStorage.getItem('hr_enterprise_v8')) || [];
    if (records.length === 0) records = [...initialDataset];
    ```

3. **Saving Changes**: Whenever you add a new employee or delete one, the JavaScript `saveData()` function immediately writes the updated list back to LocalStorage using `localStorage.setItem()`.

4. **The Critical Limitation**: Because the data lives only inside *your specific browser installation*, it will be **completely lost and reset to the default 30 employees** if you:
    - Open the page in an Incognito / Private window
    - Switch to a different browser (e.g., from Chrome to Firefox)
    - Clear your browser's cache or site data
    - Open the page from a different computer

This mode requires **zero server setup** and works immediately by just opening `index.html`.

---

### Mode 2: READY (Not Active) — Python + PostgreSQL Backend

The project folder also contains three Python files that form a complete, professional-grade backend database system. **This system is currently NOT connected to the website frontend**, but it is fully built and ready to be activated.

| File | Role |
| :--- | :--- |
| `database.py` | Connects to PostgreSQL and creates the `emp` database and `employees` table if they don't exist. |
| `main.py` | A command-line interface (CLI) menu to Add, Remove, Promote, and Display employees directly via the terminal. |
| `api.py` | A FastAPI web server that exposes REST API endpoints, allowing future web clients to interact with the database over HTTP. |

#### How `database.py` works:
- Connects to your local **PostgreSQL** server using the `psycopg2` library.
- Default credentials: `user=postgres`, `password=password`, `host=localhost`, `port=5432`.
- First checks if a database named **`emp`** already exists. If not, it creates it automatically.
- Inside the `emp` database, it creates an `employees` table with these columns:

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT (Primary Key) | Unique Employee ID |
| `name` | VARCHAR(255) | Full Name |
| `position` | VARCHAR(255) | Job Title |
| `salary` | FLOAT | Annual CTC |

#### How `main.py` works:
Running `python main.py` in the terminal opens an **interactive menu** where you can:
1. **Add Employee** — Input ID, Name, Position, Salary
2. **Remove Employee** — Delete by ID
3. **Promote Employee** — Increase salary by a specified amount
4. **Display Employees** — Print the full employee table
5. **Exit**

#### How `api.py` works:
Running `python api.py` starts a **FastAPI** server at `http://localhost:8000`. It provides these REST endpoints:

| Method | Endpoint | Action |
| :--- | :--- | :--- |
| `GET` | `/employees` | Fetch all employees from PostgreSQL |
| `POST` | `/employees` | Add a new employee |
| `DELETE` | `/employees/{id}` | Delete an employee by ID |
| `PATCH` | `/employees/{id}/promote` | Increase an employee's salary |

CORS (Cross-Origin Resource Sharing) is already enabled, meaning the frontend website would be able to call these API endpoints without any browser security errors once connected.

---

### Summary: Which Database is Being Used Right Now?

| System | Status | Storage Location | Requires Setup? |
| :--- | :--- | :--- | :--- |
| Browser LocalStorage | ✅ **ACTIVE** | Inside your web browser | ❌ No setup needed |
| Python + PostgreSQL | 🔵 **READY** | PostgreSQL database server | ✅ Requires PostgreSQL installed & running |

The two systems exist independently. To connect the Python backend to the HTML frontend, the `index.js` file would need to be updated to `fetch()` data from the FastAPI API (`http://localhost:8000/employees`) instead of reading from LocalStorage.

---

## 📁 System Architecture (File Map)

| File | Purpose |
| :--- | :--- |
| `index.html` | Master 12-column grid layout. Contains all UI cards, the employee table, the modal form, and chart canvases. |
| `index.js` | Central controller. Handles all math engines (Z-Score, Monte Carlo, ROI, ONA, Forecasting), Chart.js lifecycle, LocalStorage sync, and UI rendering. |
| `index.css` | Design system. Houses CSS variables for the color palette, glassmorphism effects, Inter typography, responsive grid, and micro-animations. |
| `main.py` | Command-line interface for direct PostgreSQL database interaction (Add, Remove, Promote, Display). |
| `database.py` | PostgreSQL connection and initialization module. Auto-creates the `emp` database and `employees` table. |
| `api.py` | FastAPI REST API server. Exposes HTTP endpoints for all CRUD operations on the PostgreSQL database. |
| `requirements.txt` | Python dependencies. Currently lists `psycopg2-binary` (PostgreSQL driver). |

---

## 📝 Usage & Maintenance

1. **Running the Frontend**: Simply open `index.html` in any modern web browser. No installation required. The server is also running locally at `http://localhost:8080`.
2. **Adding Employees**: Use the **"+ Add Vector"** button to open the input modal. Fill in ID, Name, Department, Position, Annual CTC, and Rating, then click **"Commit Vector"**.
3. **Deleting Employees**: Click the **"Delete"** button in the Action column of any row in the Analysis Ledger table.
4. **Data Persistence**: All data is auto-saved to LocalStorage under the key `hr_enterprise_v8`. Clearing browser cache will reset all data back to the **default 30-employee baseline dataset**.
5. **Running the Python Backend** (Optional):
   - Ensure PostgreSQL is installed and running locally.
   - Update credentials in `database.py` and `main.py` if your PostgreSQL password is not `password`.
   - Install dependencies: `pip install -r requirements.txt`
   - Run the CLI: `python main.py`
   - Run the API Server: `python api.py` (accessible at `http://localhost:8000`)

---

## 📌 Key Formulas Reference

| Module | Formula |
| :--- | :--- |
| Z-Score (Anomaly) | `z = (salary - mean_salary) / std_dev` |
| Staff ROI | `ROI = (performance × 10) / (salary / 100000)` |
| Critical Attrition Risk | `performance ≥ 4.5 AND salary < (avg × 0.75)` |
| High Attrition Risk | `performance ≥ 4.0 AND salary < (avg × 0.90)` |
| Monte Carlo Loss | `Σ(salary × 0.40 × 0.30) / simulations` |
| 12M Cost Forecast | `total_payroll × 1.08` |
| 24M Cost Forecast | `total_payroll × 1.08²` |
| Gender Pay Gap | `(male_mean - female_mean) / male_mean × 100` |

---

*Documentation Version: 8.1.0 — Last Updated: March 2026 — Technical Lead: AI Neural Engine*
