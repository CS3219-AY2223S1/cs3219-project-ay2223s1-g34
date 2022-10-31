import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "https";

import router from "./routes/routes.js";
import { initIo } from "./socket.js";

const PORT = process.env.PORT || 8001;

const app = express();

// start routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true })); // config cors so that front-end can use
app.options("*", cors());

app.use("/api/matching", router);

const httpServer = createServer(app);

// listen to io
initIo(httpServer);

// start server
httpServer.listen(PORT, async () => {
    console.log("matching-service listening on port " + PORT);
});
