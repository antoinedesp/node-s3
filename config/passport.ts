import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Adjust the import based on your project structure

// Configure the local strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'username', // Adjust based on your form input names
    passwordField: 'password',
  },
  async (username: string, password: string, done: Function) => {
    try {
      // Find the user by username
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user information into the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
