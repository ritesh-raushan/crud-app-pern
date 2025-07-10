import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Backend!')
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});