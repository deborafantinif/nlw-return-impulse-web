import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', () => {

    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64/test.jpg',
    })).resolves.not.toThrow();

    expect(sendMailSpy).toHaveBeenCalled();
    expect(createFeedbackSpy).toHaveBeenCalled();
  })

  it('should not be able to submit a feedback without type', () => {

    expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64/test.jpg',
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without comment', () => {

    expect(submitFeedback.execute({
      type: 'example comment',
      comment: '',
      screenshot: 'data:image/png;base64/test.jpg',
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback with an invalid screenshot', () => {

    expect(submitFeedback.execute({
      type: 'example comment',
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  })
})