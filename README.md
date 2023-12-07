# Project_3_WaveWeb
This is our third and last project from Reboot Academy Full Stack Web Developer Bootcamp

## Summary:

Project Name: Wave Web

- Vision: Facilitate the connection between freelance developers and entrepreneurs, offering personalized digital solutions that meet the specific needs of each client.

- Purpose: Simplify the search for opportunities for developers and provide small businesses access to high-quality digital development services.

- Commitment: Wave Web is committed to delivering customized digital products within a maximum of one month, ensuring customer satisfaction and timely delivery of digital solutions.

## About "Wave Web":

"Wave Web" evokes a connection with the sea and nature, representing fluidity and constant evolution. The word "Wave" suggests dynamic energy and continuous movement, reflecting the changing nature of business and technology. The sea symbolizes vast possibilities and an adventurous spirit.

The choice of "Wave Web" also holds a more personal significance for us as developers. As Canarians connected to the sea and nature, the name reflects our deep roots to the land but also our desire to explore new opportunities, much like the waves that constantly change while maintaining an essential connection to their origin.

Furthermore, the duality of "Wave Web" can be interpreted as the convergence of two worlds: the digital world of the web and the natural world of the sea, blending technology with the beauty and strength of nature.

In summary, "Wave Web" encapsulates the idea of a dynamic project, in constant change and evolution, rooted in the connection with nature and the pursuit of new experiences.

## Our services:

- Basic Informative Website Development
- Dynamic Website Development
- E-commerce (Online Store) Development
- PLUS Prototype (1 week)

## User Profiles:

- Admin (GOD): Full management and supervision.
- Dev: Freelance developers selected through interviews and technical tests.
- Client: Entrepreneurs and small businesses seeking digital services.

## Some Mobile design...

![image](https://github.com/jmorma3/Project_3_WaveWeb/assets/122170615/a6b63ae7-c00a-4db4-8515-96bc14c733b2)

## Some Web design...

![image](https://github.com/jmorma3/Project_3_WaveWeb/assets/122170615/b6735d47-f70c-441d-ab8b-292ba51d85b0)

## Tables:

![image](https://github.com/jmorma3/Project_3_WaveWeb/assets/122170615/bf3647bd-d6ec-4174-a15c-b0bbdc1790c5)

## Relationships between tables:

**One-to-Many:**
- One User can have multiple Projects, but a Project can belong to only one User.
- One User can have multiple meetings in the Agenda, but an Agenda meeting can belong to only one User.
- One User can have multiple Invoices, but an Invoice can only belong to one User.
- One Project can have multiple meetings in the Agenda, but an Agenda meeting can belong to only one Project.
- One Project can have multiple Invoices, but an Invoice can only belong to one Project.
- One Project can have multiple Chat_Messages, but a Chat_Message can only belong to one Project.
- One User can have multiple Chat_Messages, but a Chat_Message can only belong to one User. 

**Many-to-Many:**
- One User (Developer) can work on multiple Projects, and a Project can have multiple Developers.

## Endpoints:

### User Signup/Login

#### Client Signup/Login

| METHOD | ENDPOINT          | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                               | RETURNS               |
|--------|-------------------|-------|------|--------------------------|-------------------------------------------|------------------------|
| POST   | /auth/client/signup | -     | user | Client Signup           | first_name, last_name, email, password, role | { token: token }       |
| POST   | /auth/client/login  | -     | user | Client Login            | email, password                           | { token: token }       |

#### Developer Login

| METHOD | ENDPOINT             | TOKEN | ROLE      | DESCRIPTION              | POST PARAMS                       | RETURNS               |
|--------|----------------------|-------|-----------|--------------------------|-----------------------------------|------------------------|
| POST   | /auth/developer/login| -     | developer | Developer Login          | email, password                   | { token: token }       |

### User Endpoints

| METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /user            | YES   | admin| Get all users            | Query params                                    | [{user}]              |
| GET    | /user/:userId    | YES   | admin| Get one user             | -                                               | {user}                |
| GET    | /user/profile    | YES   | -    | Get own profile          | -                                               | {user}                |
| POST   | /user            | YES   | admin| Create one user          | first_name, last_name, email, password, role | {user}        |
| PUT    | /user/:userId    | YES   | admin| Update one user          | first_name, last_name, email, password, role | {message: "User updated!"} |
| PUT    | /user/profile    | YES   | -    | Update user profile (client and developer only update own profile)         | first_name, last_name, email, password, role | {message: "Profile updated!"} |
| PUT    | /user/profile/password   | YES   | -    | Reset user password (client and developer only reset own password)         | newPassword, repeatPassword | {message: "Password updated!"} |
| DELETE | /user/:userId    | YES   | admin | Delete one user          | -                                               | {message: "User deleted!"} |
| DELETE | /user/profile    | YES   | -    | Delete user profile (client and developer only delete own profile)         | -                                               | {message: "Profile deleted!"} |

### Project Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|--------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /project           | YES   | admin    | Get all projects         | Query params                                    | [{project}]            |
| GET    | /project/:projectId| YES   | admin    | Get one project          | -                                               | {project}              |
| GET    | /project/myProjects| YES   | -    | Get own projects        | -                                               | [{project}]             |
| GET    | /project/myProjects/:projectId| YES   | -    | Get one own project       | -                                             | {project}             |
| POST   | /project           | YES   | admin, client | Create one project | userID, project_name, project_type, price, progress_status, developerID, plusProtoype | {project} |
| PUT    | /project/:projectId| YES   | admin, developer | Update one project      | userID, project_name, project_type, price, progress_status, developerID, plusProtoype | {message: "Project updated!"} |
| PUT    | /project/myProjects/:projectId| YES   | admin, developer | Update one own project (developer only update own projects)     | userID, project_name, project_type, price, progress_status, developerID, plusProtoype | {message: "Project updated!"} |
| DELETE | /project/:projectId| YES   | admin | Delete one project      | -                                               | {message: "Project deleted!"} |
| DELETE | /project/myProjects/:projectId| YES   | admin, developer | Delete one own project (developer only deletes own projects)     | - | {message: "Project deleted!"} |

### Agenda Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|--------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /agenda            | YES   | admin    | Get all agenda meeting   | Query params                                    | [{meeting}]             |
| GET    | /agenda/:meetingId  | YES   | admin   | Get one agenda meeting     | -                                               | {meeting}               |
| GET    | /agenda/myAgenda  | YES   | -    | Get own agenda meetings (client and developer only get own agenda meetings)     | -                                               | [{meeting}]              |
| GET    | /agenda/myAgenda/:meetingId  | YES   | -    | Get own agenda meetings (client and developer only get own agenda meetings)     | -                                               | [{meeting}]              |
| POST   | /agenda            | YES   | admin | Create one agenda meeting | meeting_date_time, developerID, clientID, projectID | {meeting}     |
| POST   | /agenda/myAgenda        | YES   | admin, developer | Create one own agenda meeting | meeting_date_time, developerID, clientID, projectID | {meeting}     |
| PUT    | /agenda/:meetingId  | YES   | admin | Update one agenda meeting | meeting_date_time, developerID, clientID, projectID | {message: "Agenda meeting updated!"} |
| PUT    | /agenda/myAgenda/:meetingId  | YES   | admin, developer | Update one own agenda entry (developer only updates own agenda meetings) | meeting_date_time, developerID, clientID, projectID | {message: "Agenda meeting updated!"} |
| DELETE | /agenda/:meetingId  | YES   | admin | Delete one agenda meeting | -                                               | {message: "Agenda meeting deleted!"} |
| DELETE | /agenda/myAgenda/:meetingId  | YES   | admin, developer | Delete one own agenda meeting (developer only deletes own agenda meetings) | meeting_date_time, developerID, clientID, projectID | {message: "Agenda meeting deleted!"} |

### Invoice Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|--------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /invoice           | YES   | admin    | Get all invoices         | Query params                                    | [{invoice}]            |
| GET    | /invoice/:invoiceId| YES   | admin    | Get one invoice          | -                                               | {invoice}              |
| GET    | /invoice/myInvoices| YES   | -    | Get own invoices (client and developer only get own invoices)         | -                                               | [{invoice}]            |
| GET    | /invoice/myInvoices/:invoiceId| YES   | -    | Get one own invoice (client and developer only get own invoices)          | -                                               | {invoice}              |
| POST   | /invoice           | YES   | admin | Create one invoice   | clientID, developerID, projectID, invoice_date, amount, payment_date_time, payment_method | {invoice} |
| PUT    | /invoice/:invoiceId| YES   | admin | Update one invoice       | clientID, developerID, projectID, invoice_date, amount, payment_date_time, payment_method | {message: "Invoice updated!"} |
| DELETE | /invoice/:invoiceId| YES   | admin | Delete one invoice       | -                                               | {message: "Invoice deleted!"} |

### Chat_Message Endpoints

| METHOD | ENDPOINT           | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS               |
|--------|--------------------|-------|------|--------------------------|-------------------------------------------------|------------------------|
| GET    | /message           | YES   | admin    | Get all messages         | Query params                                    | [{message}]            |
| GET    | /message/:messageId| YES   | admin    | Get one message          | -                                               | {message}              |
| GET    | /message/myMessages| YES   | -    | Get own messages (client and developer only get own messages)         | -                                               | [{message}]            |
| GET    | /message/myMessages/:messageId| YES   | -    | Get one own message (client and developer only get own messages)          | -                                               | {message}              |
| POST   | /message           | YES   | - | Create one message   | message_text, message_date_time | {message} |
| PUT    | /message/:messageId| YES   | admin | Update one message       | message_text, message_date_time | {message: "Message updated!"} |
| PUT    | /message/myMessages/:messageId | YES   | - | Update own messages (client and developer only update own messages)  | message_text, message_date_time | {message: "Message updated!"} |
| DELETE | /message/:messageId| YES   | admin | Delete one message       | -                                               | {message: "Message deleted!"} |
| DELETE | /message/myMessages/:messageId | YES   | - | Delete own message (client and developer only delete own messages)  | - | {message: "Message deleted!"} |
