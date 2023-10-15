const express = require("express");
const app = express();
var cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
app.use(express.static("public"));

app.use(cors("*"));
app.use(express.json());

var smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "jkp001@chowgules.ac.in",
      pass: "Password@098"
    }
  })
);

app.post("/email", (req, res) => {
  console.log("email api hit");

  console.log(req.body);

  const { room, name, phone, email, checkin, checkout, people } = req.body;

  var mailOptions = {
    from: "somerealemail@gmail.com",
    to: "pereirajoshua9@gmail.com",
    subject: "Booking Enquiry",
    text: "room: "+room+", name: "+name+", phone: "+phone+", email: "+email+", checkin: "+checkin+", checkout: "+checkout+", people: "+people+""
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(400).send({"status"  : "not ok"})

    } else {
      res.status(200).send({"status"  : "ok"})

      console.log("Email sent: " + info.response);
    }
  });

//   res.json("email api hit ");
});

app.get("/test", (req, res) => {
  res.send({ data: "email api hit " });
});

app.listen(8080, () => {
  console.log("server  listening on port 8080!");
});

module.exports = app;
