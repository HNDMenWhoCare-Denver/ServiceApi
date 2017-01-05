/**
* Created by SJClark on 11/27/2016.
*/

module.exports = {
    sendExternalEmail: sendExternalEmail
};

function sendExternalEmail(from,to,subject,contentStr) {
    var helper = require('sendgrid').mail;
    var from_email = new helper.Email(from);
    var to_email = new helper.Email(to);
    //var subject = 'Hello World from the SendGrid Node.js Library!';
    var content = new helper.Content('text/plain', contentStr);
    var mail = new helper.Mail(from_email, subject, to_email, content);

//var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var sg = require('sendgrid')('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');

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
}
