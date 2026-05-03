from database import initialize_db, get_db_connection
from operations import add_employee, remove_employee, promote_employee, display_employees

def main():
    # Configuration - Update credentials here
    db_user = "postgres"
    db_password = "user123" 
    db_host = "localhost"
    db_port = "5432"
    
    # Initialize DB and Table
    if not initialize_db(db_user, db_password, db_host, db_port):
        print("Failed to initialize database. Exiting.")
        return
    
    # Establish Connection
    con = get_db_connection(db_user, db_password, db_host, db_port)
    if not con:
        print("Failed to connect to database. Exiting.")
        return
    
    # Create a cursor
    cursor = con.cursor()

    while True:
        print("\n" + "="*30)
        print(" EMPLOYEE MGMT (POSTGRES) ")
        print("="*30)
        print("1. Add Employee")
        print("2. Remove Employee")
        print("3. Promote Employee")
        print("4. Display Employees")
        print("5. Exit")
        print("-" * 30)
        
        ch = input("Enter your Choice: ")

        if ch == '1':
            add_employee(con, cursor)
        elif ch == '2':
            remove_employee(con, cursor)
        elif ch == '3':
            promote_employee(con, cursor)
        elif ch == '4':
            display_employees(cursor)
        elif ch == '5':
            print("Exiting the program. Goodbye!")
            break
        else:
            print("Invalid Choice! Please try again.")
    
    # Cleanup
    if cursor:
        cursor.close()
    if con:
        con.close()

if __name__ == "__main__":
    main()
