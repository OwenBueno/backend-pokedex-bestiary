import mongoose from 'mongoose';

const uri = "mongodb+srv://root:lMsH7pRIo5l5SPLE@cluster0.vtu4qa3.mongodb.net/bestiary?retryWrites=true&w=majority";

let retries = 0;

const connectWithRetry = () => {
  mongoose.connect(uri);

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);

    if (retries < 3) {
      console.log(`Retrying connection... (Attempt ${retries + 1})`);
      retries++;
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.error('Failed to connect to MongoDB after 3 attempts. Exiting program.');
      process.exit(1);
    }
  });

  db.once('open', () => {
    console.log('Connected to MongoDB!');
  });
};

connectWithRetry();
export { mongoose };
