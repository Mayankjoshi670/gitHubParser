const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routs/index.js');
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/', userRouter);

app.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`);
});
