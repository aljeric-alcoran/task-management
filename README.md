SIMPLE TASK MANAGEMENT SYSTEM

## Getting Started

### Local Setup
DATABASE SETUP
1. Install MySQL. Ensure you have MySQL installed on your local machine.
   You can download it from MySQL Downloads.

3. Create a MySQL Instance and Database
   Start your MySQL server.
   Create a new database for your project, e.g., task_management_db.

```
CREATE DATABASE task_management_db;
```

   Optionally, create a dedicated user for this database and assign privileges:
```
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'test1234';
GRANT ALL PRIVILEGES ON task_management_db.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```

3. Take Note of Your Database Credentials
   - Host (usually localhost)
   - Port (default: 3306)
   - Username (e.g., admin)
   - Password (e.g., test1234)
   - Database name (e.g., task_management_db)





NEXT.JS APPLICATION SETUP
1. Install Dependencies
   In your project folder, run:
```
npm install
```

2. Create Environment Files
   - .env 
   - .env.local 

3. Configure .env File
   Add your database connection URL:
```
DATABASE_URL="mysql://username:password@localhost:3306/your_database_name"
```

   - Replace the placeholders with your actual credentials:
      - username → your MySQL username
      - password → your MySQL password
      - localhost → your host
      - 3306 → your port
      - your_database_name → your database name

4. Configure .env.local File
   Add development-specific variables:
```
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_MYSQL_HOST=localhost
NEXT_PUBLIC_MYSQL_PORT=3306
NEXT_PUBLIC_MYSQL_USER=admin
NEXT_PUBLIC_MYSQL_PASSWORD=test1234
NEXT_PUBLIC_MYSQL_DATABASE=task_management_db
```

5. Push Prisma Schema to Database
   Apply your Prisma schema to the database:
```
npx prisma db push
```

6. Generate Prisma Client
   Run the following to generate Prisma client based on your schema:
```
npx prisma generate
```

7. Run the Development Server
   Start your Next.js application:
```
npm run dev
```

8. Access the Application
   Open your browser and go to:
```
http://localhost:3000
```


