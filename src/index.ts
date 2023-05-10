import express, {Request, Response} from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const API_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
const API_KEY = process.env.API_KEY || 'DEMO_KEY';

app.get('/asteroids', async (req: Request, res:Response) => {
  const { start_date, end_date } = req.query;

  try {
    const response = await axios.get(`${API_BASE_URL}/feed`, {
      params: {
        start_date,
        end_date,
        api_key: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching asteroids data' });
  }
});

app.get('/asteroids/:id', async (req: Request, res:Response) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${API_BASE_URL}/neo/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching asteroid details' });
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

