
// General Imports
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
var cookieParser = require('cookie-parser')
import methodOverride from 'method-override';

// Middlewares
import { setUserAuthentication } from './middlewares/authMiddleware';

// Routers
import authRouter from './routes/authRouter';
import furnitureRouter from './routes/furnitureRouter';
import dashboardRouter from './routes/dashboardRouter';
import materialRouter from './routes/materialRouter';
import supplierRouter from './routes/supplierRouter';


// Configurations
import './config/passport'; // Configure Passport strategies
import sequelize from './models/instance'; // Ensure Sequelize instance is imported

// Initialize express
const app = express();

// Cookie Parser
app.use(cookieParser())

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Override with POST having ?_method=PUT or ?_method=DELETE
app.use(methodOverride('_method'));

// Serve static files
app.use(express.static('public'));

// Session and Passport middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Middleware to set isAuthenticated in locals
app.use(setUserAuthentication);

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', 'views');

// Routes
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter); 
app.use('/furniture', furnitureRouter); 
app.use('/dashboard', dashboardRouter); 
app.use('/material', materialRouter); 
app.use('/supplier', supplierRouter); 

// Default route
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// Error handling middleware (example)
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Sync Sequelize models with database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });