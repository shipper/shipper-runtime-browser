
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
  var ShipperEnvironmentObject;

  ShipperEnvironmentObject = (function() {
    function ShipperEnvironmentObject() {}

    ShipperEnvironmentObject.prototype.deferCallback = null;

    ShipperEnvironmentObject.prototype.setProtocolDefinition = function(protocolDefinition) {
      this.protocolDefinition = protocolDefinition;
    };

    ShipperEnvironmentObject.prototype.getProtocolDefinition = function() {
      return this.protocolDefinition || window["ShipperClientDefinition"];
    };

    ShipperEnvironmentObject.prototype.hasProtocolDefinition = function() {
      return this.getProtocolDefinition() != null;
    };

    ShipperEnvironmentObject.prototype.setWebSocketParameters = function(socketParams) {
      this.socketParams = socketParams;
    };

    ShipperEnvironmentObject.prototype.getWebSocketParameters = function() {
      return this.socketParams || {
        url: 'ws://localhost:2202',
        protocol: 'shipper',
        timeout: 10000
      };
    };

    ShipperEnvironmentObject.prototype.setPromiseLibrary = function(lib) {
      this.deferCallback = lib.defer;
      this.deferResolve = lib.resolve;
      return this.deferReject = lib.reject;
    };

    ShipperEnvironmentObject.prototype.resolve = function() {
      if (!(this.deferResolve instanceof Function)) {
        if (!((typeof Q !== "undefined" && Q !== null ? Q.resolve : void 0) instanceof Function)) {
          return;
        }
        return Q.resolve.apply(null, arguments);
      }
      return this.deferResolve.apply(null, arguments);
    };

    ShipperEnvironmentObject.prototype.reject = function() {
      if (!(this.deferReject instanceof Function)) {
        if (!((typeof Q !== "undefined" && Q !== null ? Q.reject : void 0) instanceof Function)) {
          return;
        }
        return Q.reject.apply(null, arguments);
      }
      return this.deferReject.apply(null, arguments);
    };

    ShipperEnvironmentObject.prototype.defer = function() {
      if (!(this.deferCallback instanceof Function)) {
        if (!((typeof Q !== "undefined" && Q !== null ? Q.defer : void 0) instanceof Function)) {
          return;
        }
        return Q.defer();
      }
      return this.deferCallback();
    };

    return ShipperEnvironmentObject;

  })();

  this.ShipperEnvironment = new ShipperEnvironmentObject();

}).call(this);
