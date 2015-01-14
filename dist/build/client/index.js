
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
  var ShipperClient, shipperClientInstance,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ShipperClient = (function(_super) {
    __extends(ShipperClient, _super);

    function ShipperClient(definition) {
      this.$onLink(definition);
      this.client = new SocketClient();
      this.client.once('capabilities', this.$receiveCapabilities.bind(this));
      this.client.once('close', (function(_this) {
        return function() {
          return _this.emit('close');
        };
      })(this));
    }

    ShipperClient.prototype.$$defineModules = function() {
      var key, module, value, _ref;
      this.$$modules = {};
      _ref = this.definition.modules;
      for (key in _ref) {
        value = _ref[key];
        if (!this.definition.modules.hasOwnProperty(key)) {
          continue;
        }
        module = new ShipperModule(this, key, value);
        this.$$modules[key.toLowerCase()] = {
          key: key,
          value: module,
          definition: value
        };
        if (this[key] == null) {
          this[key] = module;
        }
      }
      return this.$$modules;
    };

    ShipperClient.prototype.$getModule = function(name) {
      var module;
      if (typeof name !== 'string') {
        throw new TypeError('Name is expected to be a string');
      }
      module = this.$$modules[name.toLowerCase()];
      if ((module != null ? module.value : void 0) == null) {
        throw new Error("Unknown module: " + name);
      }
      return module.value;
    };

    ShipperClient.prototype.$getProtocol = function(moduleName, protocolName) {
      var module;
      module = this.$getModule(moduleName);
      return module.$getProtocol(protocolName);
    };

    ShipperClient.prototype.$getCommand = function(moduleName, protocolName, commandName) {
      var module;
      module = this.$getModule(moduleName);
      return module.$getCommand(protocolName, commandName);
    };

    ShipperClient.prototype.$send = function(module, protocol, command, payload) {
      return this.client.sendRequest(module, protocol, command, payload);
    };

    ShipperClient.prototype.$receiveCapabilities = function(capabilities) {
      if (capabilities.link) {
        return this.$send('protocol', 'link', 'generate', {}).then(this.$onLink.bind(this));
      }
    };

    ShipperClient.prototype.$onLink = function(definition) {
      if (definition == null) {
        definition = void 0;
      }
      if (definition == null) {
        return;
      }
      this.definition = definition;
      this.$$defineModules();
      return this.emit('link', this);
    };

    ShipperClient.prototype.$module = function(name) {
      var deferred;
      deferred = ShipperEnvironment.defer();
      this.ready((function(_this) {
        return function() {
          if (_this.$$modules[name.toLowerCase()] == null) {
            return deferred.reject("No module " + name);
          }
          return deferred.resolve(_this.$$modules[name.toLowerCase()].value);
        };
      })(this));
      return deferred.promise;
    };

    ShipperClient.prototype.ready = function(callback) {
      if (this.definition) {
        return callback(this);
      }
      return this.once('link', (function(_this) {
        return function() {
          return callback(_this);
        };
      })(this));
    };

    return ShipperClient;

  })(EventEmitter);

  shipperClientInstance = void 0;

  this.newShipperClient = function() {
    return shipperClientInstance = new ShipperClient(ShipperEnvironment.getProtocolDefinition());
  };

  this.getShipperClient = function() {
    if (shipperClientInstance != null) {
      return shipperClientInstance;
    }
    return shipperClientInstance = newShipperClient();
  };

}).call(this);
