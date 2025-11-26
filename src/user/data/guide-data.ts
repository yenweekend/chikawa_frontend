// src/data/guideData.js

export const guideData = [
  {
    id: "guide01",
    title: "About Member Registration",
    content: [
      {
        type: "paragraph",
        text: "There are no membership fees or annual fees."
      },
      {
        type: "paragraph",
        text: "If you wish to place an order, member registration (free) is required."
      },
      {
        type: "subheading",
        title: "◎ How to Register as a Member",
        content: [
          {
            type: "unordered-list",
            items: [
              "Please proceed with the procedure from the <a href='/account/register'>New Member Registration Page</a>.",
              "On the new member registration screen, please enter your information.",
              "All input and selection items are required.",
              "Please set a valid email address that you use.",
              "Please register a password with 5 or more characters in half-width alphanumeric.",
              'Please confirm "Terms of use and handling of personal information" and click "Register as a Member".',
              "A registration completion email will be sent to the email address you registered."
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "◎ Notes",
        content: [
          {
            type: "unordered-list",
            items: [
              "If there is an error in the registered email address, we will not be able to send emails from our store. Please enter it correctly when registering.",
              'If the registered email address is restricted from receiving emails, you may not be able to receive emails from our store. Please follow the settings of each carrier and remove domain rejection or set "@grayparkaservice.com" "@chiikawamarket.jp" as designated receiving settings.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: "guide02",
    title: "About Orders",
    content: [
      {
        type: "paragraph",
        text: 'If you have completed member registration, please "log in" and proceed to place an order. When ordering on this site, member registration (free) is required.'
      },
      {
        type: "subheading",
        title: "◎ How to Order",
        content: [
          {
            type: "unordered-list",
            items: [
              'When you press the "Add to Cart" button on the product page, the product will be added to the shopping cart.',
              'If you want to continue searching for products, press the "Continue Shopping" button, and if you want to proceed with the purchase procedure, press the "Proceed to Checkout" button.',
              'When the order procedure is completed, the "Thank you! ○○" screen will be displayed.',
              "An \"Order Confirmation Email\" will be automatically sent to your registered email address."
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "◎ Notes",
        content: [
          {
            type: "unordered-list",
            items: [
              "Adding a product to the cart does not guarantee that the product is reserved. The product is reserved at the same time as the order procedure is completed.",
              "You cannot place an order that combines Pre-orders start and regular products.",
              "Changes or cancellations cannot be accepted after an order is placed. Please place your order after agreeing to this.",
              "If you do not receive the order confirmation email, there may be a possibility of receiving it in the spam folder, incorrect email settings by the customer, or incorrect email address entry. Please check and contact us from the Inquiry form.",
              "We do not accept gift wrapping.",
              "Please make sure there are no mistakes in the input of the delivery destination information before completing your order.<strong>We cannot handle address changes (redelivery) after shipping from our store, so please contact Yamato Transport yourself.</strong> We cannot guarantee any additional shipping charges incurred due to address changes (redelivery). Please check here for details.",
              "When ordering Plush or Mascot products, please be sure to check the quality standards posted on this page. At our store, these cases are set as quality standards, so we ask that you place your order after understanding in advance.",
              "Orders exceeding the limited quantity will be canceled. Please purchase according to the limited quantity."
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "◎ About Cancellations",
        content: [
          {
            type: "paragraph",
            text: "As a rule, we do not accept order cancellations. Please place your order after understanding this in advance."
          }
        ]
      }
    ]
  },
  {
    id: "guide03",
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
        title: "● Credit Card Payment",
        content: [
          {
            type: "subheading",
            title: "◎ Available Credit Cards",
            content: [
              {
                type: "unordered-list",
                items: [
                  "VISA / JCB / Master Card / American Express"
                ]
              }
            ]
          },
          {
            type: "subheading",
            title: "◎ Payment Installments",
            content: [
              {
                type: "unordered-list",
                items: [
                  "One-time"
                ]
              }
            ]
          },
          {
            type: "subheading",
            title: "◎ Notes",
            content: [
              {
                type: "unordered-list",
                items: [
                  "The usage date (settlement date) of the credit card will be \"order date\" for both in-stock products/Pre-orders start.",
                  "The closing date of the credit card varies depending on the card company you use. Please check with your credit card company.",
                  "In the case of Pre-orders start, there may be cases where the payment is deducted before the product arrives at your hand. Please understand this in advance."
                ]
              }
            ]
          },
          {
            type: "subheading",
            title: "◎ About Registration of Credit Card Number",
            content: [
              {
                type: "paragraph",
                text: 'If you register your email address and mobile phone number with "Shop Pay", you can simply enter the 6-digit code sent via SMS to your registered mobile phone number during the next purchase, making it easy to make payments without re-entering your credit card information.'
              },
              {
                type: "paragraph",
                text: "*The Shop Pay app does not support Japanese and cannot input addresses in Japanese, so please register from the web page."
              },
              {
                type: "paragraph",
                text: '⇒<a href="http://localhost:5173/account/login" target="_blank">Register/Login to Shop Pay here (external site)</a>' // Thay đổi link thực tế nếu có
              }
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "● Apple Pay",
        content: [
          {
            type: "subheading",
            title: "◎ Payment Method",
            content: [
              {
                type: "paragraph",
                text: "Tap the Apple Pay button displayed on the checkout screen and log in to Apple. After logging in, select the registered delivery destination and credit card, etc., and complete the procedure."
              },
              {
                type: "paragraph",
                text: "*Please check the official Apple page for setup methods."
              }
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "●Rakuten Pay",
        content: [
          {
            type: "paragraph",
            text: "You can make smooth payments using your usual Rakuten ID and password. Earn and use Rakuten Points! Enjoy the simple, secure, and rewarding Rakuten Pay service."
          },
          {
            type: "paragraph",
            text: "*Rakuten Points can only be earned when paying with a Rakuten Card, Rakuten Points, or Rakuten Cash."
          },
          {
            type: "subheading",
            title: "◎Payment Method",
            content: [
              {
                type: "unordered-list",
                items: [
                  "At checkout, select \"Rakuten Pay\" and click \"Place your order.\"",
                  "After tapping \"Order Complete,\" you will be redirected to KOMOJU’s payment screen.",
                  "You will then be taken to the Rakuten login screen. Please log in with your Rakuten ID.",
                  "Review the information on the Rakuten Pay page and complete your payment."
                ]
              }
            ]
          },
          {
            type: "subheading",
            title: "◎Regarding Payment History",
            content: [
              {
                type: "paragraph",
                text: "For details on your Rakuten Points usage, please refer to the automatic confirmation email sent from Rakuten or check your Rakuten Pay usage history."
              }
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "●Mobile Payments (PayPay / au PAY / D Payment)",
        content: [
          {
            type: "paragraph",
            text: "This is a digital payment method using QR codes or dedicated smartphone apps. Our store uses KOMOJU as the payment service provider.<strong>To use these services, you must register with PayPay, au PAY, or D Payment in advance.</strong>"
          },
          {
            type: "subheading",
            title: "◎Available Mobile Payment Options",
            content: [
              {
                type: "unordered-list",
                items: [
                  "PayPay",
                  "au PAY",
                  "D Payment"
                ]
              }
            ]
          },
          {
            type: "subheading",
            title: "◎How to Pay",
            content: [
              {
                type: "subheading",
                title: "[When accessing from a smartphone]",
                content: [
                  {
                    type: "unordered-list",
                    items: [
                      "At checkout, select your preferred payment method.",
                      "After tapping \"Order Complete,\" you will be redirected to the KOMOJU payment screen.",
                      "Confirm the payment amount shown and tap \"Proceed.\"",
                      "Your mobile payment app will open. Follow the instructions and tap \"Pay.\""
                    ]
                  }
                ]
              },
              {
                type: "subheading",
                title: "[When accessing from a PC]",
                content: [
                  {
                    type: "unordered-list",
                    items: [
                      "At checkout, select your preferred payment method.",
                      "After tapping \"Order Complete,\" you will be redirected to the KOMOJU payment screen.",
                      "A QR code will be displayed. Scan it with your smartphone that has the relevant payment app installed to proceed with payment."
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "subheading",
            title: "◎Important Notes",
            content: [
              {
                type: "paragraph",
                text: "Please complete the payment within the following time limits after switching to each mobile app: PayPay: Within 5 minutes, au PAY: Within 5 minutes, D Payment: Within 5 minutes"
              }
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "●Post-payment with Paidy",
        content: [
          {
            type: "paragraph",
            text: "Paidy allows you to consolidate and pay your bill at a convenience store or bank the following month. There is no transaction fee for each purchase, but the payment method for the billing month may incur different fees. Please check the official Paidy page for details."
          },
          {
            type: "subheading",
            title: "◎Payment Methods",
            content: [
              {
                type: "unordered-list",
                items: [
                  "When ordering, select \"Post-payment Paidy\" as the payment method and enter your email address and mobile phone number.",
                  "Enter the 4-digit verification code sent via SMS, and your order will be complete.",
                  "You will receive a notification of the billing amount via email and SMS from Paidy between the 1st and 5th of the following month, so please select a payment method and pay by the 27th of the following month. ※Important※<strong>From the usage in June 2024, the payment due date and billing amount notification (email or SMS) will be extended.</strong>",
                  "<strong>【For orders placed before June 2024】</strong> Example: In the case of an order placed on May 1, 2024 - Payment notification: Between June 1 and 3, a notification of the billing amount will be sent via email and SMS from Paidy. - Payment deadline: June 10",
                  "<strong>【For orders placed after June 2024】</strong> Example: In the case of an order placed on June 1, 2024 - Payment notification: Between July 1 and 5, a notification of the billing amount will be sent via email and SMS from Paidy. - Payment deadline: July 27"
                ]
              }
            ]
          },
          {
            type: "paragraph",
            text: "※For details, please check the official Paidy page."
          }
        ]
      }
    ]
  },
  {
    id: "guide04",
    title: "About Delivery",
    content: [
      {
        type: "subheading",
        title: "◎Delivery Company",
        content: [
          {
            type: "paragraph",
            text: "We will ship via Yamato Transport's Takkyubin."
          }
        ]
      },
      {
        type: "subheading",
        title: "◎Shipping Fees",
        content: [
          {
            type: "paragraph",
            text: "If the order amount is ¥11,000 (including tax) or more, shipping is free. ※Excludes Okinawa Prefecture"
          },
          {
            type: "paragraph",
            text: " Hokkaido | ¥1,320 | \n|---|---| \n| Tohoku | ¥1,100 | \n| Kanto | ¥990 | \n| Chubu | ¥990 | \n| Kinki | ¥1,045 | \n| Chugoku | ¥1,100 | \n| Shikoku | ¥1,100 | \n| Kyushu | ¥1,320 | \n| Okinawa | ¥4,070 | \n※All amounts include tax"
          }
        ]
      },
      {
        type: "subheading",
        title: "◎Days from Order to Shipping",
        content: [
          {
            type: "paragraph",
            text: "For items in stock, we will ship within 7 business days excluding weekends and holidays from the \"Order Date\". For Pre-orders start, we will ship within 7 business days excluding weekends and holidays from the \"Product Release Date\"."
          }
        ]
      },
      {
        type: "subheading",
        title: "◎Delivery Status after Shipment",
        content: [
          {
            type: "paragraph",
            text: "After the ordered product is shipped, please check the \"Shipping Notification Email\" sent to your registered email address. It includes the Yamato Inquiry number and a URL to check the delivery status."
          }
        ]
      },
      {
        type: "subheading",
        title: "◎Important Notes",
        content: [
          {
            type: "unordered-list",
            items: [
              "Each order number (order number) will be shipped individually. Multiple orders cannot be combined.",
              "You cannot specify the delivery date and time.",
              "There is no shipping on weekends and holidays.",
              "Deliveries are only within Japan, and no overseas shipments are made.",
              "<strong>For address changes after shipment from our store, please contact Yamato Transport directly.</strong> ※Important※We cannot handle transfer requests from our store to Yamato Transport.",
              "<strong>From shipments on June 1, 2023 (Thursday), a shipping fee will be incurred for address changes (re-delivery) with Yamato Transport.</strong> In cases such as \"incorrect delivery address\", \"long-term absence\", \"relocation\", etc.",
              "<strong>if the delivery destination is changed to an address different from that listed on the delivery slip, an additional shipping fee will be incurred, and the \"recipient\" will be responsible for the additional shipping fee (cash on delivery).</strong> Also, we cannot guarantee shipping fees incurred additionally due to the transfer. Please check here for details."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "guide05",
    title: "About Returns and Exchanges",
    content: [
      {
        type: "paragraph",
        text: "When the product arrives, please first check \"if there are any damages or defects in the product\" and \"if it matches the order details.\""
      },
      {
        type: "subheading",
        title: "○ Returns and Exchanges Due to Customer Convenience",
        content: [
          {
            type: "paragraph",
            text: "We do not accept returns or exchanges due to customer convenience. Please check the color, size, content, features, delivery period, and precautions of the product before ordering."
          }
        ]
      },
      {
        type: "subheading",
        title: "○ Returns and Exchanges Due to Product Defects",
        content: [
          {
            type: "paragraph",
            text: "Although we strive for perfection, in the unlikely event that a defective product such as damage occurs, or if a product different from the order arrives, we will respond to returns and exchanges."
          },
          {
            type: "paragraph",
            text: "【Within 7 days after product arrival】 Please specify the \"product name\" and \"quantity\" and contact us via the Inquiry form. After confirming the contents, we will contact you again from our store. Note that if a replacement product is not available, such as for sold-out items, we may respond with a refund, so please understand in advance."
          },
          {
            type: "paragraph",
            text: "【Cases where returns or exchanges will not be accepted】"
          },
          {
            type: "unordered-list",
            items: [
              "If you contact us after 【within 7 days after product arrival】",
              "If the product is returned without prior contact",
              "If damage or breakage occurs after the customer has used the product",
              "Requests for returns or exchanges from someone other than the purchaser",
              "If purchased outside the official route such as an auction site",
              "If purchased at a store other than our store",
              "Due to manufacturing specifications or individual differences",
              "Other cases where defects are not recognized based on our company regulations"
            ]
          },
          {
            type: "paragraph",
            text: "※Plush, Mascot products have set quality standards. Please check this page for details."
          }
        ]
      },
      {
        type: "subheading",
        title: "○ Cases Where the Product Was Returned to the Store Without Being Received",
        content: [
          {
            type: "paragraph",
            text: "If the product is returned to our store after shipment because the customer did not receive it (including refusal of receipt, expiration of the storage period due to absence, or unclear address, but not limited to these), we will notify the registered email address. If you wish to have the product reshipped, please contact us by replying to the email from our store within one month after the email notification. Note that reshipment will be made with postage due. If there is no response or receipt even after one month from the email notification, we will treat the order as canceled and charge the following costs to the customer. If the product price was paid in advance, any remaining amount after deducting the customer's share will be refunded."
          },
          {
            type: "unordered-list",
            items: [
              "Delivery fee",
              "Actual costs such as handling fees incurred for the ordered product (including wrapping fees and various service handling fees, but not limited to these)."
            ]
          }
        ]
      },
      {
        type: "subheading",
        title: "○ Cases Where the Customer Used an Overseas Shipping Proxy Service",
        content: [
          {
            type: "paragraph",
            text: "Our store only delivers within Japan. If the product is shipped overseas using an overseas shipping proxy service, please understand the following items in advance."
          },
          {
            type: "unordered-list",
            items: [
              "Even if the product is damaged \"after arrival overseas,\" we cannot accept exchanges or returns.",
              "Even if shortages or mistakes are discovered \"after arrival overseas,\" we cannot accept exchanges, returns, or dispatch of missing items."
            ]
          },
          {
            type: "paragraph",
            text: "We appreciate your understanding in advance."
          }
        ]
      }
    ]
  },
  {
    id: "guide06",
    title: "About Recommended Environment",
    content: [
      {
        type: "unordered-list",
        items: [
          "Windows: Google Chrome, Mozilla Firefox, Microsoft Edge latest versions",
          "Mac(Macintosh): Safari, Google Chrome latest versions",
          "iPhone: Safari latest version",
          "Android: Google Chrome latest version"
        ]
      },
      {
        type: "paragraph",
        text: "If you use Internet Explorer, there may be cases where it is not displayed correctly, so please use Microsoft Edge. If there are any issues with the display or operation of the site, please try it in the recommended environment above."
      }
    ]
  }
];