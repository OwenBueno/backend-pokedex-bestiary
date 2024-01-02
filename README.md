# Bestiary

The Bestiary Backend is a fundamental component of the MERN (MongoDB, Express.js, React, Node.js) project, responsible for handling CRUD operations, managing MongoDB with Mongoose models, implementing pagination, and enabling PDF creation. This backend component serves as the backbone, facilitating seamless communication between the frontend and the database, ensuring efficient data management, and enabling a robust user experience.

## Project Requirements

Make sure to have the following requirements installed on your system before running the project:

- Node.js 20.10+
- MongoDB Community Server 7.0.4+ or MongoDB Atlas
- Nodemon -g
- Pm2 -g
- Internet access

## Installation

Follow these steps to install and configure the project:

0. Make sure MongoDB Community Server is running in the background or use MongoDB Atlas URI.
1. Clone the repository: `https://github.com/OwenBueno/backend-pokedex-bestiary`
2. Enter the project directory: `cd backend-pokedex-bestiary`
3. Install dependencies: `npm install`
4. Create a .env file in the root with URI access and PORT of the backend: `.env`
   Example:
```env
   PORT=3001
   URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

## Project Structure

- `/`
  - `src/`: Contains the source code.
  - `src/controller`: Contains express controllers.
  - `src/models`: Contains mongoose models.
  - `src/objects`: Contains object intances.
  - `src/utils`: Contains utils.

## Usage

Build the project:
```bash
npm run build
```

To test in dev mode:
```bash
npm run dev
```

To start in pm2 mode:
```bash
npm run start
```

To restart in pm2 mode:
```bash
npm run restart
```

To stop in pm2 mode:
```bash
npm run stop
```

## Contact

https://www.linkedin.com/in/owenbueno/

# License

MIT License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
