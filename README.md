# Boat Dealer Admin Portal

Admin portal for managing boat listings, including creation, editing, deletion, and restoration of listings.

---

## Project Structure

- /client            # Frontend (React + Vite)
- /api               # Backend (ASP.NET Core)
- /postman           # Postman collection for API testing
- README.md

---

## Prerequisites

Ensure the following are installed before starting:

### Node & Package Manager
- Node.js: v24.12.0
- Bun: latest version

Verify:
node -v
bun -v

> Using a different Node version may cause dependency or Vite issues.

### .NET
- .NET SDK: net10.0.100

---

## Frontend Setup (Client)

### Navigate to client
cd client

### Install dependencies
bun install

### Start development server
bun run dev

Frontend will be available at:
http://localhost:5173

---

## Backend Setup (API)

### Navigate to API
cd api

### Restore & build
dotnet build

### Run API
dotnet run

API will be available at:
http://localhost:5299

Swagger UI:
http://localhost:5299/swagger

---

## Authentication Notes

- Some endpoints require authentication
- Lookup endpoints (e.g. /api/cities/*) are public
- Ensure AUTH_HEADER is configured correctly on the frontend for protected routes

---

## Postman

A Postman collection is included for API testing:

/postman

Import the collection into Postman to test:
- Boat CRUD
- Deleted listings
- Restore endpoints
- Lookup endpoints

---

## Updating Backend Credentials

The backend API uses a SQL Server connection string stored in `appsettings.Development.json`.

### Steps to update credentials

1. Navigate to the `api` folder:

   cd api

2. Copy the example file:

   cp appsettings.Development.json.example appsettings.Development.json

3. Open `appsettings.Development.json` and update the values:

   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DATABASE;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
     },
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft.AspNetCore": "Warning"
       }
     }
   }

4. Save the file. Your backend will now use these credentials when running locally.

### Example `appsettings.Development.json.example`

Place this file in the `api` folder and commit it (without real credentials):

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=xxx;Database=mydealers_dev2;User Id=xxx;Password=xxx;TrustServerCertificate=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

Developers should copy this file to `appsettings.Development.json` and replace the placeholders with their own local SQL Server credentials.


## Common Issues / Checks

### API fails with authentication error
- Ensures Header contains 'Bearer 7'

### Port conflicts
- Frontend: 5173
- Backend: 5299

---

## Notes

- Frontend uses Bun (not npm/yarn)
- Backend uses ASP.NET Core (.NET 10 preview)
- City & lookup data are fetched dynamically
- Deleted listings can be restored from the admin UI

---

## Ready to Go

Once both services are running:

1. Start backend (dotnet run)
2. Start frontend (bun run dev)
3. Open browser and begin managing listings
