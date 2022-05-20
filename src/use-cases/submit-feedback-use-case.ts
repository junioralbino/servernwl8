import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";

interface  SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}


export class SubmitFeedbackUseCase {

    constructor(
      private  feedbacksRepository: FeedbacksRepository,
      private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest) {
       const { type,  comment, screenshot} =  request;

       await this.feedbacksRepository.create({
           type,
           comment,
           screenshot,
       })
       await this.mailAdapter.sendMail({
        subject: 'Novo feedback',
        body: [
         `<div style="font-family:  sans-serif; font-size: 16px; color: #111;">`,
         `<p>tipo de feedback ${type}</p>`,
         `<p>Comentario: ${type}</p>`,
         `</div>`
     ].join('\n')
    })
   }
}