# Customer Management System

A customer management app with a .NET backend and two frontend implementations: a React version and an Angular version.

## Stack

- Backend: ASP.NET Core Web API (.NET 9)
- Frontend A: React + Vite
- Frontend B: Angular 19
- Database: SQL Server + Entity Framework Core
- Styling: Custom CSS with responsive layouts and light/dark themes

## Features

- Admin login screen
- Customer dashboard with summary cards
- Add, edit, delete, search, and filter customers
- Form validation and status handling
- Loading, empty, and error states
- Working with both frontend implementations

## Run locally

### Backend

```powershell
cd system/backend
dotnet restore
dotnet run
```

API runs at:
- http://localhost:5063

### React frontend

```powershell
cd system/frontend
npm install
npm run dev
```

React app runs at:
- http://localhost:5173

### Angular frontend

```powershell
cd system/frontend2
npm install
npm start
```

Angular app runs at:
- http://localhost:4200

## Demo login

```text
Email: admin@gmail.com
Password: 0000
```

## Project structure

```text
system/
├─ backend/
│  ├─ Controller/
│  ├─ Data/
│  ├─ Model/
│  ├─ Migrations/
│  ├─ Program.cs
│  ├─ appsettings.json
│  └─ backend.csproj
├─ frontend/          # React version
├─ frontend2/         # Angular version
├─ README.md
└─ ...
```

## Notes

- Both frontend apps connect to the same backend API.
- The active Angular UI is currently in `system/frontend2`.
- Update the connection string in `system/backend/appsettings.json` if your SQL Server instance differs.
