import { Request, Response } from "express";
import { MailService } from "../service/mail_service";

export const sendMail = async (req: Request, res: Response) => {
  const { email, name, message, subject } = req.body;
  if (!email || !name) {
    return res.status(400).send("Missing email or name");
  }
  try {
    const response = await MailService({ email, name, message, subject });
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send("Error sending mail");
  }
};
