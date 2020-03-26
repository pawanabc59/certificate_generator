const PDFDocument = require('pdfkit');
const fs = require('fs');
const crypto = require('crypto');
const md5 = require('md5');
const mysql = require("mysql");
const mkdirp = require('mkdirp');
const QRCode = require('qrcode');
var certificateId = "97630709";

// const codes = require('rescode')


function pdf(event_name,name,rank,email, i){
   // Create a document
   const doc = new PDFDocument({
    layout:"landscape",
    size: [760, 545]
   });

   if(rank =="")
   {
      var appr = "Participation";
      var ach = "participated"
   }
   else
   {
      var appr = "Appreciation";
      var ach = "achieved rank "+rank;
   }

//    mkdirp("./images/"+event_name);

//    QRCode.toFile("./images/"+event_name+"/"+name+event_name+".png", "Event Name : "+event_name+" Name : "+name+" Rank : "+rank, {
//   // color: {
//   //   dark: '#00F',  // Blue dots
//   //   light: '#0000' // Transparent background
//   // }
// }, function (err) {
//   if (err) throw err
//   console.log('done')
// })

var qrcode = "./images/qrcode/"+event_name+"/"+email+".png";
console.log("email here is : "+email);
   
   // Pipe its output somewhere, like to a file or HTTP response
   // See below for browser usage
   doc.pipe(fs.createWriteStream('./public/certificates/'+event_name+'/'+name+'.pdf'));
   
   var random = Math.random().toString();
   var randomHash = crypto.createHash('sha1').update(random).digest('hex');
    
    doc.image('./images/2026c1.png',0, 0,{
      fit: [545, 760],
    });

   doc.image('./images/dbit.png', 70,20 ,{
      height : 50,
      width : 50 
   });

   doc.image(qrcode, 200,500 ,{
      height : 60,
      width : 60 
   });
   

   // Embed a font, set the font size, and render some text
   doc.fontSize(16)
      .text(' DON BOSCO INSTITUTE OF TECHNOLOGY\n          KURLA WEST, MUMBAI - 400 070', 140, 30);
    
   // Add an image, constrain it to a given size, and center it vertically and horizontally

  
  // doc.fontSize(25)
  //     .text('Certificate of '+appr+'',260,140)  

   doc.fontSize(17).text('       This is to certify that '+name+' has '+ach+" in "+event_name, 50, 400,{
    align : 'center'});

    
   // Finalize PDF file
   certificateId++;

   doc.end();
}

module.exports = { pdf };