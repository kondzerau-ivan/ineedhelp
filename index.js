import express from 'express';
import cowsay from 'cowsay';
import { mongoClient } from './db/connection.js';
import { users } from './routes/users.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/users', users);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

process.on('SIGINT', async () => {
    console.log('SIGINT signal received. Closing MongoDB connection...');
    await mongoClient.close();
    console.log(cowsay.say({ text: 'MongoDB connection closed' }));
    process.exit(0);
});
