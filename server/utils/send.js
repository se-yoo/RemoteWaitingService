const config = require("../config/key");
const axios = require("axios");
const CryptoJS = require("crypto-js");

const method = "POST"; // method
const { smsServiceId, smsAccessKey, smsSecretKey, smsFromPhoneNumber } = config;

function makeSignature(timestamp) {
  const space = " "; // one space
  const newLine = "\n"; // new line
  const url = `/sms/v2/services/${smsServiceId}/messages`;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, smsSecretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(smsAccessKey);

  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

function send_message(toUserPhoneNumberList, content) {
  const timestamp = Date.now().toString();
  const signature = makeSignature(timestamp);
  const toList = toUserPhoneNumberList.map((item) => ({
    to: item.replaceAll("-", ""),
  }));

  axios({
    method: method,
    url: `https://sens.apigw.ntruss.com/sms/v2/services/${smsServiceId}/messages`,
    headers: {
      "Contenc-type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": smsAccessKey,
      "x-ncp-apigw-timestamp": timestamp,
      "x-ncp-apigw-signature-v2": signature,
    },
    data: {
      type: "SMS",
      countryCode: "82",
      from: smsFromPhoneNumber,
      content: content,
      messages: toList,
    },
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = send_message;
