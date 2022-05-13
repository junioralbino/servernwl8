import { prisma } from "./prisma";
import nodemailer from 'nodemailer';
import express from "express";



const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "692c8a44c56341",
    pass: "7c2cde39bc7fec"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot}  = req.body;

  const feedback = await prisma.feedback.create({
      data:  {
        type,
        comment,
        screenshot
      }
  })
  
  await transport.sendMail({
    from: 'Equipe do feeedget <oi@feedget.com>',
    to: 'Junior Albino <junior@gmail.com>',
    subject: 'Novo feedback enviando pelo usuario',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111; ">`,
      `<p>Tipo de feedback: ${type} </p>`,
      `<p>Comentário: ${comment} </p>`,
      `</div>`,
    ].join('\n')
  })

  return res.status(201).json({ data: feedback})
});

app.listen(3333, () => {
 console.log('HTTP server Runing')
});