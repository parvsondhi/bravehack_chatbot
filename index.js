var changeApi = require('change-api');
var petitionUrl = 'https://www.change.org/p/test-test-petitition'
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

var intro_words = ["hey","hello","aloha","namaste","hi", "howdy", "heya"]
var ask_words = ["wassup", "what's up", "whatsup", "whats up","how are you", "how is it going", "how you doing", "how are you doing", "how are you?", "how is it going?", "how you doing?", "how are you doing?"]

function inArray(needle,haystack)
{
    var count=haystack.length;
    for(var i=0;i<count;i++)
    {
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

        	//text = "Introduction message"
        	message = {
        		"text":"Pick a color:",
    			"quick_replies":[
      {
        "content_type":"text",
        "title":"Red",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
      },
      {
        "content_type":"text",
        "title":"Green",
        "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
      }
    ]
  }
        	
        	sendMessage(event.sender.id, message)

        }

        else if(inArray(event.message.text.toLowerCase(),ask_words)){
			text = "answer message"
        	sendMessage(event.sender.id, {text: text})
        }

        else
        {	
        	text = event.message.text
        	sendMessage(event.sender.id, {text: "Text received, echo: " + text.substring(0, 200)})
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
