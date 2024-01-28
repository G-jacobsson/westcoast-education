# Westcoast-Education

Assignment in JavaScript course at Medieinstitutet, building an educational platform, based on a customer requirement draft.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- **Node.js and npm**: You must have Node.js and npm installed on your computer. If you don't have them installed, you can download them from [here](https://nodejs.org/).

- **JSON Server**: This project uses JSON Server to simulate a REST API. You can install it globally via npm:
  npm install -g json-server

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository to your local machine: git clone https://github.com/G-jacobsson/westcoast-education
2. Navigate to the project directory: ``` 
`cd westcoast-education``

3. Install the necessary npm packages: ``` 
`npm install``

4. Start JSON Server to watch the `db.json` file:
   `json-server --watch db.json``

This will host your database on a local server, typically at `http://localhost:3000`.

## Using the Application

### User Registration and Course Booking

- **User Registration**: Users need to register to book a course. The registration form can be accessed from the main page.

- **Booking a Course**: Once registered, users can browse available courses and book them through the provided interface.

### Administration

Administrators have the ability to manage various aspects of the application:

- **Update Data**: Admins can update student, teacher, and course data by loading the corresponding forms in the admin panel.

- **Add New Courses**: New courses can be added through a dedicated form in the admin section.

- **View Enrollments**: Administrators can view enrollments for each course to track which students are enrolled in which courses.

## Built With

- [Node.js](https://nodejs.org/) - The runtime server environment.
- [JSON Server](https://github.com/typicode/json-server) - Used to simulate a REST API.

## Authors

- **G-O Jacobsson**
