const express = require('express');
const cors = require('cors');
const costRoutes = require('./routes/cost');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', costRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 