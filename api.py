from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_db_connection, initialize_db
import uvicorn

# Initialize database and tables
initialize_db()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Employee(BaseModel):
    id: int
    name: str
    dept: str
    position: str
    salary: float
    performance: float
    hireDate: str
    gender: str = "Not Specified"
    age: int = 30
    impactScore: float = 5.0

class Promotion(BaseModel):
    amount: float

@app.get("/employees")
def get_employees():
    con = get_db_connection()
    if not con:
        return []
    cursor = con.cursor()
    cursor.execute("SELECT id, name, dept, position, salary, performance, hireDate, gender, age, impactScore FROM employees ORDER BY id")
    rows = cursor.fetchall()
    cursor.close()
    con.close()
    return [{
        "id": r[0], "name": r[1], "dept": r[2], "position": r[3], 
        "salary": r[4], "performance": r[5], "hireDate": str(r[6]), 
        "gender": r[7], "age": r[8], "impactScore": r[9]
    } for r in rows]

@app.post("/employees")
def add_employee(emp: Employee):
    con = get_db_connection()
    if not con:
        raise HTTPException(status_code=500, detail="DB Connection Failed")
    cursor = con.cursor()
    try:
        cursor.execute("""
            INSERT INTO employees (id, name, dept, position, salary, performance, hireDate, gender, age, impactScore) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (emp.id, emp.name, emp.dept, emp.position, emp.salary, emp.performance, emp.hireDate, emp.gender, emp.age, emp.impactScore))
        con.commit()
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        con.close()
    return {"message": "Success"}

@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int):
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute("DELETE FROM employees WHERE id = %s", (emp_id,))
    con.commit()
    cursor.close()
    con.close()
    return {"message": "Success"}

@app.patch("/employees/{emp_id}/promote")
def promote_employee(emp_id: int, prom: Promotion):
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute("UPDATE employees SET salary = salary + %s WHERE id = %s", (prom.amount, emp_id))
    con.commit()
    cursor.close()
    con.close()
    return {"message": "Success"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
