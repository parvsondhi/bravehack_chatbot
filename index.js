var changeApi = require('change-api');
var petitionUrl = 'https://www.change.org/p/test-test-petitition'


var changeClient = changeApi.createClient({
  api_key: '32257b66d1ebcca330045074be776fb300c273aaa6bdb413b10cad7064933294'


});

changeClient.petitions.getByUrl(petitionUrl,
  function (err, res, body) {

  	console.log(body)
    //Process results here
  });




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
