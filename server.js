const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let vodContent = [];

// Endpoint to add VOD content
app.post('/api/vod', (req, res) => {
    const { title, url, logo, type, groupTitle } = req.body;
    const newEntry = {
        id: vodContent.length + 1,
        title,
        url,
        logo,
        type,
        groupTitle
    };
    vodContent.push(newEntry);
    res.status(201).json({ message: 'VOD content added', entry: newEntry });
});

// Endpoint to get all VOD content, categorized by type
app.get('/api/vod', (req, res) => {
    res.json(vodContent);
});

// Endpoint to delete a VOD entry
app.delete('/api/vod/:id', (req, res) => {
    const { id } = req.params;
    vodContent = vodContent.filter(vod => vod.id != id);
    res.json({ message: 'VOD content deleted' });
});

// Endpoint to edit a VOD entry
app.put('/api/vod/:id', (req, res) => {
    const { id } = req.params;
    const index = vodContent.findIndex(vod => vod.id == id);
    if (index !== -1) {
        vodContent[index] = { ...vodContent[index], ...req.body };
        res.json({ message: 'VOD content updated', entry: vodContent[index] });
    } else {
        res.status(404).json({ message: 'VOD content not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
