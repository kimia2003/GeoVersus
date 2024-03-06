import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get('/message', (req, res) => {
    console.log('GET request received on /message');
    res.json({message: 'hello from node.js' });
});

app.post('/message', (req, res) => {
    console.log('POST request received on /message');
    console.log('Data received:', req.body);
    res.json({message: 'data received successfully' });

});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
    
});

export { app };