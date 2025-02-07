const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());
server.use(middlewares);

// Middleware to simulate authentication
server.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer your-secret-token") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
