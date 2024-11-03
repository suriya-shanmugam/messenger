# Chat Application

This is a simple chat application that allows users to send messages to all connected devices in a session. The application is built using React.js for the frontend and Spring Boot with Maven for the backend.

# Technologies Used
- Frontend: React
- Backend: Spring Boot, Spring Web, WebSocket
- Build Tool: Maven

# Prerequisites
Make sure you have the following installed on your machine:

- Node.js (for React)
- Java 11+ (for Spring Boot)
- Maven (for building the Spring Boot application)

### Installation

1. **Clone the repository**:

   ```
   bash
   git clone git@github.com:suriya-shanmugam/messenger.git
   cd messenger 

2. **Setup the backend**:

   ```
   cd messageserver
   mvn install
   ./mvn spring-boot:run

- The backend server should start at http://localhost:8080   

3. **Clone the repository**:

   ```
   cd chat-ui-ux
   npm install
   npm install bootstrap
   npm run dev

- The Front server should start at http://localhost:5173    