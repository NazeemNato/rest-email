import { Notifire, ChannelTypeEnum } from "@notifire/core";
import { NodemailerProvider } from "@notifire/nodemailer";

type mail = {
  subject?: string;
  name: string;
  email: string;
  message?: string;
};

export const MailService = async (mail: mail) => {
  try {
    const notifire = new Notifire();

    await notifire.registerProvider(
      new NodemailerProvider({
        from: process.env.FROM_MAIL!,
        host: process.env.MAIL_SMTP_HOST!,
        port: 465,
        secure: true,
        user: process.env.FROM_MAIL!,
        password: process.env.MAIL_PASSWORD!,
      })
    );
    const message = mail.message || "Welcome to Automation world";
    const subject = mail.subject || "Beep beep 🤖";
    
    await notifire.registerTemplate({
      id: "greeting-mail",
      messages: [
        {
          subject,
          channel: ChannelTypeEnum.EMAIL,
          template: `
              <h1>Hello {{name}}</h1>
                <p>${message}</p>
              Sincerely, 🤖
          `,
        },
      ],
    });

    await notifire.trigger("greeting-mail", {
      $user_id: `${mail.email}-${mail.name}-${new Date().toISOString}`,
      $email: mail.email,
      name: mail.name,
    });

    return "Email send successfully";
  } catch (e) {
    console.log(e);
    return "Something went wrong";
  }
};
