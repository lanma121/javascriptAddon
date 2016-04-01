/**
 * Created by liuzhentao on 2016/3/17 0017.
 */
var sys = require('util');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    sys.puts("State: " + this.readyState);

    if (this.readyState === 4) {
        sys.puts("Complete.\nBody length: " + this.responseText.length);
        sys.puts("Body:\n" + this.responseText);
    }
};

xhr.open("GET", "http://driverdan.com");
xhr.send();