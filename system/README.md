# Customer Management System

A customer management system built with React, ASP.NET Core, Entity Framework Core, and SQL Server.

## Features

- Admin login screen
- Customer dashboard with summary statistics
- Create, view, edit, and delete customers
- Search customers by name, email, or phone
- Filter customers by active or inactive status
- Client-side form validation
- Loading, empty, and API error states
- Light and dark themes
- SQL Server persistence through Entity Framework Core

## Technology

- Frontend: React 19, Vite, JavaScript
- Backend: ASP.NET Core .NET 9 Web API
- Database: SQL Server with Entity Framework Core 9
- Styling: CSS with responsive layouts and theme variables

## Prerequisites

- Node.js and npm
- .NET 9 SDK
- SQL Server Express or SQL Server
- SQL Server instance named `MATHEESHA\\SQLEXPRESS`, or a matching connection string

## Database Setup

The default connection is configured in `backend/appsettings.json`:

```json
"DefaultConnection": "Server=MATHEESHA\\SQLEXPRESS;Database=CustomerManagementDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=True"
```

Update this value if your SQL Server instance uses a different server name, authentication method, or database name.

From the `backend` directory, create or update the database with:

```powershell
dotnet ef database update
```

If the Entity Framework command is not installed, install it once with:

```powershell
dotnet tool install --global dotnet-ef
```

## Run the Backend

Open a terminal in the project root and run:

```powershell
cd backend
dotnet restore
dotnet run
```

The development API runs at:

- HTTP: `http://localhost:5063`
- HTTPS: `https://localhost:7170`

OpenAPI is available in development mode at:

```text
http://localhost:5063/openapi/v1.json
```

## Run the Frontend

Open a second terminal in the project root and run:

```powershell
cd frontend
npm install
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

The frontend uses `http://localhost:5063/api` by default. To use another API URL, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5063/api
```

## Admin Login

The current frontend-only demo login is:

```text
Email: admin@gmail.com
Password: 0000
```

Authentication is stored in browser `localStorage` and does not use the database. This is suitable for a local demonstration only. Production authentication should be moved to the backend with hashed passwords, sessions or JWTs, and authorization checks on protected API endpoints.

## API Endpoints

The customer API is available under `/api/Customer`:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/Customer` | Get all customers |
| `GET` | `/api/Customer/{id}` | Get one customer |
| `POST` | `/api/Customer` | Create a customer |
| `PUT` | `/api/Customer/{id}` | Update a customer |
| `DELETE` | `/api/Customer/{id}` | Delete a customer |

Customer fields:

- `id`
- `name`
- `email`
- `phone`
- `address`
- `status`: `active` or `inactive`
- `createdDate`

Example request body:

```json
{
  "name": "Amara Perera",
  "email": "amara@example.com",
  "phone": "+94 77 123 4567",
  "address": "Colombo, Sri Lanka",
  "status": "active"
}
```

## Frontend Commands

Run these commands from `frontend`:

```powershell
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Run Oxlint
npm run preview   # Preview the production build
```

## Project Structure

```text
system/
|-- backend/
|   |-- Controller/CustomerController.cs
|   |-- Data/DbContext.cs
|   |-- Model/Customer.cs
|   |-- Migrations/
|   |-- Program.cs
|   |-- appsettings.json
|   `-- backend.csproj
|-- frontend/
|   |-- src/
|   |   |-- api/customerApi.js
|   |   |-- components/
|   |   |-- hooks/useCustomers.js
|   |   |-- App.jsx
|   |   `-- App.css
|   |-- package.json
|   |   `-- vite.config.js
|   `-- README.md
`-- README.md
```

## Notes

- The backend allows requests from `http://localhost:5173` during development.
- Do not commit real passwords, connection strings, or production secrets.
- Keep Entity Framework migrations in source control when the database schema changes.
