package com.example.razorpay;

import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("pay")
public class PayController {

    private String key_id= "rzp_test_G63KJkDTY50lYR";
    private String key_secret= "FMSvysUhmplphKcGtW2WabQQ";
    RazorpayClient razorpayClient;

    PayController() {
        try {
            razorpayClient = new RazorpayClient(key_id, key_secret);
        } catch (RazorpayException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("list")
    public String getPaymentsAll() throws RazorpayException {
        List<Payment> payments = razorpayClient.Payments.fetchAll();
        return payments.toString();
    }

    @PostMapping("order")
    public String createOrder() {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", 2000); // amount in the smallest currency unit
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_rcptid_11");

        Order order = null;
        try {
            order = razorpayClient.Orders.create(orderRequest);
        } catch (RazorpayException e) {
            e.printStackTrace();
        }

        return order.toString();
    }


}
