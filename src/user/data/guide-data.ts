// src/data/guideData.js

export const guideData = [
  {
    id: "member-registration",
    title: "About Member Registration",
    content: [
      {
        type: "ordered-list",
        items: [
          "Please proceed with the procedure from the <a href='/account/register'>New Member Registration Page</a>.",
          {
            text: "On the new member registration screen, please enter your information.",
            subItems: [
              "All input and selection items are required.",
              "Please set a valid email address that you use.",
              "Please register a password with 5 or more characters in half-width alphanumeric."
            ]
          },
          "Please confirm “Terms of use and handling of personal information” and click “Register as a Member”.",
          "A registration completion email will be sent to the email address you registered."
        ]
      },
      {
        type: "subheading",
        title: "Notes",
        content: [
          "If there is an error in the registered email address, we will not be able to send emails from our store. Please enter it correctly when registering.",
          "If the registered email address is restricted from receiving emails, you may not be able to receive emails from our store. Please follow the settings of each carrier and remove domain rejection or set “@grayparkaservice.com” “@chikawamarket.jp” as designated receiving settings."
        ]
      }
    ]
  },
  {
    id: "orders",
    title: "About Orders",
    content: [
      {
        type: "paragraph",
        text: "If you have completed member registration, please “log in” and proceed to place an order. When ordering on this site, member registration (free) is required."
      },
      {
        type: "subheading",
        title: "How to Order",
        content: [
          {
            type: "ordered-list",
            items: [
              "When you press the “Add to Cart” button on the product page, the product will be added to the shopping cart.",
              "If you want to continue searching for products, press the “Continue Shopping” button, and if you want to proceed with the purchase procedure, press the “Proceed to Checkout” button.",
              "When the order procedure is completed, the “Thank you ☺” screen will be displayed.",
              "An “Order Confirmation Email” will be automatically sent to your registered email address."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "payment",
    title: "About Payment",
    content: [
      {
        type: "paragraph",
        text: "You can choose from the following methods."
      },
      {
        type: "unordered-list",
        items: [
          "Credit Card Payment",
          "Apple Pay",
          "Rakuten Pay",
          "Mobile Payments (PayPay / au PAY / D Payment)",
          "Postpaid Paidy"
        ]
      },
      {
        type: "subheading",
        title: "Credit Card Payment",
        content: [
          {
            type: "subheading",
            title: "Available Credit Cards",
            text: "VISA / JCB / Master Card / American Express"
          },
          {
            type: "subheading",
            title: "Payment Installments",
            list: {
              type: "unordered-list",
              items: ["One-time"]
            }
          },
          {
            type: "subheading",
            title: "Notes",
            list: {
              type: "unordered-list",
              items: [
                "The usage date (settlement date) of the credit card will be “order date” for both in-stock products/Pre-orders start.",
                "The closing date of the credit card varies depending on the card company you use. Please check with your credit card company.",
                "In the case of Pre-orders start, there may be cases where the payment is deducted before the product arrives at your hand. Please understand this in advance."
              ]
            }
          }
        ]
      }
    ]
  },

];