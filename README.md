# **Simple Blog Web Project**

This is a repository containing React, NodeJS, JWT implementation for simple Blog Website

---

## **Description**

I have created this project containing these features :

- JWT-based authentication

- Local strategy (email/password)

- Google OAuth integration

- Protected and public-only routes

- Session management 

---

## **Table of Contents**

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## **Technologies Used**

### Frontend
- React.js

- Vite (build tool)

- Ant Design (UI components)

- Axios (HTTP client)

- React Router (navigation)

- Context API (state management)

### Backend
- Node.js

- Express.js

- MongoDB (database)

- Mongoose (ODM)

- Passport.js (authentication)

- JWT (JSON Web Tokens)

- Nodemailer (email functionality)

---

## **Getting Started**

### Prerequisites
- Node.js (v16+)

- MongoDB

- Google OAuth credentials (for Google login)

### Installation
- Clone the repository

- Install dependencies for both frontend and backend:


```bash
    cd frontend && npm install
    cd ../backend && npm install
```

- Create a .env file in the backend directory with required environment variables

- Start the development servers:

```bash
    # In frontend directory
    npm run dev

    # In backend directory
    npm start
```

---

## **Configuration**

Create a .env file in the backend directory with:

```bash
    JWT_SECRET_KEY = your_jwt_secret_key
    GOOGLE_APP_PASSWORD = your_gmail_app_password
    GOOGLE_CLIENT_ID = your_google_client_id
    GOOGLE_SECRET = your_google_secret_key
```

---

## **Available Scripts**

### Frontend
```bash
    #Start development server
    npm run dev 

    Build for production
    npm run build 

    Run ESLint
    npm run lint 
```

### Backend
```bash
    #Start the server
    npm start 

    #Start in development mode with nodemon
    npm run dev 
```

---

## **Contributing**

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## **License**
MIT License

Copyright (c) 2025 Bintang Duinata

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
