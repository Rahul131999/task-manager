import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
  });
})();
