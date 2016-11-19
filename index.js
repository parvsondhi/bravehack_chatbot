var changeApi = require('change-api');
var petitionUrl = 'https://www.change.org/p/test-test-petitition'
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

var intro_words = ["hey","hello","aloha","namaste","hi", "howdy", "heya", "yo"]
var ask_words = ["wassup", "what's up", "whatsup", "whats up","how are you", "how is it going", "how you doing", "how are you doing", "how are you?", "how is it going?", "how you doing?", "how are you doing?"]

function inArray(needle,haystack){
    var count=haystack.length;
    for(var i=0;i<count;i++){
        if(haystack[i]===needle){return true;}
    }
    return false;
  }

var changeClient = changeApi.createClient({
  api_key: '32257b66d1ebcca330045074be776fb300c273aaa6bdb413b10cad7064933294'
});

app.get('/', function (req, res) {
    res.send('This is Haven');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'bravehack_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});






app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    console.log("the entire list of events")
    console.log(events)
    console.log("iterating the loop")
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        console.log("individual event " + event)
        if (event.message && event.message.text) {
          if(inArray(event.message.text.toLowerCase(),intro_words)){
        	   message = {
        		     "text":"Introduction message",
    			       "quick_replies":[{
                    "content_type":"text",
                    "title":"Sign Petition",
                    "payload":"petition"
                  },
                  {
                    "content_type":"text",
                    "title":"Find Organizations",
                    "payload":"find_org"
                  },
                  {
                    "content_type":"text",
                    "title":"Donate",
                    "payload":"donate"
                  }
                ]
              }

        	sendMessage(event.sender.id, message)
        }

        else if(inArray(event.message.text.toLowerCase(),ask_words)){
          text = "answer message"

        	sendMessage(event.sender.id, {text: text})
        }
        else if(event.message.text.toLowerCase().includes("@")){
          text = "Please confirm your Email ID: " + event.message.text
          message = {
              "text":text,
              "quick_replies":[{
                 "content_type":"text",
                 "title":"Correct",
                 "payload":"yes"
               },
               {
                 "content_type":"text",
                 "title":"Enter Again",
                 "payload":"no"
               }
             ]
           }
          sendMessage(event.sender.id, message)
        }
        else if(!(event.message.text.toLowerCase().localeCompare("correct"))){
          console.log(event.message)
          //sendMessage(event.sender.id, {text: "correct"})
          // changeClient.petitions.addSignature({
          //   petition_id: 8930333,
          //   api_secret: '69451c75c48efbfeda20747fc864da44998e28b436841985c44b3e4f94f6c054',
          //   auth_key: '0f043943c7badca2efefe991ba9a68502df78abcf6572457d59179cc138c26a6',
          //   source: 'https://hellohaven.herokuapp.com',
          //   email: 'jamesvardy@hotmail.com',
          //   first_name: 'Jon',
          //   last_name: 'Doe',
          //   city: 'Berkeley',
          //   postal_code: 94703,
          //   country_code: 'US'
          // },
          // function (err, res, body) {
          //   console.log(body);
          // });
        }
        else if(!(event.message.text.toLowerCase().localeCompare("enter again"))){
          sendMessage(event.sender.id, {text: "Enter your Email Address"})
        }
        else if(!(event.message.text.toLowerCase().localeCompare("sign petition"))){
          message = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "generic",
                      "elements": [{
                          "title": "Petition Name",
                          "subtitle":"Petition Subtitle",
                          "image_url": "https://s3-us-west-1.amazonaws.com/bravehack/cdc.png" ,
                          "buttons": [{
                              "type": "postback",
                              "title": "Sign Now",
                              "payload":"signs_t"
                          },
                          {
                              "type": "postback",
                              "title": "More Info",
                              "payload":"overviews_tThe California Data Collaborative or “CaDC” is a voluntary, collaborative project where local cities, water retailers and land planning agencies have come together to build new data infrastructure to ensure California has reliable water today and into the future."
                          },
                          {
                              "type": "web_url",
                              "url": "https://www.change.org/p/test-test-petitition",
                              "title": "Go to Change.org"
                              }],

                        }]
                        }
                      },
                      "quick_replies":[{
                        "content_type":"text",
                        "title":"Find Organizations",
                        "payload":"find_org"
                       },
                       {
                         "content_type":"text",
                         "title":"Donate",
                         "payload":"donate"
                       }
                     ]
                      };
          sendMessage(event.sender.id,message)
        }
        else if(!(event.message.text.toLowerCase().localeCompare("donate"))){
          message = {
              "text":"We are currently adding this feature. Meanwhile don't hesitate to sign our petition or find similar organizations",
              "quick_replies":[{
                 "content_type":"text",
                 "title":"Sign Petition",
                 "payload":"petition"
               },
               {
                 "content_type":"text",
                 "title":"Find Organizations",
                 "payload":"find_org"
               }
             ]
           }
          sendMessage(event.sender.id,message)
        }
        else if(!(event.message.text.toLowerCase().localeCompare("find organizations"))){
          message = {
              "attachment": {
                  "type": "template",
                  "payload": {
                      "template_type": "generic",
                      "elements": [{
                          "title": "California Data Collaborative",
                          "subtitle":"The Future of Water Management",
                          "image_url": "https://s3-us-west-1.amazonaws.com/bravehack/cdc.png" ,
                          "buttons": [{
                              "type": "postback",
                              "title": "About Us",
                              "payload":"overviews_tThe California Data Collaborative or “CaDC” is a voluntary, collaborative project where local cities, water retailers and land planning agencies have come together to build new data infrastructure to ensure California has reliable water today and into the future."
                          },{
                              "type": "web_url",
                              "url": "http://californiadatacollaborative.com/",
                              "title": "Go to Website"
                              }],

                        },
                        {
                          "title": "California Water 4 All",
                          "subtitle": "The Water Priorities Constitutional Amendment and Bond Act",
                          "image_url": "https://s3-us-west-1.amazonaws.com/bravehack/w4all.png" ,
                          "buttons": [{
                              "type": "postback",
                              "title": "About Us",
                              "payload": "overviews_tThe initiative puts people and food first when it comes to using water, on the very day it is passed. In addition, the initiative begins the process of fixing our long-term water problems by increasing storage capacity for all water uses — families, farms and the environment — and it does so without raising taxes."
                            },{
                              "type": "web_url",
                              "url": "https://cawater4all.com/",
                              "title": "Go to Website"
                              }],
                            },
                            {
                              "title": "California Water Alliance",
                              "subtitle": "Advocating for the water needs.",
                              "image_url": "https://s3-us-west-1.amazonaws.com/bravehack/calwa.png" ,
                              "buttons": [{
                                "type": "postback",
                                "title": "About Us",
                                "payload": "overviews_tThe California Water Alliance (CalWA) is a leading educational voice and authority on California water. Founded in 2009, CalWA is a non-profit, non-partisan 501c4 that advocates for the water needs of California families, cities, businesses, farmers and the environment."
                              },{
                                "type": "web_url",
                                "url": "http://californiawateralliance.org/",
                                "title": "Go to Website"
                              }],
                            }
                          ]
                        }
                      },
                      "quick_replies":[{
                         "content_type":"text",
                         "title":"Sign Petition",
                         "payload":"petition"
                       },
                       {
                         "content_type":"text",
                         "title":"Donate",
                         "payload":"donate"
                       }
                     ]
                      };
          sendMessage(event.sender.id,message)
        }

        else{
        	text = event.message.text
        	sendMessage(event.sender.id, {text: "Text received, echo: " + text.substring(0, 200)})
        }
      }
      else if(event.postback){

        var newstring = event.postback.payload.split("s_t")

        if(!(newstring[0].localeCompare("overview"))){
          message = {
              "text":newstring[1],
              "quick_replies":[{
                 "content_type":"text",
                 "title":"Sign Petition",
                 "payload":"petition"
               },
               {
                 "content_type":"text",
                 "title":"Find Organizations",
                 "payload":"find_org"
               },
               {
                 "content_type":"text",
                 "title":"Donate",
                 "payload":"donate"
               }
             ]
           }

          sendMessage(event.sender.id,message)
        }
        else if(!(newstring[0].localeCompare("sign"))){
          sendMessage(event.sender.id,{text: "Enter your Email Address"})
        }
        else if(!(event.postback.payload.localeCompare("find_org"))){
          sendMessage(event.sender.id,{text: "finding Organizations"})
        }

      }
    }
    res.sendStatus(200)
});


function sendMessage(recipientId, message) {
  console.log("the message " + message)
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }

    });
};
// changeClient.petitions.getByUrl(petitionUrl,
//   function (err, res, body) {

//   	console.log(body)
//     //Process results here
//   });




// changeClient.petitions.getAuthKey({
//     'api_secret': '69451c75c48efbfeda20747fc864da44998e28b436841985c44b3e4f94f6c054',
//     'petition_id': 8930333,
//     'source_description': 'sourceDescription',
//     'source': 'https://hellohaven.herokuapp.com',
//     'requester_email': 'parv.sondhi@gmail.com'
//   },
//   function (err, res, body) {
//     console.log(body);
//   });


// 0f043943c7badca2efefe991ba9a68502df78abcf6572457d59179cc138c26a6


// changeClient.petitions.addSignature({
// 	petition_id: 8930333,
//     api_secret: '69451c75c48efbfeda20747fc864da44998e28b436841985c44b3e4f94f6c054',
//     auth_key: '0f043943c7badca2efefe991ba9a68502df78abcf6572457d59179cc138c26a6',
//     source: 'https://hellohaven.herokuapp.com',
//     email: 'robin.oh@outlook.com',
//     first_name: 'Robin',
//     last_name: 'Oh',
//     city: 'Berkeley',
//     postal_code: 94703,
//     country_code: 'US'

// 	},
//   function (err, res, body) {
//     console.log(body);
//   });
