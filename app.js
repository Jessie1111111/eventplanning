const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const events = []; 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/events', (req, res) => {
    res.json(events);
});


app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    res.send('Event added successfully');
});


app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body;
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
        events[index] = updatedEvent;
        res.send('Event updated successfully');
    } else {
        res.status(404).send('Event not found');
    }
});


app.delete('/events/:id', (req, res) => {
    const id = req.params.id;
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
        events.splice(index, 1);
        res.send('Event deleted successfully');
    } else {
        res.status(404).send('Event not found');
    }
});
