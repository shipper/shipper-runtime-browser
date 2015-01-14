
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
  var ShipperModule;

  ShipperModule = (function() {
    function ShipperModule(client, name, definition) {
      this.client = client;
      this.name = name;
      this.definition = definition;
      this.$$defineProtocols();
    }

    ShipperModule.prototype.$$defineProtocols = function() {
      var key, protocol, value, _ref;
      this.$$protocols = {};
      _ref = this.definition;
      for (key in _ref) {
        value = _ref[key];
        if (!this.definition.hasOwnProperty(key)) {
          continue;
        }
        protocol = new ShipperProtocol(this, key, value);
        this.$$protocols[key.toLowerCase()] = {
          key: key,
          value: protocol,
          definition: value
        };
        if (this[key] == null) {
          this[key] = protocol;
        }
      }
      return this.$$protocols;
    };

    ShipperModule.prototype.$getProtocol = function(name) {
      var protocol;
      if (typeof name !== 'string') {
        throw new TypeError('Name is expected to be a string');
      }
      protocol = this.$$protocols[name.toLowerCase()];
      if ((protocol != null ? protocol.value : void 0) == null) {
        throw new Error("Unknown protocol: " + name);
      }
      return protocol.value;
    };

    ShipperModule.prototype.$getCommand = function(protocolName, commandName) {
      var protocol;
      protocol = this.$getProtocol(protocolName);
      return protocol.$getCommand(commandName);
    };

    ShipperModule.prototype.$send = function(protocol, command, payload) {
      return this.client.$send(this.name, protocol, command, payload);
    };

    return ShipperModule;

  })();

  this.ShipperModule = ShipperModule;

}).call(this);
