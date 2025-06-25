const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const nodemailer = require('nodemailer');
const env = require('dotenv');
const path = require('path');
const routes = require('./server/routes/recipeRoutes');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const app = express();
env.config();

// Port configuration
const port = process.env.PORT || 4001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Static assets
app.use(expressLayouts);
app.use(cookieParser('CookingBlogSecure'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

// Make session data accessible to views
app.use(function (req, res, next) {
  res.locals.userId = req.session.userId;
  res.locals.userName = req.session.username;
  next();
});

app.use(flash());
app.use(fileUpload());
// Make flash messages available to all views
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});

app.use((req, res, next) => {
  res.locals.infoErrorsObj = req.flash('infoErrorsObj');
  res.locals.infoSubmitObj = req.flash('infoSubmitObj');
  next();
});

app.set('layout', './layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);
require('./server/models/Category');
require('./server/models/Recipe');
require('./server/models/User');

app.get('/signin', (req, res) => {
  res.render('signin');
});


app.post("/signin",async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        req.flash('error', 'User does not exist.');
        return res.redirect('/signin');
      }
  
      const isPassword = await user.authenticate(req.body.password);
      if (!isPassword) {
        req.flash('error', 'Email/Password is incorrect.');
        return res.redirect('/signin');
      }
  
      // Set session data and redirect to the home page
      req.session.userId = user._id;
      req.session.username = user.name;
      req.session.userLoggedIn = true;
      return res.redirect('/');
    } catch (error) {
      console.error('Error during sign-in:', error);
      req.flash('error', 'Something went wrong. Please try again.');
      return res.redirect('/signin');
    }
  });



// Start server and connect to MongoDB
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  mongoose
    .connect(`${process.env.MONGOURI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
});

const User=require("./server/models/User");

// Signup Route (Send OTP)
app.post('/signup', async (req, res) => {
  const { name, email, password, description } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      req.flash('error', 'Email is already registered. Please use a different email.');
      return res.redirect('/signup');
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save user details and OTP in session
    req.session.tempUser = { name, email, password, description };
    req.session.otp = otp;

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Team Spice and Slice: Your OTP for Signup Verification',
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    req.flash('success', 'OTP has been sent to your email.');
    res.render('verify-otp', { error: null });
  } catch (error) {
    console.error('Error during signup:', error);
    req.flash('error', 'An error occurred. Please try again later.');
    res.redirect('/signup');
  }
});



// Verify OTP Route
// app.post('/verify-otp', async (req, res) => {
//   const { otp } = req.body;

//   if (parseInt(otp) === req.session.otp) {
//     const { tempUser } = req.session;
//     console.log("otp matched");

//     try {
//       const User = mongoose.model('User');
//       const newUser = new User(tempUser);
//       await newUser.save();

//       req.session.destroy();
//       res.redirect('/signin');
//     } catch (error) {
//       console.error('Error saving user to database:', error);
//       res.status(500).send('Error saving user. Please try again.');
//     }
//   } else {
//     res.render('verify-otp', { error: 'Invalid OTP. Please try again.' }); // Include error message
//   }
// });

const bcrypt = require('bcrypt');

app.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;

  if (parseInt(otp) === req.session.otp) {
    const { name, email, password, description } = req.session.tempUser;

    try {
      // Hash the password
      const hash_password = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const User = require('./server/models/User');
      const newUser = new User({
        name,
        email,
        hash_password,
        description,
      });

      // Save the user to the database
      await newUser.save();

      // Destroy the session and redirect
      req.session.destroy();
      res.redirect('/signin');
    } catch (error) {
      console.error('Error saving user to database:', error);

      // Handle duplicate email error
      if (error.code === 11000) {
        res.render('verify-otp', { error: 'Email already registered. Try signing in.' });
      } else {
        res.status(500).send('Error saving user. Please try again.');
      }
    }
  } else {
    // Render error message for invalid OTP
    res.render('verify-otp', { error: 'Invalid OTP. Please try again.' });
  }
});

app.get('/forgot-password',(req,res)=>{
   res.render("forgot-password.ejs",{ error: null });
})


app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const User = require('./server/models/User');
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('forgot-password', { error: 'Email not registered.' });
    }

    // Generate OTP and save it to session
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    req.session.otp = otp;
    req.session.resetEmail = email;

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Team Spice and Slice : Your OTP for Password Reset',
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.render('verify-reset-otp', { email, error: null }); // Render OTP verification page
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send('Error sending OTP. Please try again.');
  }
});


app.post('/verify-reset-otp', (req, res) => {
  const { otp } = req.body;

  if (parseInt(otp) === req.session.otp) {
    // OTP is valid
    res.render('reset-password', { error: null });
  } else {
    // OTP is invalid
    res.render('verify-reset-otp', { error: 'Invalid OTP. Please try again.' });
  }
});



app.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify the email exists
    const User = require('./server/models/User');
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('reset-password', { error: 'Email not registered.' });
    }

    // Compare the old password (stored hash) with the new password
    const isSamePassword = await bcrypt.compare(password, user.hash_password);
    
    if (isSamePassword) {
      return res.render('reset-password', { error: 'New password cannot be the same as the old password.' });
    }

    // Hash the new password
    const hash_password = await bcrypt.hash(password, 10);

    // Update password in the database
    await User.updateOne({ email }, { $set: { hash_password } });

    // Redirect to the sign-in page
    res.redirect('/logout');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Error resetting password. Please try again.');
  }
});

const Recipe = require('./server/models/Recipe');
app.get('/recipes/category/:category', async (req, res) => {
  const category = req.params.category;

  try {
      // Query the database for recipes in the given category and sort them alphabetically by name
      const recipes = await Recipe.find({ category: new RegExp(category, 'i') }).sort({ name: 1 });

      // Render the EJS template with category and recipes data
      res.render('categoryrecipes', { category, recipes });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});





