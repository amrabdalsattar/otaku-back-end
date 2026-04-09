# 🎌 Otaku Anime Platform — Senior Backend Engineer Prompt

You are a **Senior Backend Engineer**.  
Your task is to design and implement a **production-ready Node.js Express API** for an Anime Platform called **"Otaku"**.  
The code must follow **clean architecture**, **scalability**, and **best practices**.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt
- dotenv
- express-validator

---

## 📁 Project Structure

```
src/
├── config/
│   └── db.js
├── controllers/
├── models/
├── routes/
├── services/
├── middlewares/
├── utils/
├── app.js
└── server.js
```

---

## 🔐 Authentication

### Register
`POST /api/auth/register`

**Request Body:**
```json
{
  "email": "",
  "password": "",
  "rePassword": ""
}
```

**Requirements:**
- Validate email format
- Hash password with bcrypt
- Return JWT token

---

### Login
`POST /api/auth/login`

**Request Body:**
```json
{
  "email": "",
  "password": ""
}
```

**Returns:** JWT Token

---

## 🎬 Anime Features

### Get All Anime
`GET /api/anime`

**Returns:**
```json
[
  {
    "id": "",
    "name": "",
    "image": "",
    "year": ""
  }
]
```

---

### Get Anime Details
`GET /api/anime/:id`

**Returns:**
```json
{
  "id": "",
  "name": "",
  "synopsis": "",
  "characters": [],
  "type": "",
  "rate": "",
  "classifications": [],
  "year": "",
  "studio": "",
  "episodes": 0,
  "status": "",
  "rating": ""
}
```

---

### Get Anime Characters
`GET /api/anime/:id/characters`

**Returns:**
```json
[
  {
    "characterId": "",
    "image": "",
    "name": ""
  }
]
```

---

### Add Character to Anime
`POST /api/anime/:animeId/characters`  
🔒 **Protected Route (JWT Required)**

**Request Body:**
```json
{
  "name": "",
  "image": "",
  "biography": "",
  "favouritesNumber": 0,
  "kanjiName": ""
}
```

**Behavior:**
1. Find anime by `animeId`
2. Add character to the `characters` array
3. Return the updated anime

---

### Get Character Details
`GET /api/characters/:id`

**Returns:**
```json
{
  "id": "",
  "charName": "",
  "animeName": "",
  "biography": "",
  "favouritesNumber": 0,
  "kanjiName": ""
}
```

---

### Get Top Characters
`GET /api/characters/top`

**Logic:**
1. Get the highest-rated anime
2. Return the top **3 characters** from it

---

### Filter Anime
`GET /api/anime/filter?type=`

**Filter Options:**
| Value | Description |
|-------|-------------|
| `all` | All anime |
| `topRated` | Highest rated |
| `series` | Series only |
| `movies` | Movies only |

---

### Search Anime
`GET /api/anime/search?q=`

**Searches by:**
- Name
- Studio
- Classification

---

## 🛡 Admin Features
> All routes are **Protected (JWT Required)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/anime` | Add new anime |
| `PUT` | `/api/anime/:id` | Update anime |
| `DELETE` | `/api/anime/:id` | Delete anime |

---

## 🗄 Database Models

### User Model
```json
{
  "email": "String",
  "password": "String (hashed)",
  "createdAt": "Date"
}
```

### Anime Model
```json
{
  "name": "String",
  "image": "String",
  "synopsis": "String",
  "type": "String",
  "rate": "Number",
  "classifications": ["String"],
  "year": "Number",
  "studio": "String",
  "episodes": "Number",
  "status": "String",
  "rating": "String",
  "characters": [
    {
      "name": "String",
      "image": "String",
      "biography": "String",
      "favouritesNumber": "Number",
      "kanjiName": "String"
    }
  ]
}
```

---

## ⚙️ Middleware

Create the following middleware:

- `authMiddleware` — Verify and decode JWT token
- `errorMiddleware` — Centralized error handling

---

## ✅ Requirements

- Clean Architecture
- Async/Await throughout
- Proper HTTP Status Codes
- Production-Ready code quality

---

## 🌟 Bonus Features

- Pagination
- Sorting
- Swagger API Documentation

---

## 📦 Expected Output

- Full Node.js project
- Clean, readable code
- Fully working API
