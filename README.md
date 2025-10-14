

## 🚀 Features

✅ User Authentication (JWT)  
✅ Role-based Access (Admin / Member)  
✅ Book Management (CRUD)  
✅ Borrow & Return Flow  
✅ Borrow History per User  
✅ Reports: Most Borrowed Books, Active Members, Availability  
✅ Input Validation (express-validator)  
✅ Secure Password Hashing (bcryptjs)  
✅ MongoDB Transactions for Consistency

---



Create a `.env` file in the root directory:

```env
PORT=your port
MONGO_URI=mongodb://localhost:27017/nalanda
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
```


## 🧩 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register new member |
| POST | `/api/auth/login` | Login user & get JWT |

### 📚 Book Routes (Admin Only for Create/Update/Delete)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/books` | List all books (with filters) |
| POST | `/api/books` | Add new book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

### 📦 Borrow Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/borrow/borrow/:bookId` | Borrow a book |
| POST | `/api/borrow/return/:borrowId` | Return a book |
| GET | `/api/borrow/history` | Get borrow history |

### 📊 Reports (Admin Only)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/reports/most-borrowed` | Top 10 most borrowed books |
| GET | `/api/reports/active-members` | Top 10 active members |
| GET | `/api/reports/availability` | Book availability summary |

---

## 🧠 Role Management

Default registered users → **member**  
Change to **admin** manually or using a seed script:


Then login again to generate a new token with admin privileges.

---

## 🧾 Example Book Object

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "isbn": "9780735211292",
  "publicationDate": "2018-10-16T00:00:00.000Z",
  "genre": "Self-Help",
  "totalCopies": 10,
  "availableCopies": 8
}
```


---

## ⚙️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| Node.js | Backend runtime |
| Express.js | API framework |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| dotenv | Environment variables |

---

## 📬 Author

**Your Name**  
📧 [youremail@example.com](mailto:youremail@example.com)  
🌐 [GitHub: your-username](https://github.com/your-username)

---