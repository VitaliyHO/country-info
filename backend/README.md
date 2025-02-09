# 🌍 Country Info API

## 📌 Description

This project is the backend part of an application for retrieving and processing country data. It is built using **Nest.js** and provides API endpoints for fetching country information, population data, and flags.

## 🚀 Technologies

- **Nest.js** – modular and scalable backend framework
- **TypeScript** – static typing for better code safety
- **Axios** – for making HTTP requests to external APIs

---

## 📂 Project Structure

```
backend/
│── src/
│   ├── controllers/        # API controllers
│   ├── services/           # Business logic
│   ├── modules/            # Modular architecture
│   ├── config/             # Configuration files
│   ├── main.ts             # Application entry point
│   ├── app.module.ts       # Root module
│── .env                    # Environment variables file
│── package.json            # Dependencies and scripts
│── tsconfig.json           # TypeScript configuration
│── nest-cli.json           # NestJS CLI configuration
```

---

## 🛠 Setup and Running

### 1️⃣ **Install dependencies**

```bash
npm install
```

### 2️⃣ **Create the `.env` file**

Create a `.env` file in the root directory and add:

```env
PORT=3008
AVAILABLE_COUNTRIES_BASE_URL=https://date.nager.at/api/v3
COUNTRY_DETAILS_BASE_URL=https://countriesnow.space/api/v0.1
FRONTEND_URL=http://localhost:5173
```

### 3️⃣ **Start the server**

```bash
npm run start:dev
```

The backend will run on `http://localhost:3008/`.

---

## 🌍 API Endpoints

### 📌 Get a list of available countries

```http
GET /countries
```

**Response:**

```json
[
  { "countryCode": "UA", "countryName": "Ukraine" },
  { "countryCode": "US", "countryName": "United States" }
]
```

### 📌 Get detailed information about a country

```http
GET /countries/:countryCode
```

**Response:**

```json
{
  "name": "Ukraine",
  "borders": ["PL", "RU", "HU"],
  "population": [
    { "year": 2000, "value": 48700000 },
    { "year": 2010, "value": 45600000 }
  ],
  "flag": "https://example.com/flag.png"
}
```

---

✅ Implement country data retrieval  
✅ Fetch population and flag images  
✅ Handle errors and API failures  
⬜ Add authentication  
⬜ Implement caching for API responses

---

## 📩 Contact

If you have any questions or suggestions – feel free to reach out! 🚀
