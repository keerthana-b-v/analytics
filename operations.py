from psycopg2 import Error

def check_employee(cursor, employee_id):
    """Check if an employee exists by ID."""
    sql = 'SELECT * FROM employees WHERE id=%s'
    cursor.execute(sql, (employee_id,))
    return cursor.fetchone() is not None

def add_employee(con, cursor):
    """Add a new employee to the database."""
    try:
        Id = input("Enter Employee Id (Integer): ")
        if not Id.isdigit():
            print("Invalid ID. Please enter a number.")
            return
            
        if check_employee(cursor, Id):
            print("Employee already exists. Please try again.")
            return
        
        Name = input("Enter Employee Name: ")
        Dept = input("Enter Department: ")
        Post = input("Enter Employee Post: ")
        Salary = input("Enter Employee Salary: ")
        Perf = input("Enter Performance Rating (1-5): ")
        HireDate = input("Enter Hire Date (YYYY-MM-DD): ")
        Gender = input("Enter Gender: ")
        Age = input("Enter Age: ")
        Impact = input("Enter Impact Score (1-10): ")

        sql = """
            INSERT INTO employees (id, name, dept, position, salary, performance, hireDate, gender, age, impactScore) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        data = (int(Id), Name, Dept, Post, float(Salary), float(Perf), HireDate, Gender, int(Age), float(Impact))
        cursor.execute(sql, data)
        con.commit()
        print("Employee Added Successfully")
    except (Error, ValueError) as err:
        print(f"Error: {err}")
        con.rollback()

def remove_employee(con, cursor):
    """Remove an employee by ID."""
    try:
        Id = input("Enter Employee Id: ")
        if not check_employee(cursor, Id):
            print("Employee does not exist. Please try again.")
            return
        
        sql = 'DELETE FROM employees WHERE id=%s'
        data = (Id,)
        cursor.execute(sql, data)
        con.commit()
        print("Employee Removed Successfully")
    except Error as err:
        print(f"Error: {err}")
        con.rollback()

def promote_employee(con, cursor):
    """Promote an employee by increasing their salary."""
    try:
        Id = input("Enter Employee's Id: ")
        if not check_employee(cursor, Id):
            print("Employee does not exist. Please try again.")
            return
        
        Amount = float(input("Enter increase in Salary: "))

        sql_select = 'SELECT salary FROM employees WHERE id=%s'
        cursor.execute(sql_select, (Id,))
        result = cursor.fetchone()
        if result:
            current_salary = result[0]
            new_salary = current_salary + Amount

            sql_update = 'UPDATE employees SET salary=%s WHERE id=%s'
            cursor.execute(sql_update, (new_salary, Id))
            con.commit()
            print("Employee Promoted Successfully")
        else:
            print("Error: Could not fetch salary.")

    except (ValueError, Error) as e:
        print(f"Error: {e}")
        con.rollback()

def display_employees(cursor):
    """Fetch and display all employee records."""
    try:
        sql = 'SELECT * FROM employees'
        cursor.execute(sql)
        employees = cursor.fetchall()
        
        if not employees:
            print("No employee records found.")
            return

        print("\n--- Employee Records ---")
        for emp in employees:
            print(f"ID: {emp[0]} | Name: {emp[1]} | Dept: {emp[2]} | Post: {emp[3]}")
            print(f"Salary: {emp[4]} | Perf: {emp[5]} | Date: {emp[6]}")
            print(f"Gender: {emp[7]} | Age: {emp[8]} | Impact: {emp[9]}")
            print("-" * 40)

    except Error as err:
        print(f"Error: {err}")
