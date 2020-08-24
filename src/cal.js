const express = require('express');
const fs = require('fs');
const {google} = require('googleapis');
const serverless = require('serverless-http');
const cal_id = process.env.CAL_ID;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const app = express();

const router = express.Router();

// app.get("/", function(req, response) {
//   response.sendFile(__dirname + "/index.html");
// });

// app.get('/style.css', function(req, res) {
//   res.sendFile(__dirname + "/style.css");
// });


router.get("/", function(req, response) {
  fs.readFile('credentials.json', (err, content) => {
    credentials = JSON.parse(content);
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    fs.readFile('token.json', (err, token) => {
      oAuth2Client.setCredentials(JSON.parse(token));
      listEvents(oAuth2Client);
    });
  });
  
  function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({ calendarId: cal_id, timeMin: (new Date()).toISOString(), maxResults: 6,
      singleEvents: true, orderBy: 'startTime'}, (err, res) => {
        var events = res.data.items, event_json = {}, index = 0;
        events.map((event, i) => {
            var time = "";
            
            if(event.start.dateTime) { //need to include exact times
              start_time = event.start.dateTime;
              start_am = "AM";
              end_time = event.end.dateTime || "";
              date_arr = (start_time.split('T'))[0].split('-');
              year = date_arr[0], month = (date_arr[1]), day = date_arr[2];
              date_time = ((start_time.split('T'))[1].split('-'))[0].split(':');
              if(date_time[0] > 12) { 
                date_time[0] -= 12; 
                start_am = "PM";
              }
              date = months[--month] + " " + day + ", " + year;
              start_time = date_time[0] + ":" + date_time[1];
              if(end_time == "") { end_time = start_am + " ET"; } 
              else {
                date_arr = (((end_time.split('T'))[1]).split('-')[0]).split(':');
                end_am = "AM";
                if(date_arr[0] > 12) {
                  date_arr[0] -= 12;
                  end_am = "PM";
                }
                if(start_am != end_am) { end_time = start_am + " - " + date_arr[0] + ":" + date_arr[1] + end_am + " ET"; } 
                else { end_time = "-" + date_arr[0] + ":" + date_arr[1] + " " + start_am + " ET"; }
              }
              time = start_time + end_time;
            } else { // just include start date
              var date_arr = event.start.date.split('-');
              var year = date_arr[0], month = (date_arr[1]), day = date_arr[2];
              date = months[--month] + " " + day + ", " + year;
              time = "";
            }
            event_json[index] = {"title": event.summary, "date": date, "time": time, "location": (event.location || "n/a")};
            index++;
        });
        console.log(event_json);
        response.json(event_json);
    });
  }
});

// app.listen(8888);

app.use("/.netlify/functions/cal", router);
module.exports.handler = serverless(app);
