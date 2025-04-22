const express = require('express');
const connectDB = require('./config/db');
const smileTestRoutes = require('./routes/smileTestRoutes');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use('/api/smiletest', smileTestRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
