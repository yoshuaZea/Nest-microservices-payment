import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      status: true,
      message: 'Payment successful',
    };
  }

  @Get('cancelled')
  cancel() {
    return {
      status: false,
      message: 'Payment cancelled',
    };
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }
}
