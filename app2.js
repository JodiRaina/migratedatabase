//REDis TO POSTGRES

var redis = require("redis"),
    clientrd = redis.createClient();


clientrd.on("error", function (err) {
    console.log("Error " + err);
});

// client.keys('*wilayah_2018*', function (err, keys) {
//   if (err) return console.log(err);
//   async function getData() {
//       const Keyv = require('keyv');
//       const keyv = new Keyv('redis://@localhost:6379', { namespace: 'wilayah_2018' });
//       keyv.on('error', err => console.log('Connection Error', err));
//       keys.sort();

//       for (var i = 0, len = keys.length; i < len; i++) {
//           var splt = keys[i].split(":");
//           var kec = await keyv.get(splt[1]);
//           var data2 = splt[1] + ' - ' + kec;
//           console.log(data2);
//       }
//   }
//   getData();
// });

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
});
