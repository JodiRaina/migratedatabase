//MYSQL to REDis

var redis = require("redis"),
    client = redis.createClient();
var mysql = require('mysql');
var fs = require('fs');
const Keyv = require('keyv');
const keyv = new Keyv('redis://@localhost:6379', { namespace: 'wilayah_2018' });

client.on("error", function (err) {
    console.log("Error " + err);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"wilayah_ktp"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM wilayah_2018", function (err, result, fields) {
    if (err) throw err;
    async function setData() {
        var prov='';
        var kec='';
        keyv.on('error', err => console.log('Connection Error', err));
        for (i of result) {
            var kode=i.kode;
            
            var split = kode.split(".");
            if (split.length == 1) {
                prov = i.nama;
            }
            if (split.length == 3) {
                var nama = prov + ' - ' + i.nama;
                var kdwilayah = split[0] + split[1] + split[2];
                await keyv.set(kdwilayah, nama);
                var data2 = kdwilayah + ' - ' + prov +' - '+i.nama;
                console.log(data2);
            }
        }
    }
    setData();
  });

});