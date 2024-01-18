const express = require('express');
const mongoose = require('mongoose');
const passport = require('./passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');

const app = express();

mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      return done(null, false, { message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use(new GitHubStrategy({
  clientID: 'your-github-client-id',
  clientSecret: 'your-github-client-secret',
  callbackURL: 'http://localhost:3000/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ githubId: profile.id });

    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      githubId: profile.id,
      email: profile.emails[0].value,
    });

    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/api/products',
  failureRedirect: '/login',
  failureFlash: true,
}));

app.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

app.post('/register', passport.authenticate('local-register', {
  successRedirect: '/api/products',
  failureRedirect: '/register',
  failureFlash: true,
}));

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/api/products',
    failureRedirect: '/login',
  })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






