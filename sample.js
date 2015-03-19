/**
 * Created by wesley on 3/19/15.
 */

// Create a service object
var jsonService = Object.create(RestService);//.init(config);
jsonService.init({
    "protocol": "http",
    "baseUrl": "localhost:5984",
    "endpoint": "restjs"
});

var doc = {"title": "this is my title", "body": "this is my body"};
var params = {"rev": "8f9c55fbf82ed8121e12ac1f191fbd5b"};
var callback = function (res) {
    console.log("callback", res);
    doc = res;
};

jsonService.fetch(callback);
jsonService.fetch(callback, "8f9c55fbf82ed8121e12ac1f191fbd5b");
jsonService.update(callback, "8f9c55fbf82ed8121e12ac1f191fbd5b", doc, params);
jsonService.remove(callback,"8f9c55fbf82ed8121e12ac1f191fbd5b", params);
jsonService.create(callback, doc);