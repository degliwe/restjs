# restjs
minimal js lib to use REST services asynchronously with promises and zero dependencies



```javascript
var jsonService = Object.create(REST);
jsonService.init({
    "protocol": "http",
    "baseUrl": "localhost",
    "endpoint": "document"
});
```
First we need to create and configure our resource by provideing protocol (optional), baseurl (optional) and endpoint.

```javascript
var doc = {"title": "this is my title", "body": "this is my body"};
```
Then we can create a local Json document

```javascript
jsonService.create(doc);
```
Saving the document online is then very simple

```javascript
jsonService.create(doc).then(success, fail);
```
all the methods return a promise so you can chain a then(success,fail) and react to network event.

```javascript
jsonService.fetch().then(success, fail);
jsonService.fetch("8f9c55fbf82ed8121e12ac1f191fbd5b").then(success, fail);
jsonService.update("8f9c55fbf82ed8121e12ac1f191fbd5b", doc, params).then(success, fail);
jsonService.remove("8f9c55fbf82ed8121e12ac1f191fbd5b", params).then(success, fail);
jsonService.create(doc).then(success, fail);
```
That's it.
