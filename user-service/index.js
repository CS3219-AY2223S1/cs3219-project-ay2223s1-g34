import express from "express";
import cors from "cors";
import cookies from "cookie-parser";

import {
	createUser,
	signIn,
	deleteUser,
	changePassword,
	logout,
	forgotPassword,
	resetPassword,
	verifyEmail,
	sendVerifyEmail,
	auth
} from "./controller/user-controller.js";
import { isAuth } from "./middleware/auth.js";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookies());
app.use(cors({ origin: true, credentials: true })); // config cors so that front-end can use
app.options("*", cors());

// Router
const router = express.Router();
router.post("/checkauth/:email", isAuth, auth);
router.post("/sendverify/:email", sendVerifyEmail);
router.post("/verify/:token", verifyEmail);
router.post("/createacc", createUser);
router.post("/signin", signIn);
router.delete("/deleteacc/:email", isAuth, deleteUser);
router.put("/changepw/:email", isAuth, changePassword);
router.put("/resetpw/:token", resetPassword);
router.post("/logout", logout);
router.post("/forgotpw/:email", forgotPassword);

app.use("/api/user", router).all((_, res) => {
	res.setHeader("content-type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(PORT, () => console.log(`user-service listening on port ${PORT}`));

export default app