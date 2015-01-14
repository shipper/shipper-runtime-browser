
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
  var ShipperClient, shipperClientInstance;

  ShipperClient = (function() {
    function ShipperClient(definition) {
      this.definition = definition;
      this.$$defineModules();
      this.client = new SocketClient();
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

    return ShipperClient;

  })();

  shipperClientInstance = void 0;

  this.newShipperClient = function() {
    if (!ShipperEnvironment.hasProtocolDefinition()) {
      throw new Error("No definition implemented");
    }
    return shipperClientInstance = new ShipperClient(ShipperEnvironment.getProtocolDefinition());
  };

  this.getShipperClient = function() {
    if (shipperClientInstance != null) {
      return shipperClientInstance;
    }
    return shipperClientInstance = newShipperClient();
  };

}).call(this);
