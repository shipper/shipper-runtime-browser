
/**
Copyright 2014 Fabian Cook
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

(function() {
  var SocketClient,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SocketClient = (function(_super) {
    __extends(SocketClient, _super);

    function SocketClient() {
      var e;
      this.requests = {};
      this.parameters = ShipperEnvironment.getWebSocketParameters();
      this.deferred = ShipperEnvironment.defer();
      this.promise = this.deferred.promise;
      try {
        this.socket = new WebSocket(this.parameters.url, this.parameters.protocol);
        this.socket.binaryType = 'arraybuffer';
        this.socket.onmessage = this.receive.bind(this);
        this.socket.error = this.error.bind(this);
        this.socket.onopen = (function(_this) {
          return function() {
            _this.deferred.resolve(_this.socket);
            return _this.emit('open');
          };
        })(this);
        this.socket.onclose = (function(_this) {
          return function() {
            _this.closed = true;
            return _this.emit('close');
          };
        })(this);
      } catch (_error) {
        e = _error;
        this.deferred.reject(e);
      }
      window.onbeforeunload = (function(_this) {
        return function() {
          return _this.close();
        };
      })(this);
    }

    SocketClient.prototype.close = function() {
      return this.socket.close();
    };

    SocketClient.prototype.error = function(error) {
      return console.log(error);
    };

    SocketClient.prototype.receive = function(message) {
      var array, data, _ref;
      if (typeof message.data === 'string') {
        data = JSON.parse(message.data);
      } else if (message.data instanceof ArrayBuffer) {
        array = new Uint8Array(message.data);
        data = BSON.deserialize(array);
      } else {
        data = BSON.deserialize(message.data);
      }
      if (data == null) {
        return;
      }
      if (((_ref = data.metadata) != null ? _ref.id : void 0) != null) {
        return this.receiveWithId(data.metadata.id, data);
      }
      if (data.command === 'capabilities' && (data.payload != null)) {
        return this.receiveCapabilities(data.payload);
      }
    };

    SocketClient.prototype.receiveCapabilities = function(payload) {
      return this.emit('capabilities', payload);
    };

    SocketClient.prototype.receiveWithId = function(id, data) {
      var req;
      req = this.requests[id];
      if (req == null) {
        return;
      }
      if (data.error) {
        return req.deferred.reject(data.error);
      } else if (data.notify) {
        return req.deferred.notify(data.payload);
      } else {
        return req.deferred.resolve(data.payload);
      }
    };

    SocketClient.prototype.sendRequest = function(module, protocol, command, payload) {
      var deferred, req;
      deferred = ShipperEnvironment.defer();
      req = new SocketRequest(module, protocol, command, payload, deferred);
      this.requests[req.id] = req;
      setTimeout(function() {
        return req.deferred.reject('Request timed out');
      }, this.parameters.timeout);
      this.send(req);
      return deferred.promise;
    };

    SocketClient.prototype.send = function(data) {
      if (this.closed) {
        return ShipperEnvironment.reject('Connection is closed');
      }
      if (typeof data !== 'string') {
        try {
          if (data.toJSON != null) {
            data = data.toJSON();
          }
          data = BSON.serialize(data);
        } catch (_error) {}
      }
      return this.promise.then((function(_this) {
        return function() {
          return _this.socket.send(data);
        };
      })(this));
    };

    return SocketClient;

  })(EventEmitter);

  this.SocketClient = SocketClient;

}).call(this);
