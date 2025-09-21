// Importing express package
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// routes
const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');

dotenv.config();

// Express APP
const app = express();

// ✅ CORS setup
const allowedOrigins = [
  'http://localhost:3000', // local dev
  'https://frontend-heic.onrender.com' // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to our application' });
});
app.use('/api/workouts/', workoutRoutes);
app.use('/api/user/', userRoutes);

// Connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DataBase Connected');
  })
  .catch((error) => {
    console.log(error);
  });

// Port
const PORT = process.env.PORT;

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server is Up and running on port: http://localhost:${PORT}`);
});
