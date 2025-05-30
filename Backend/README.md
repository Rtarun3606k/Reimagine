# Reimagine Backend

<div align="center">
  <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=339933" alt="nodejs" />
  <img src="https://img.shields.io/badge/-Express.js-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="express" />
  <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
  <img src="https://img.shields.io/badge/-JWT-black?style=for-the-badge&logoColor=white&logo=jsonwebtokens&color=000000" alt="jwt" />
  <img src="https://img.shields.io/badge/-bcrypt-black?style=for-the-badge&logoColor=white&logo=security&color=FF6B6B" alt="bcrypt" />
</div>

## Overview

A robust Node.js backend API built with Express.js and MongoDB, providing secure authentication, product management, and user services for the Reimagine iPhone showcase application. Features JWT-based authentication, RESTful API design, and comprehensive data validation.

## 🚀 Features

### Core Functionality

- **RESTful API Architecture** - Clean, predictable API endpoints
- **JWT Authentication** - Secure token-based user authentication
- **User Management** - Registration, login, and profile management
- **Product Catalog** - Complete CRUD operations for iPhone products
- **Image Upload** - Secure file upload and management system
- **Order Processing** - Shopping cart and order placement functionality
- **Admin Dashboard** - Administrative controls and user management
- **CORS Support** - Cross-origin resource sharing configuration

### Security Features

- **Password Hashing** - bcrypt encryption for user passwords
- **Token Validation** - Middleware for protected route authentication
- **Input Sanitization** - Data validation and sanitization
- **Error Handling** - Comprehensive error management and logging

## 🛠️ Tech Stack

### Core Technologies

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js

### Authentication & Security

- **JSON Web Tokens (JWT)** - Stateless authentication
- **bcrypt** - Password hashing and encryption
- **cors** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### Development Tools

- **nodemon** - Development server with auto-restart
- **express.json()** - Built-in JSON parsing middleware

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn package manager

### Setup Instructions

1. **Navigate to backend directory**

   ```bash
   cd Reimagine/Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the Backend directory:

   ```env
   PORT=3000
   DB_CONNECTION_STRING=mongodb://localhost:27017/express
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   BCRYPT_ROUNDS=12
   ```

4. **Start MongoDB**

   ```bash
   # For local MongoDB installation
   mongod

   # Or use MongoDB Atlas cloud connection
   # Update DB_CONNECTION_STRING in .env accordingly
   ```

5. **Start development server**

   ```bash
   npm start
   ```

6. **For development with auto-restart**
   ```bash
   npm run dev
   ```

## 🗂️ Project Structure

```
Backend/
├── app.js                 # Main application entry point
├── package.json          # Dependencies and scripts
├── Controllers/          # Request handling logic
│   └── Login.controller.js
├── Middleware/           # Custom middleware functions
│   └── authMiddleware.js
├── Models/               # Database schemas and models
│   ├── User.model.js
│   ├── Products.model.js
│   └── Image_model.js
└── Routes/               # API route definitions
    ├── User.routes.js
    ├── Login_Register.routes.js
    ├── Products.routes.js
    ├── GetProducts.js
    ├── Image_upload.js
    └── CheckTokens.routes.js
```

## 🔌 API Endpoints

### Authentication Routes (`/login_register`)

```bash
POST /login_register/login          # User login
POST /login_register/register       # User registration
GET  /login_register/get_all_users  # Get all users (admin)
```

### User Management (`/user`)

```bash
GET  /user/user           # Get current user profile (protected)
GET  /user/userall        # Get all users (admin)
POST /user/order/:model   # Place product order (protected)
PUT  /user/profile        # Update user profile (protected)
```

### Product Management (`/products`)

```bash
GET    /products/allProducts     # Get all products
POST   /products/create          # Create new product (admin)
PUT    /products/update/:id      # Update product (admin)
DELETE /products/delete/:id      # Delete product (admin)
```

### Product Retrieval (`/single`)

```bash
GET /single/single/:model        # Get specific product by model
```

### Image Management (`/image`)

```bash
POST /image/upload              # Upload product images
GET  /image/:filename           # Retrieve uploaded images
```

### Token Validation (`/check_tokens`)

```bash
POST /check_tokens/verify       # Validate JWT tokens
POST /check_tokens/refresh      # Refresh expired tokens
```

## 📊 Database Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  dateOfBirth: Date,
  phoneCountryCode: String,
  phone: String,
  address: {
    address: String,
    city: String,
    country: String,
    zipCode: String
  },
  role: String (default: "user"),
  createdAt: Date (default: Date.now),
  updatedAt: Date
}
```

### Product Model

```javascript
{
  name: String (required),
  model: String (required, unique),
  description: String,
  price: Number (required),
  image: [String],
  colors: [String],
  sizes: [String],
  stock: Number (default: 0),
  category: String,
  features: [String],
  reviews: [String],
  rating: Number (default: 0),
  createdAt: Date (default: Date.now),
  updatedAt: Date
}
```

### Image Model

```javascript
{
  filename: String (required),
  originalName: String,
  mimetype: String,
  size: Number,
  uploadDate: Date (default: Date.now),
  associatedProduct: ObjectId (ref: 'Product')
}
```

## 🔐 Authentication Flow

### Registration Process

1. User submits registration form
2. Server validates input data
3. Password is hashed using bcrypt
4. User data is stored in MongoDB
5. JWT token is generated and returned
6. Client stores token for authenticated requests

### Login Process

1. User submits login credentials
2. Server validates email and password
3. Password is compared with stored hash
4. JWT token is generated upon successful validation
5. Token includes user ID and role information
6. Client receives token for subsequent API calls

### Protected Routes

1. Client includes JWT token in Authorization header
2. authMiddleware validates token signature
3. Decoded user information is attached to request
4. Route handler processes authenticated request
5. Response includes requested data or operations

## 🛡️ Security Implementation

### Password Security

- **bcrypt Hashing** - Industry-standard password encryption
- **Salt Rounds** - Configurable hashing complexity (default: 12)
- **Password Validation** - Minimum length and complexity requirements

### JWT Security

- **Secret Key** - Environment-based secret for token signing
- **Expiration** - Configurable token lifetime (default: 7 days)
- **Payload Validation** - User ID and role verification
- **Secure Headers** - Proper Authorization header handling

### Data Validation

- **Input Sanitization** - MongoDB injection prevention
- **Schema Validation** - Mongoose model validation
- **Error Handling** - Secure error messages without data exposure

## 🚀 Available Scripts

```bash
# Production
npm start              # Start production server

# Development
npm run dev           # Start with nodemon auto-restart
npm run debug         # Start with debugging enabled

# Database
npm run db:seed       # Seed database with sample data
npm run db:reset      # Reset database to initial state

# Testing
npm test              # Run test suite
npm run test:watch    # Run tests with file watching
```

## 🌐 CORS Configuration

```javascript
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend development server
    credentials: true, // Allow cookies and auth headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

## 📝 Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DB_CONNECTION_STRING=mongodb://localhost:27017/express
DB_NAME=reimagine_db

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes

# CORS
FRONTEND_URL=http://localhost:5173
```

## 🔧 Configuration

### MongoDB Connection

```javascript
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
```

### Express Middleware Stack

```javascript
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
```

## 🐛 Error Handling

### Global Error Handler

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});
```

### Custom Error Classes

- **ValidationError** - Input validation failures
- **AuthenticationError** - Login and token errors
- **AuthorizationError** - Permission denied scenarios
- **NotFoundError** - Resource not found cases

## 📊 Logging

### Request Logging

- HTTP method and endpoint tracking
- Response time monitoring
- Error occurrence logging
- User activity tracking

### Database Logging

- Query performance monitoring
- Connection status tracking
- Error logging and alerting

## 🚦 Status Monitoring

### Health Check Endpoint

```bash
GET /health
Response: {
  status: "healthy",
  database: "connected",
  uptime: "2h 34m 12s",
  memory: "125MB",
  timestamp: "2025-05-30T10:30:00Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/api-improvement`)
3. Commit changes (`git commit -m 'Add new API endpoint'`)
4. Push to branch (`git push origin feature/api-improvement`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Express.js Community** - Robust web framework
- **MongoDB** - Flexible NoSQL database
- **JWT.io** - Token-based authentication standard
- **bcrypt** - Secure password hashing library
