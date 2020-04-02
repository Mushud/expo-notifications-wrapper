const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { sendSingleNotification } = require('./Services/Notification');
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
	res.send('Welcome to the notification Expo notification Portal');
});

app.post('/send', async (req, res) => {
	const notification = sendSingleNotification(req.body);
	res
		.status(notification.statusCode)
		.send(notification.message && notification.details);
});

app.listen(PORT, () => {
	console.log('Server started successfully');
});
