## certificate_generator
A web platform for college organisations where the event organizer can generate the certificate of the participants.

## Process
1. Admin of college will add all the faculty of the college.
2. Faculty can register new events. They need to submit the Name of the Event, Type of Event, Date on which the event will be held, Image of the Event and Description of the Event. This data will be saved in the server's file system.
3. After registering the event faculty need to submit a CSV file of the participants which will contain following column respectively: Name, Rank, Email.
4. Faculty can also generate the customized template. But by using customized template they will be able to download only one certificate at a time.
5. After uploading the CSV file, HOD can see the number of participants and will decide whether to print the certificate or not. HOD will select the defualt template from lists of template and will print the certificate.
6. The QR code will generate for each certificate and will be attached at the end of the certificate. Certificate of participation and Rank certificate will be sent to all the participants respectively to their given email address.
7. Anyone can scan the QR code to check the authenticity of the certificate i.e whether the certificate is valid or it is forged.
8. Faculty can edit the event, change the date of event or any other specification and also can upload the updated CSV to the same event or they can also delete the event.
9. Various report will be generated based on the event like faculty can see the events based on each department, event held between specified dates or they can also see which participant has participated in how many events.

## Installation
[Download the XAMPP](https://www.apachefriends.org/download.html)

Import the [sql file](https://github.com/pawanabc59/certificate_generator/blob/master/configuration/certificate_generator.sql) in phpmyadmin to have all the table and columns.

Installing NodeJs
```
$ sudo apt-get install nodejs
```

Cloning the repo
```
$ git clone https://github.com/pawanabc59/certificate_generator.git
```
or download the zip file

Installing the dependencies
```
$ cd certificate_generator
$ npm install
```

Start the XAMPP server and run this command in terminal or cmd to start the project.
```
$ nodemon app.js
```

Project will run on port 5655. Type this in browser
```
$ http://localhost:5655/login
```

## Technology stack
1.  Bootstrap
2.  HTML
3.  CSS
4.  NodeJS

## Contributers
1.  <a href="https://github.com/akki3737">Akash Hadwale</a>
2.  <a href="https://github.com/deepak1199">Deepak Paradkar</a>
3.  <a href="https://github.com/pawanabc59" >Pawankumar Maurya</a>
