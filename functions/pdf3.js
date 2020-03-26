const PDFDocument = require('pdfkit');
const fs = require('fs');
const crypto = require('crypto');
const md5 = require('md5');
const mysql = require("mysql");
const mkdirp = require('mkdirp');
const QRCode = require('qrcode');
var certificateId = "97630709";

// const codes = require('rescode')

function pdf(event_name, name, rank, email, i) {

    // QRCode.toFile("./images/qrcode/"+i+email+".png", "Event Name : " + event_name + " Name : " + name + " Rank : " + rank, {
    // }, function(err) {
    //     if (err) throw err
    //     console.log('qrcode done')
    // });

    // Create a document
    const doc = new PDFDocument({
        layout: "landscape",
        size: [545, 760]
    });

    if (rank == "") {
        var appr = "Participation";
        var ach = "participated"
    } else {
        var appr = "Appreciation";
        var ach = "achieved rank " + rank;
    }

    // mkdirp("./images/qrcode");

    // mkdirp('./images/' + event_name);

    var qrcode = "./images/qrcode/"+event_name+"/"+email+".png";

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('./public/certificates/' + event_name + '/' + name + '.pdf'));

    // var random = Math.random().toString();
    // var randomHash = crypto.createHash('sha1').update(random).digest('hex');

    doc.image('./images/3282105c.png', 0, 0, {
        fit: [760, 760],
    });

    doc.image('./images/dbit.png', 375, 400, {
        height: 50,
        width: 50
    });

    doc.image(qrcode, 475, 400, {
        height: 60,
        width: 60
    }).stroke();


    // Embed a font, set the font size, and render some text
    doc.fontSize(16)
        .text(' DON BOSCO INSTITUTE OF TECHNOLOGY\n          KURLA WEST, MUMBAI - 400 070', 140, 30);

    // Add an image, constrain it to a given size, and center it vertically and horizontally


    // doc.fontSize(25)
    //     .text('Certificate of '+appr+'',260,140)  

    doc.fontSize(17).text('       This is to certify that ' + name + ' has ' + ach + " in " + event_name, 50, 250, {
        align: 'center'
    });


    // Finalize PDF file
    certificateId++;

    doc.end();
}

module.exports = { pdf };