# Student Management REST API

A beginner-friendly Student Management REST API built with Java 21, Spring Boot, Spring Data JPA, MySQL and Postman.

## Requirements

- Java JDK 21
- Maven 3.9+
- MySQL 8+
- VS Code (recommended)
- Postman

The project structure and requirements follow the supplied Spring Boot Beginner Practical Guide.

## Project Structure

```text
student-api/
├── src/main/java/com/example/studentapi/
│   ├── StudentApiApplication.java
│   ├── controller/
│   │   └── StudentController.java
│   ├── entity/
│   │   └── Student.java
│   ├── repository/
│   │   └── StudentRepository.java
│   └── service/
│       └── StudentService.java
├── src/main/resources/
│   └── application.properties
├── database/
│   └── setup.sql
├── postman/
│   └── Student-API.postman_collection.json
├── pom.xml
└── README.md
```

## 1. Configure MySQL

Open MySQL and run:

```sql
CREATE DATABASE studentdb;
USE studentdb;
```

The `student` table is created automatically by JPA.

## 2. Set your MySQL password

Open:

`src/main/resources/application.properties`

Change:

```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

to your actual MySQL password.

## 3. Run the application

From the project folder:

```bash
mvn clean spring-boot:run
```

On Windows, if Maven is not available globally and the project has a Maven wrapper, use:

```bash
mvnw.cmd spring-boot:run
```

The application runs on:

```text
http://localhost:8080
```

## 4. Test the API

### Create Student

POST:

```text
http://localhost:8080/students
```

Body -> raw -> JSON:

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "department": "CSE"
}
```

### Get All Students

GET:

```text
http://localhost:8080/students
```

### Get Student by ID

GET:

```text
http://localhost:8080/students/1
```

### Update Student

PUT:

```text
http://localhost:8080/students/1
```

Body:

```json
{
  "name": "Rahul Kumar",
  "email": "rahulkumar@gmail.com",
  "department": "AIML"
}
```

### Delete Student

DELETE:

```text
http://localhost:8080/students/1
```

Response:

```text
Student deleted successfully
```

## CRUD Summary

| Operation | Method | URL |
|---|---|---|
| Create | POST | `/students` |
| Read all | GET | `/students` |
| Read one | GET | `/students/{id}` |
| Update | PUT | `/students/{id}` |
| Delete | DELETE | `/students/{id}` |

## Common Problems

### Port 8080 already in use

Stop the other application or change:

```properties
server.port=8081
```

### Maven is not recognized

Install Maven or use the Maven wrapper if available.

### Access denied for user root

Check the MySQL username and password in `application.properties`.

### Communications link failure

Make sure MySQL Server is running and is using port 3306.

### 404 Not Found

Check the URL, HTTP method, controller mapping and whether the Spring Boot application is running.

### Table not found

Check the database name and make sure:

```properties
spring.jpa.hibernate.ddl-auto=update
```

is present.
