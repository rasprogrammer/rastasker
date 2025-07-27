const User = require('@/models/User');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Here, save the user to your DB if needed
      console.log("Google profile:", profile);
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }

        // verify email already exists or not 
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName,
          surname: profile.name.familyName,
          photo: profile.photos[0].value,
          enabled: true, // Default to enabled
        });

        // If you need to create a UserPassword entry, do it here
        // await UserPassword.create({ user: newUser._id, password: '', salt: '' });

        return done(null, newUser);
      } catch (error) {
        return done(null, error);
      }
    }
  )
);
