const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const md5 = require('md5');
const multer = require('multer');
const nodemailer = require('nodemailer');
const csv = require('csvtojson');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode');
const mkdirp = require('mkdirp');
const randomstring = require('randomstring');
// var nodemailer = require('nodemailer');


const pdfObj1 = require('./functions/pdf.js');
const pdfObj2 = require('./functions/pdf2.js');
const pdfObj3 = require('./functions/pdf3.js');
// const pdfObj4 = require('./functions/pdf4.js');
const pdfObj = "";

const con = require('./configuration/databaseConnection.js');

let uploadData = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

// const con = require('./configuration/databaseConnection.js');

//setting the template engine
app.set('view engine', 'ejs');

//session maintaining
app.use(session({ secret: 'noneed', resave: false, saveUninitialized: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

    next();
});
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("inside storage");
        const dir = './public/uploads/' + req.session.username;
        mkdirp(dir, err => cb(null, dir));
    },
    filename: function(req, file, cb) {
        let temp = file.originalname;
        cb(null, temp)
    }
});

var upload = multer({ storage: storage })

// by using locals we can access the session variable anywhere in the templates.
app.use(function(req, res, next) {
    res.locals.username = req.session.username;
    res.locals.roles = req.session.roles;
    res.locals.department = req.session.department;
    res.locals.status = "400";
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/demo", (req, res) => {
    res.render("test");
})
app.get("/navbar", (req, res) => {
    res.render("navbar");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var sql = "select * from login where username = '" + username + "' and password = '" + password + "' ";
    con.query(sql, function(err, results) {

        if (err) throw err;
        results.forEach(function(result) {

            req.session.username = username;
            req.session.roles = result.roles;
            req.session.department = result.department;
            console.log("result : " + result[0]);
            console.log("role : " + result.roles);
            res.redirect("/viewEvent");

        });
    })
})

app.get("/home", (req, res) => {
    res.render("home");
})

var addFaculty_alert_int = 0;

app.get("/addFaculty", (req, res) => {
    if (addFaculty_alert_int == 0) {
        alert = 'false';
    } else {
        alert = 'true';
        addFaculty_alert_int = 0;
    }
    res.render("addFaculty", { alert: alert });
})

app.post("/addFaculty", (req, res) => {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var department = req.body.department;
    var role = req.body.role;

    var sql = "INSERT INTO `faculty`(`name`, `username`, `password`, `department`, `role`) VALUES ('" + name + "','" + username + "','" + password + "','" + department + "','" + role + "') ";
    con.query(sql, function(err, results) {
        if (err) { throw err; }
        var sql = "INSERT INTO `login`( `username`, `password`, `roles`, `department`) VALUES ('" + username + "','" + password + "','" + role + "' , '" + department + "')";
        con.query(sql, function(err, result) {
            if (err) { throw err; }
            addFaculty_alert_int = 1;
            res.redirect("/addFaculty");
        })
    })
});

var deleteFaculty_alert_int = 0;
app.get("/viewFaculty", (req, res) => {

    var sql = "select * from faculty";
    con.query(sql, function(err, results) {
        if (err) { throw err; }
        if (deleteFaculty_alert_int == 0) {
            alert = 'false';
        } else {
            alert = 'true';
            deleteFaculty_alert_int = 0;
        }
        res.render("viewFaculty", { results: results, alert: alert });
    })

});

var addEvent_alert_int = 0;

app.get("/addEvent", (req, res) => {
    if (addEvent_alert_int == 0) {
        alert = 'false';
    } else {
        alert = 'true';
        addEvent_alert_int = 0;
    }
    res.render("addEvent", { alert: alert });
})

app.post("/addEvent", upload.array('eventImage', 1), (req, res) => {

    var event_name = req.body.event_name;
    var event_type = req.body.event_type;
    var event_date = req.body.event_date;
    var event_description = req.body.event_description;
    // var event_incharge = req.body.event_incharge;

    // console.log(req.files);

    // console.log("file 1 originalname "+req.files[0].originalname);

    // var temp = req.files[0].destination.split('.');
    // var path = temp[1]+'.'+temp[2];
    // // console.log("path 1 "+path);

    // var path1 = path.split('/');
    // var path2 = path1[2]+'/'+path1[3]+'/'+path1[4];

    // var eventPicture = '/'+path2+"/"+req.files[0].originalname;
    var eventPicture = '/uploads/' + req.session.username + "/" + req.files[0].originalname;
    console.log("image " + eventPicture);


    var sql = "INSERT INTO `event`(`event_name`, `event_type`,`event_date`, `event_incharge`,`incharge_username`,`department`,`event_image`, `event_description`) VALUES ('" + event_name + "','" + event_type + "','" + event_date + "','" + req.session.username + "','" + req.session.username + "','" + req.session.department + "','" + eventPicture + "','" + event_description + "')";
    con.query(sql, function(err, results) {
        if (err) { throw err; }
        addEvent_alert_int = 1;
        res.redirect("/addEvent");
    })

})

app.get("/viewEvent", (req, res) => {

    var sql = "select * from event"
    con.query(sql, function(err, results) {
        if (err) { throw err; }
        res.render("viewEvent", { results: results });
    })

})

app.post("/deleteFaculty", (req, res) => {

    var facultyId = req.body.faculty_Id;

    var sql = "DELETE FROM `faculty` WHERE id = '" + facultyId + "'";
    con.query(sql, function(err, results) {
        deleteFaculty_alert_int = 1;
        res.redirect("/viewFaculty");
    })

});

var deleteEvent_alert_int = 0;
var uploadCsv_alert_int = 0;

app.get("/myEvent", (req, res) => {

    var sql = "select * from event where incharge_username = '" + req.session.username + "'";
    con.query(sql, function(err, results) {
        if (err) { throw err; }
        if (deleteEvent_alert_int == 0) {
            alert = 'false';
        } else {
            alert = 'true';
            deleteEvent_alert_int = 0;
        }
        if (uploadCsv_alert_int == 0) {
            alert_csv = 'false';
        } else {
            alert_csv = 'true'
            uploadCsv_alert_int == 1;
        }
        res.render("myEvent", { results: results, alert: alert, alert_csv: alert_csv });
    })

})

app.post("/deleteEvent", (req, res) => {
    var event_id = req.body.event_id;

    var sql = "DELETE FROM `event` WHERE id = '" + event_id + "'";
    con.query(sql, function(err, results) {
        if (err) { throw err; }
        deleteEvent_alert_int = 1;
        res.redirect("/myEvent");
    })
});

app.post("/upload_csv", upload.single('CSVFile'), (req, res) => {
    var event_id = req.body.event_Id;

    // console.log("files : "+req.file);
    // console.log("file name : "+req.file.originalname);
    var csv_path = "/uploads/" + req.session.username + "/" + req.file.originalname;
    var sql = "UPDATE `event` SET `csv_path`= '" + csv_path + "' , `csv_uploaded` = '" + 1 + "' WHERE id = '" + event_id + "'";
    con.query(sql, function(err, results) {
        if (err) { throw err; }
        uploadCsv_alert_int = 1;
        res.redirect("/myEvent");
    });
});

app.get("/showParticipants", (req, res) => {
    res.render("showParticipants");
});

// var printCertificates_alert_int = 0;
app.post("/showParticipants", (req, res) => {
    var event_id = req.body.event_id;
    var event_name = req.body.event_name;
    var event_type = req.body.event_type;
    var certificate_printed = req.body.certificate_printed;
    var csv_path = "./public" + req.body.csv_path;

    csv().fromFile(csv_path).then((jsonObject) => {
        mkdirp("./images/qrcode/" + event_name);
        for (var i = 0; i < jsonObject.length; i++) {
            var code = randomstring.generate()
            var sql = "INSERT INTO `gen_certificates`(`email`, `event_type`, `code`) VALUES(?,?,?)";
            con.query(sql, [jsonObject[i].Email, event_type, code], function(err, results) {
                if (err) { throw err; }
                console.log(results)
            })
            QRCode.toFile("./images/qrcode/" + event_name + "/" + jsonObject[i].Email + ".png", "http://192.168.43.151:5655/verify?code=" + code, {}, function(err) {
                if (err) throw err
                console.log('qrcode done');
            });
        }
        // if (printCertificates_alert_int == 0) {
        //     alert = 'false';
        // }else{
        //     alert = 'true'
        //     printCertificates_alert_int = 0;
        // }
        res.render("showParticipants", { jsonObject: jsonObject, event_id: event_id, event_name: event_name, csv_path: csv_path, alert: 'false', certificate_printed: certificate_printed });
    })
})

app.post("/printCertificates", (req, res) => {

    var event_name = req.body.event_name;
    var event_id = req.body.event_id;
    var csv_path = req.body.csv_path;
    var certificate_printed = req.body.certificate_printed;
    var selectedTemplate = req.body.selectedTemplate;

    console.log("file path : " + csv_path);

    var first = "not";
    var second = "not";

    mkdirp('./public/certificates/' + event_name);
    csv().fromFile(csv_path).then((jsonObject) => {

        // if (first == "not") {

        // second = "done";
        // }

        // if (second == "done") {
        //log

        for (var i = 0; i < jsonObject.length; i++) {

            if (selectedTemplate == "firstTemplate") {
                pdfObj2.pdf(event_name, jsonObject[i].Name, jsonObject[i].Rank, jsonObject[i].Email, i);
                // sendCertificates(event_name, jsonObject[i].Name, jsonObject[i].Email, );

            } else if (selectedTemplate == "secondTemplate") {
                pdfObj3.pdf(event_name, jsonObject[i].Name, jsonObject[i].Rank, jsonObject[i].Email, i);
                console.log("email for recipent" + jsonObject[i].Email);
                // sendCertificates(event_name, jsonObject[i].Name, jsonObject[i].Email);

            }

            // else if (selectedTemplate == "thirdTemplate") {
            //  pdfObj4.pdf(event_name,jsonObject[i].Name,jsonObject[i].Rank);
            //  sendCertificates(event_name, jsonObject[i].Name, jsonObject[i].Email);
            // }
            else {
                pdfObj1.pdf(event_name, jsonObject[i].Name, jsonObject[i].Rank, jsonObject[i].Email, i);
                // sendCertificates(event_name, jsonObject[i].Name, jsonObject[i].Email);
            }



            // pdfObj.pdf(event_name,jsonObject[i].Name,jsonObject[i].Rank);

        }
        // }
        var sql = "UPDATE `event` SET `certificate_printed` = '" + 1 + "' WHERE id = '" + event_id + "'";
        con.query(sql, function(err, results) {
            if (err) { throw err; }
            res.render("showParticipants", { jsonObject: jsonObject, event_id: event_id, event_name: event_name, csv_path: csv_path, alert: 'true', certificate_printed: certificate_printed });
        });
    });

});

app.get("/makeCertificate", (req, res) => {
    res.render("makeCustomizedCertificate");
});

function sendCertificates(event_name, name, email) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'beit062020@gmail.com',
            pass: 'itbe06@2020'
        }
    });

    var mailOptions = {
        from: 'Admin <beit062020@gmail.com>',
        to: email,
        subject: 'Your certificate for ' + event_name + '.',
        text: 'Hey ' + name + ', Admin here. \n Your certificate is generated and we are sending you this email with your certificate.\nWe hope you liked our event and we will be deligted to see you in the upcoming events. \n\nThanks and Regards,Admin :)',
        attachments: [{
            filename: name + '.pdf',
            path: 'C:/xampp/htdocs/web_projects/certificate_generator/public/certificates/' + event_name + '/' + name + '.pdf', //attachment
            contentType: 'application/pdf'
        }]
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });

});

app.get('/report', (req, res) => {
    var sql = "select event_type,count(id) as count from event group by event_type";
    var sql2 = "select event_incharge from event group by event_incharge";
    con.query(sql2, function(err, results2){
        con.query(sql, function(err, results) {
            if (err) { throw err; }

            var label = []
            var data = []
            for (var i = 0; i < results.length; i++) {
                label.push(String(results[i]['event_type']))
                data.push(results[i]['count'])
            }

            res.render("report", { results2: results2, label: label, data: data })

        });
    });
});

app.post('/eventReport', (req, res) => {
    var typeOfEvent = req.body.typeOfEvent;
    var groupby = 'event_type';
    if (typeOfEvent == "allEvent") {
        var sql = "select event_type,count(id) as count from event group by event_type";
        groupby = 'event_type';
    } else if (typeOfEvent == "allDepartmentEvent") {
        var sql = "select department,count(id) as count from event group by department";
        groupby = 'department';
    } else {
        var sql = "select event_type,count(id) as count from event where department = '"+typeOfEvent+"' group by event_type";
        groupby = 'event_type';
    }
    var sql2 = "select event_incharge from event group by event_incharge";
    con.query(sql2, function(err, results2){
        con.query(sql, function(err, results) {
            if (err) { throw err; }

            var label = []
            var data = []
            for (var i = 0; i < results.length; i++) {
                label.push(String(results[i][groupby]))
                data.push(results[i]['count'])
            }

            res.render("report", { results2: results2, label: label, data: data })

        });
    });

});

app.post("/facultyEvent", (req, res)=>{
    var inchargeEvent = req.body.inchargeEvent;
    var sql = "select event_type,count(id) as count from event where event_incharge = '"+inchargeEvent+"' group by event_type";
    var sql2 = "select event_incharge from event group by event_incharge";
    con.query(sql2, function(err, results2){
        con.query(sql, function(err, results) {
            if (err) { throw err; }

            var label = []
            var data = []
            for (var i = 0; i < results.length; i++) {
                label.push(String(results[i]['event_type']))
                data.push(results[i]['count'])
            }

            res.render("report", { results2: results2, label: label, data: data })

        });
    });
});

// app.get('/allDepartmentEvent', (req, res) => {
//     var sql = "select department,count(id) as count from event group by department";
//     con.query(sql, function(err, results) {
//         if (err) { throw err; }

//         var label = []
//         var data = []
//         for (var i = 0; i < results.length; i++) {
//             label.push(String(results[i]['department']))
//             data.push(results[i]['count'])
//         }

//         res.render("report", { label: label, data: data })

//     });
// });

// app.get('/ITDepartmentEvent', (req, res) => {
//     var sql = "select event_type,count(id) as count from event where department = 'IT' group by event_type";
//     con.query(sql, function(err, results) {
//         if (err) { throw err; }

//         var label = []
//         var data = []
//         for (var i = 0; i < results.length; i++) {
//             label.push(String(results[i]['event_type']))
//             data.push(results[i]['count'])
//         }

//         res.render("report", { label: label, data: data })

//     });
// });

// app.get('/CompsDepartmentEvent', (req, res) => {
//     var sql = "select event_type,count(id) as count from event where department = 'Comps' group by event_type";
//     con.query(sql, function(err, results) {
//         if (err) { throw err; }

//         var label = []
//         var data = []
//         for (var i = 0; i < results.length; i++) {
//             label.push(String(results[i]['event_type']))
//             data.push(results[i]['count'])
//         }

//         res.render("report", { label: label, data: data })

//     });
// });

// app.get('/MechDepartmentEvent', (req, res) => {
//     var sql = "select event_type,count(id) as count from event where department = 'Mech' group by event_type";
//     con.query(sql, function(err, results) {
//         if (err) { throw err; }

//         var label = []
//         var data = []
//         for (var i = 0; i < results.length; i++) {
//             label.push(String(results[i]['event_type']))
//             data.push(results[i]['count'])
//         }

//         res.render("report", { label: label, data: data })

//     });
// });

// app.get('/ExtcDepartmentEvent', (req, res) => {
//     var sql = "select event_type,count(id) as count from event where department = 'Extc' group by event_type";
//     con.query(sql, function(err, results) {
//         if (err) { throw err; }

//         var label = []
//         var data = []
//         for (var i = 0; i < results.length; i++) {
//             label.push(String(results[i]['event_type']))
//             data.push(results[i]['count'])
//         }

//         res.render("report", { label: label, data: data })

//     });
// });

app.get('/verify', (req, res) => {
    var code = req.query.code;
    var sql = "select *from gen_certificates where code = '" + code + "'";
    con.query(sql, function(err, results) {
        if (err) { throw err; }

        // console.log(results[0])

        res.render("verify", { isValid: "VALID", result: results[0] })


    })

})

app.listen(5655);