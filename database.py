import psycopg2
from psycopg2 import Error

def get_db_connection(user="postgres", password="password", host="localhost", port="5432"):
    """Establish and return a PostgreSQL database connection."""
    try:
        connection = psycopg2.connect(
            user=user,
            password=password,
            host=host,
            port=port,
            database="emp"
        )
        return connection
    except Error as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None

def initialize_db(user="postgres", password="password", host="localhost", port="5432"):
    """Initialize the PostgreSQL database and table if they don't exist."""
    try:
        # Connect to default 'postgres' database to create the 'emp' database
        connection = psycopg2.connect(
            user=user,
            password=password,
            host=host,
            port=port,
            database="postgres"
        )
        connection.autocommit = True
        cursor = connection.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'emp'")
        exists = cursor.fetchone()
        if not exists:
            cursor.execute("CREATE DATABASE emp")
        
        cursor.close()
        connection.close()

        # Connect to 'emp' database to create the table
        connection = psycopg2.connect(
            user=user,
            password=password,
            host=host,
            port=port,
            database="emp"
        )
        cursor = connection.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS employees (
                id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                dept VARCHAR(255) NOT NULL,
                position VARCHAR(255) NOT NULL,
                salary FLOAT NOT NULL,
                performance FLOAT NOT NULL,
                hireDate DATE NOT NULL,
                gender VARCHAR(50),
                age INT,
                impactScore FLOAT
            )
        """)
        connection.commit()
        cursor.close()
        connection.close()
        return True
    except Error as e:
        print(f"Error initializing PostgreSQL database: {e}")
        return False
