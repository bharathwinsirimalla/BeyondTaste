const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Order = require('./models/Order');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Routes
app.use('/api/auth', authRoutes);

// Admin routes
// Check if admin exists
app.get('/api/admin/exists', async (req, res) => {
    try {
        const adminExists = await User.exists({ role: 'admin' });
        res.json({ exists: adminExists });
    } catch (error) {
        res.status(500).json({ message: 'Error checking admin status', error: error.message });
    }
});

// Register admin user
app.post('/api/admin/setup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Update existing user to admin
            existingUser.role = 'admin';
            existingUser.password = password; // Let the User model handle hashing
            await existingUser.save();
            return res.status(200).json({ success: true, message: 'User updated to admin successfully' });
        }

        // Create admin user
        const adminUser = new User({
            name,
            email,
            password, // Let the User model handle hashing
            role: 'admin'
        });

        await adminUser.save();

        res.status(201).json({ success: true, message: 'Admin user created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin user', error: error.message });
    }
});

// Reset admin password
app.post('/api/admin/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find the admin user
        const adminUser = await User.findOne({ email, role: 'admin' });
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }
        
        // Update the password - let the User model handle hashing
        adminUser.password = newPassword;
        await adminUser.save();

        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
});

// Get all orders (admin only)
app.get('/api/orders', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Update order status (admin only)
app.patch('/api/orders/:orderId', isAdmin, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['pending', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beyondtaste')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 