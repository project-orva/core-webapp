import express from 'express';

const PORT = 3006;

const app = express()
app.use(express.bodyParser());


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))