// import package
import "./config/env"
import express from "express";
import cors from "cors";
// controller
import { sendMail } from "./controller/mail_controller";
// initialize express
const app = express();
// initialize middleware
app.use(cors());
app.use(express.json());
// port
const port = process.env.PORT || 5000;
// route
app.get("/", (req, res) => {
  res.send("Mail server brr");
});
app.post("/", sendMail);
// initialize server
app.listen(port, () => console.log(`server is running on port ${port}`));
