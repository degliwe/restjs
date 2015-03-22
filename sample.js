// Create a service object
var jsonService = Object.create(REST).init({
    "protocol": "http",
    "baseUrl": "localhost:5984",
    "endpoint": "restjs"
});

var doc = {"title": "this is my title", "body": "this is my body"};
var params = {"rev": "1-8f9c55fbf82ed8121e12ac1f191fbd5b"};
var callback = function (res) {
    console.log("callback", res);
    doc = res;
};

jsonService.fetch().then(callback);
jsonService.fetch("8f9c55fbf82ed8121e12ac1f191fbd5b").then(callback);
jsonService.update("8f9c55fbf82ed8121e12ac1f191fbd5b", doc, params).then(callback);
jsonService.remove("8f9c55fbf82ed8121e12ac1f191fbd5b", params).then(callback);
jsonService.create(doc).then(callback);