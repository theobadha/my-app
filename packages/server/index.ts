// Import required modules
import express from 'express'; // Express framework for building the server
import dotenv from 'dotenv'; // Loads environment variables from .env file
import router from './routes'; // Import routes

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
