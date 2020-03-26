const PDFDocument = require('pdfkit');
const fs = require('fs');
const crypto = require('crypto');
const md5 = require('md5');
const mysql = require("mysql");
const mkdirp = require('mkdirp');
const QRCode = require('qrcode');
var certificateId = "97630709";

// const codes = require('rescode')


function pdf(event_name,name,rank, email,i){
   // Create a document
   const doc = new PDFDocument({
    layout:"landscape",
    size: [495, 800]
   });

   // fs.mkdirSync('./public/certificates/'+event_name);
   // if (!fs.existsSync('./public/certificates/'+event_name)){
   //  fs.mkdirSync('./public/certificates/'+event_name);
   // }
   // if (!fs.existsSync('.public/certificates/'+event_name)){
   // fs.mkdirSync('.public/certificates/'+event_name);
   // }
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
   
   // Pipe its output somewhere, like to a file or HTTP response
   // See below for browser usage
   doc.pipe(fs.createWriteStream('./public/certificates/'+event_name+'/'+name+'.pdf'));
   
   var random = Math.random().toString();
   var randomHash = crypto.createHash('sha1').update(random).digest('hex');
   
    doc.image('./images/1.png',695, 0,{
      fit: [120, 110],
      
    });

    doc.image('./images/6.png',240, -7,{
      width:340, height:70
    });
    
    doc.image('./images/2.png',0, 0,{
      fit: [120, 110],
      
    });

    doc.image('./images/3.png',0, 380,{
      fit: [120, 110],
      
    });

    doc.image('./images/5.png',240, 430,{
      width:340, height:70
      
    });
    
    doc.image('./images/4.png',680, 380,{
      fit: [120, 110],
      
    });

   doc.image('./images/dbit.png', 170,60 ,{
      height : 50,
      width : 50 
   });

   doc.image(qrcode, 650,400 ,{
      height : 60,
      width : 60 
   });
   

   // Embed a font, set the font size, and render some text
   doc.fontSize(16)
      .text('        DON BOSCO INSTITUTE OF TECHNOLOGY\n                KURLA WEST, MUMBAI - 400 070', 210, 70);
    
   // Add an image, constrain it to a given size, and center it vertically and horizontally

  
  doc.fontSize(25)
      .text('Certificate of '+appr+'',260,140)  

   doc.fontSize(17).text('       This is to certify that '+name+' has '+ach+" in "+event_name, 50, 200,{
    align : 'center'});

   // doc.fontSize(18).text('certificateId : '+certificateId)
    
   // Finalize PDF file
   certificateId++;

   doc.end();
}


module.exports = { pdf };