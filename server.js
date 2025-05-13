// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get all orders (admin only)
app.get('/api/orders', isAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        
        const formattedOrders = orders.map(order => ({
            id: order._id,
            customerName: order.userId.name,
            items: order.items,
            total: order.total,
            status: order.status,
            date: order.createdAt
        }));

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Update order status (admin only)
app.patch('/api/orders/:orderId', isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

// Check if admin exists
app.get('/api/admin/exists', async (req, res) => {
    try {
        const adminExists = await User.exists({ role: 'admin' });
        res.json({ exists: adminExists });
    } catch (error) {
        res.status(500).json({ message: 'Error checking admin status', error: error.message });
    }
});

// Register admin user (only if no admin exists)
app.post('/api/admin/setup', async (req, res) => {
    try {
        // Check if admin already exists
        const adminExists = await User.exists({ role: 'admin' });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin user already exists' });
        }

        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const adminUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();

        res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin user', error: error.message });
    }
}); 