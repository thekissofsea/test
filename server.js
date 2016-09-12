/**
 * Created by hxsd on 2016/5/20.
 */
var http = require("http");


var fs = require("fs");
var url = require("url");
var path = require("path");
var querystring = require("querystring");
var mime=require("./mime.js");

//fs.stat为文件属性
http.createServer(requestHandle).listen(8089, function () {
    console.log("服务器正在监听8089端口");
});
function requestHandle(request, response){
    var urlObj= url.parse(decodeURI(request.url));
    if(urlObj.pathname=="/favicon.ico"||urlObj.pathname=="/"){
        urlObj.pathname="/index.html";
    }
    var urlX="public"+urlObj.pathname;

    reponseStatic(urlX,response);
}

function reponseStatic(urlX,response){
    fs.exists(urlX, function (flag) {
        if (!flag) {
            send404(response);
            return;
        } else {
            fs.readFile(urlX, function (err, date) {
                if (err) {
                    send500(response);
                    return;
                }
                var contentType=mime[path.extname(urlX)]||"text/plain;charset:utf8";
                send200(response,contentType,date)
            })
        }
    })
}
function send404(response){
    response.writeHead(404 ,{"Content-Type":"text/plain;charset:utf-8"});
    response.write("文件不存在");
    response.end();
}
function  send500(response){
    response.writeHead(500 ,{"Content-Type":"text/plain;charset:utf-8","Access-Control-Allow-Origin":"10.15.12.222"});
    response.write("服务器炸了");
    response.end();
}
function send200(response,contentType,date){
    response.writeHead(200, {"Content-Type":contentType,"Access-Control-Allow-Origin":"10.15.12.220"});
    response.write(date);
    response.end();
}



