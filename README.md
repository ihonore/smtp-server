# SMTP-server + Remote Database connection

## Description

This project provides a simple SMTP server API and a remote database connection API to facilitate email sending and database operations. Below are the endpoints and their functionalities.

## Endpoints

### 2. Welcome Endpoint

- Endpoint: `https://rtila-smtp-server.onrender.com`
- Method: GET
- Description: This endpoint shows that the API is working and provides a welcome message.

#### Example Response

```json
{
  "message": "🟢WELCOME TO THE RTILA MAIL-SMTP API🟢 add /api-docs at the end of Url to go to the documentation"
}
```

### 1. Send Email

- Endpoint: `https://rtila-smtp-server.onrender.com/api/v1/sendEmail`
- Method: POST
- Description: This endpoint allows you to send an email by providing the necessary parameters.

#### Parameters

- `host` (string): The SMTP server host.
- `port` (number): The SMTP server port.
- `username` (string): Your email account username.
- `password` (string): Your email account password.
- `receiver` (string): The email address of the recipient.
- `content` (string): The content/body of the email.

#### Example Request

```json
POST https://rtila-smtp-server.onrender.com/api/v1/sendEmail

{
  "host": "smtp.example.com",
  "port": 587,
  "username": "your-email@example.com",
  "password": "your-email-password",
  "receiver": "recipient@example.com",
  "content": "Hello, this is a test email!"
}
```
### 3. Connect to Remote Database

- Endpoint: `https://rtila-smtp-server.onrender.com/api/v1/connect-db`
- Method: POST
- Description: This endpoint allows you to connect to a remote database with the specified parameters and perform database operations.

#### Parameters

- `host` (string): The database server host.
- `user` (number): The username to connect to the database.
- `password` (string): The password of the database user.
- `database` (string): The name of the database to connect.
- `dbType` (string): The type of the remote database (e.g., MySQL, MariaDB, PostgreSQL, MongoDB, etc.).

#### Example Request

```json
POST https://rtila-smtp-server.onrender.com/api/v1/connect-db

{
  "host": "your-database-host",
  "user": "your-database-username",
  "password": "your-database-password",
  "database": "your-database-name",
  "dbType": "mysql",
  "query": "SELECT * FROM users"
}
```
