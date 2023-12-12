const express = require('express');
const app = express();

app.use(express.json()); // 用于解析 JSON 请求体

// 示例数据存储
let events = [];

app.get('/events', (req, res) => {
    res.json(events);
});

app.post('/events', (req, res) => {
    const event = req.body;
    event.id = events.length + 1; // 简单的 ID 分配
    events.push(event);
    res.status(201).send(`Event added with ID: ${event.id}`);
});

app.put('/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = events.findIndex(e => e.id === id);
    if (index >= 0) {
        events[index] = {...events[index], ...req.body};
        res.send('Event updated successfully');
    } else {
        res.status(404).send('Event not found');
    }
});

app.delete('/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    events = events.filter(e => e.id !== id);
   
