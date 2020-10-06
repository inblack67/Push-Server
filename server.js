const webpush = require('web-push');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('colors');

const app = express();
dotenv.config({ path: 'config.env' });

webpush.setVapidDetails(
  'mailto:test@test.com',
  process.env.WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Deduce');
});
app.get('/api', (req, res) => {
  res.status(200).json({ success: true, msg: 'API up and running' });
});

app.post('/api', (req, res) => {
  const subscription = req.body;
  res.status(201).json({ success: true, msg: 'subscription received' });
  const payload = JSON.stringify({ title: 'Push Test' });
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.green.bold);
});
