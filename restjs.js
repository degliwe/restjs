(function (exports) {
    'use strict';
    var baseUrl, endpoint, protocol;

    exports.init = function (config) {
        baseUrl = config.baseUrl + "/";
        endpoint = config.endpoint;
        protocol = config.protocol + "://";

        return this;
    };
    exports.fetch = function (path, params) {
        return new Promise(function(resolve, reject) {
            _buildXhr("GET", path, null, params, resolve, reject);
        });
    };
    exports.create = function (payload, params) {
        return new Promise(function(resolve, reject) {
            _buildXhr("POST", null, payload, params, resolve, reject);
        });
    };
    exports.update = function (path, payload, params) {
        return new Promise(function(resolve, reject) {
            _buildXhr("PUT", path, payload, params, resolve, reject);
        });
    };
    exports.remove = function (path, params) {
        return new Promise(function(resolve, reject) {
            _buildXhr("DELETE", path, null, params, resolve, reject);
        });
    };

    function _buildXhr(method, path, payload, params, resolve, reject) {

        var rqtUrl = _buildUrl(path, params);
        var xhr = new XMLHttpRequest();
        xhr.open(method, rqtUrl, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = function() {
            if (xhr.status < 400)
                resolve(JSON.parse(xhr.responseText));
            else
                reject(Error("Request failed: " + xhr.statusText));
        };
        xhr.onerror = function (e) {
            reject(Error("Network error: "+ e));
        };
        xhr.send(JSON.stringify(payload));
    }

    function _buildUrl(path, params) {
        path = (path != null) ? "/" + path : "";
        params = params || undefined;
        var param = "";

        if (params != undefined) {
            param = "?";
            var i = 0;
            for (var key in params) {
                if (i>0) param+= "&";
                param = param + key + "=" + params[key];
                i++;
            }
        }
        return protocol + baseUrl + endpoint + path + param;
    }

})(this.REST = {});