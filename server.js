const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const smileTestRoutes = require('./routes/smileTestRoutes');
const SmileTest = require('./models/SmileTest');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/smiletest', smileTestRoutes);

app.get('/', async (req, res) => {
  const smileTests = await SmileTest.find();
  let listItems = smileTests.map(test => `
    <li class="flex justify-between items-center p-2 border-b">
      <span>${test.name}: ${test.description}</span>
      <form method="POST" action="/api/smiletest/delete/${test._id}" class="inline">
        <button type="submit" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </form>
    </li>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Smile Test Entries</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 p-8">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-4">Smile Test Entries</h1>
        <ul class="mb-6">${listItems}</ul>
        <h2 class="text-xl font-semibold mb-2">Add New Entry</h2>
        <form method="POST" action="/api/smiletest/add" class="flex flex-col space-y-4">
          <input name="name" placeholder="Name" required class="border p-2 rounded">
          <input name="description" placeholder="Description" class="border p-2 rounded">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
