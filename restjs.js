(function() {
    'use strict';
    if (self.RestService) return;

    var RestService = {
        init: function (config) {
            this.baseUrl = config.baseUrl + "/";
            this.endpoint = config.endpoint;
            this.protocol = config.protocol + "://";
        },
        _buildXhr: function (method, callback, path, payload, params) {

            var rqtUrl = this._buildRqt(method, path, params);

            // http://www.html5rocks.com/en/tutorials/file/xhr2/
            var xhr = new XMLHttpRequest();
            xhr.open(method, rqtUrl, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onerror = function(e){ console.log("error",e)};
            xhr.onreadystatechange = function () {
                // if (xhr.readyState == 4 && xhr.status == 200) { }
                if (xhr.readyState == 4) {
                    //console.log("headers",xhr.getAllResponseHeaders());
                    var responseText = xhr.responseText;
                    //responseText = responseText.replace(/^\s+|\s+$/g, '');
                    //console.log(method, responseText);
                    callback(JSON.parse(responseText));
                    return JSON.parse(responseText);
                }
            };

            switch (method) {
                case "GET":
                    xhr.send();
                    break;
                case "POST":
                case "PUT":
                case "DELETE":
                default:
                    xhr.onload = function (e) {};
                    xhr.send(JSON.stringify(payload));
            }
        },
        _buildRqt: function (method, path, params) {
            var path = (path != null)? "/"+path : "";
            var params = params || undefined;
            var param = "";

            if (params != undefined) {
                param = "?";
                for (var key in params) {
                    param = param + key + "=" + params[key] + "&";
                }
                //TODO for each params index >0 append & prefix
                console.log("params", params, param);
            }
            return this.protocol + this.baseUrl + this.endpoint + path + param;
        },
        fetch: function (callback, path, params) {
            this._buildXhr("GET", callback, path, params);
        },
        create: function (callback, payload, params) {
            this._buildXhr("POST", callback, null, payload, params);
        },
        update: function (callback, path, payload, params) {
            this._buildXhr("PUT", callback, path, payload, params);
        },
        remove: function (callback, path, params) {
            this._buildXhr("DELETE", callback, path, params);
        }
    };
    self.RestService = RestService;
    self.RestService.polyfill = false;
})();