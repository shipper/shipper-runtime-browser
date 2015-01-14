
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
  var ShipperProtocol;

  ShipperProtocol = (function() {
    function ShipperProtocol(module, name, definition) {
      this.module = module;
      this.name = name;
      this.definition = definition;
      this.$$defineCommands();
    }

    ShipperProtocol.prototype.$$defineCommands = function() {
      var command, key, value, _ref;
      this.$$commands = {};
      _ref = this.definition;
      for (key in _ref) {
        value = _ref[key];
        if (!this.definition.hasOwnProperty(key)) {
          continue;
        }
        command = defineShipperCommand(this, key, value);
        this.$$commands[key.toLowerCase()] = {
          key: key,
          value: command,
          definition: value
        };
        if (this[key] == null) {
          this[key] = command;
        }
      }
      return this.$$commands;
    };

    ShipperProtocol.prototype.$getCommand = function(name) {
      var command;
      if (typeof name !== 'string') {
        throw new TypeError('Name is expected to be a string');
      }
      command = this.$$commands[name];
      if ((command != null ? command.value : void 0) == null) {
        throw new Error("Unknown command: " + name);
      }
      return command.value;
    };

    ShipperProtocol.prototype.$send = function(command, payload) {
      return this.module.$send(this.name, command, payload);
    };

    return ShipperProtocol;

  })();

  this.ShipperProtocol = ShipperProtocol;

}).call(this);
