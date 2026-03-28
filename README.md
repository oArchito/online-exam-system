# online-exam-system
# 🎓 Online Exam System (ExamGuard)

A secure and scalable **online examination platform** that allows teachers to create exams and students to attempt them with strict monitoring rules.

---

## 🚀 Features

### 👨‍🏫 Teacher

* Create exams with:

  * Multiple-choice questions (MCQs)
  * Custom duration
  * Auto-generated unique exam code
* View student attempts using exam code
* Analyze results of all students for a specific exam

---

### 👨‍🎓 Student

* Login and join exam using unique exam code
* Attempt exam with:

  * ⏱️ Fixed timer
  * 🚫 Tab switch detection (auto-submit on violation)
* Submit answers and view results
* Upload personal PDF files (for exam or reference)

---

## 🔐 Security & Rules

* Auto-submit on:

  * Tab switching
  * Time expiry
* Protected routes using authentication middleware
* Role-based access (Teacher / Student)

---

## 🧠 Tech Stack

### Frontend

* React.js
* Axios (API calls)
* Inline CSS (Dark theme UI)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Other Tools

* Multer (File Uploads)
* JWT Authentication
* MongoDB Atlas

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/online-exam-system.git
cd online-exam-system
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

Run server:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 📂 Project Structure

```
online-exam-system/
│
├── client/                # React Frontend
│   ├── src/pages/         # UI Pages
│   ├── src/services/      # API calls
│
├── server/                # Backend
│   ├── controllers/       # Logic
│   ├── routes/            # API routes
│   ├── models/            # MongoDB schemas
│   ├── middleware/        # Auth & validation
│
└── uploads/               # Uploaded PDFs
```

---

## 🔄 Workflow

1. Teacher creates exam → system generates unique code
2. Student enters code → joins exam
3. Timer starts + tab switch monitoring enabled
4. Student submits answers
5. System evaluates and stores score
6. Teacher views results

---

## 📊 Future Improvements

* 📈 Analytics dashboard for teachers
* 🏆 Leaderboard system
* 📄 Auto PDF result generation
* 🎯 Negative marking support
* 🎨 Advanced UI (Tailwind / Material UI)

---

## 👨‍💻 Author

**Archit Aggarwal**

---

## ⭐ Contribution

Feel free to fork this repo and improve features!

---

## 📌 Note

This project is built for learning and demonstration purposes of:

* Full-stack development
* Secure exam systems
* Real-time monitoring logic

---

