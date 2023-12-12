const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/events', (req, res) => {
    res.json({ events: [] });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
