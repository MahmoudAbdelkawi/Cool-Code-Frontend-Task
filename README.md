# Cool Code Frontend Task

## Introduction

Briefly introduce your project, explaining its core functionality and objectives. Describe why it exists and the problems it aims to address.

## Features

List and briefly describe the key features of your project:

- **User Authentication:** Users can sign up and log in to access the system.
- **User Roles:** The project supports three roles - Buyer, Vendor, and Admin.
- **Product Management:** Vendors can add, edit, and delete products, while Buyers can view them.
- **Category Management:** Admins can manage product categories.
- **Pagination:** Product listings are paginated for improved performance.

## Technologies

Outline the technologies, libraries, and tools used in your project:

- React
- React Query
- Other relevant libraries (e.g., Axios for API requests)
- Mention any backend technologies if applicable (e.g., Node.js, Express, Prisma, PostgreSQL)

## Getting Started

Explain how to set up and run your project locally. Provide step-by-step instructions for installation, environment setup, and starting the development server.

```bash
# Clone the repository
git clone https://github.com/MahmoudAbdelkawi/Cool Code-Frontend-Task.git

# Navigate to the project directory
cd your-project

# Install dependencies
npm install

# Set up environment variables
# Create a .env file and add necessary configuration (API endpoints, secret keys, etc.)

# Start the development server
npm start

# Authentication

## Overview
Authentication in this project is handled using JSON Web Tokens (JWT). It allows users to securely access the system. Below, you'll find details about user registration and login processes, along with information about securing user data.

## User Registration
To create an account, users can make a POST request to the following endpoint:
- `POST /api/auth/signup`

## User Login
Authenticated users can log in using the following endpoint:
- `POST /api/auth/login`

## Securing User Data
We prioritize the security of user data. We implement best practices to protect sensitive information and user privacy.

