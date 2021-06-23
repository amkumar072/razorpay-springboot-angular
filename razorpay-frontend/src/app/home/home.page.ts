/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener } from '@angular/core';

declare let Razorpay: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  orderService: any;
  paymentId: any;
  error: any;

  constructor() { }


  //TESt

  // eslint-disable-next-line @typescript-eslint/member-ordering
  options = {
    key: 'rzp_test_G63KJkDTY50lYR', // Enter the Key ID generated from the Dashboard
    amount: '100', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Acme Corp',
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: 'order_HQUJuAtDVFP0cJ', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) => {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9999999999'
    },
    notes: {
      address: 'Razorpay Corporate Office'
    },
    theme: {
      color: '#3399cc'
    }
  };


  onPaySubmit() {
    const rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', (response) => {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
  };

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: { detail: any; }): void {
    this.orderService.updateOrder(event.detail).subscribe(
      (data: { message: any; }) => {
        this.paymentId = data.message;
      },
      (err: { error: { message: any; }; }) => {
        this.error = err.error.message;
      }
    );
  }
}
