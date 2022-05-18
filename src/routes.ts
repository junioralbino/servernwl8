import express from "express";
import nodemailer from 'nodemailer';
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes =  express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "692c8a44c56341",
      pass: "7c2cde39bc7fec"
    }
  });

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot}  = req.body;

    const prismaFeedbackRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbackRepository
    )

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });
  
    return res.status(201).send();
  });