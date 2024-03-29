import { EmailSender } from "@shared/core";

export class MockMailSender implements EmailSender {
  sendEmailMock: jest.Mock = jest.fn();
  async SendEmail(email: string, title: string, templateName: string, data?: {}): Promise<void> {
    this.sendEmailMock(email, title, templateName, data);
  }

  assertSendEmailHaveBeenCalledWith(email: string, title: string, templateName: string, data?: {}) {
    expect(this.sendEmailMock).toHaveBeenCalledWith(email, title, templateName, data);
  }
}
