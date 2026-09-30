
# Credit Card Payment System

A full-stack Credit Card Payment System developed using React, Django REST Framework, FastAPI, and Docker.

## Project Overview

This project provides a complete credit card payment management system with a modern frontend and backend APIs.

The system includes:

- User management and authentication
- JWT-based authentication
- Credit card management
- Payment processing
- Transaction history
- REST APIs
- FastAPI API services
- React frontend
- Docker containerization
- Docker Compose orchestration
- API testing using Postman

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- Axios
- React Router
- Tailwind CSS

### Django Backend
- Django
- Django REST Framework
- Simple JWT
- SQLite for the Dockerized submission environment

### FastAPI Backend
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic

### Database
- SQLite
- MySQL configuration was used during development

### DevOps
- Docker
- Docker Compose

### API Testing
- Postman
- FastAPI Swagger / OpenAPI

## Project Structure

```text
credit_card_payment_system/
│
├── GitHub/
│   └── repository.txt
│
├── django_backend/
│   ├── cards/
│   ├── payments/
│   ├── users/
│   ├── config/
│   ├── manage.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── fastapi_backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── screenshots/
│   ├── UI_UX/
│   ├── Postman/
│   └── FastAPI/
│
├── admin_credentials/
│
├── docker-compose.yml
├── README.md
└── .gitignore
