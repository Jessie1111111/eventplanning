import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const events = [];

app.use(express.json());

app.use(express.static(path.join(__dirname, './public'),{index:"index.html"}));

app.get('/all-event', (req, res) => {
    res.json(events);
});

app.post('/create-event', (req, res) => {
    const createEvent = req.body.event;
    events.push(createEvent);
    res.json(createEvent);
});

app.post('/update-event', (req, res) => {
    const {event,index} = req.body;
    events[index] = event;
    res.json(event);
});

app.post('/delete-event', (req, res) => {
    const {index} = req.body;
    events.splice(index, 1);
    res.json({ message: 'Event deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
