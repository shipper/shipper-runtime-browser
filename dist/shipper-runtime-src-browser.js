
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
  this.ShipperClientDefinitiontemp = {
    "modules": {
      "authentication": {
        "agent": {
          "login": {
            "name": "login",
            "route": ["/agent/login/:username", "/agent/login"],
            "method": ["PUT", "POST"],
            "schema": {
              "username": {
                "type": "string",
                "required": true
              },
              "password": {
                "type": "string",
                "required": true
              }
            }
          },
          "loginToken": {
            "name": "loginToken",
            "route": ["/agent/login/token/:token", "/agent/login/token"],
            "method": ["PUT", "POST"],
            "schema": {
              "username": {
                "type": "string",
                "required": true
              },
              "password": {
                "type": "string",
                "required": true
              }
            }
          },
          "getAgents": {
            "name": "getAgents",
            "route": "/agent",
            "method": "GET",
            "schema": {}
          },
          "putAgent": {
            "name": "putAgent",
            "route": ["/agent", "/agent/:key"],
            "method": ["PUT", "POST"],
            "schema": {
              "key": {
                "type": "string"
              },
              "value": {
                "type": "object",
                "required": true,
                "schema": {
                  "name": {
                    "type": "string+"
                  },
                  "type": {
                    "type": "string",
                    "properties": {
                      "regex": {}
                    }
                  },
                  "role": {
                    "type": "string",
                    "properties": {
                      "regex": {}
                    }
                  },
                  "username": {
                    "type": "string+",
                    "required": true
                  },
                  "password": {
                    "type": "string+"
                  },
                  "location": {
                    "type": "object",
                    "schema": {
                      "key": {
                        "type": "string"
                      }
                    }
                  },
                  "features": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string+",
                          "properties": {
                            "regex": {}
                          }
                        }
                      }
                    }
                  },
                  "facilities": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string+"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "getAgent": {
            "name": "getAgent",
            "route": "/agent",
            "method": "GET",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "deleteAgent": {
            "name": "deleteAgent",
            "route": "/agent/:key",
            "method": "DELETE",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          }
        }
      },
      "data": {},
      "inventory": {
        "item": {
          "getItems": {
            "name": "getItems",
            "route": "/item",
            "method": "GET",
            "schema": {}
          },
          "putItem": {
            "name": "putItem",
            "route": ["/item", "/item/:key"],
            "method": ["PUT", "POST"],
            "schema": {
              "key": {
                "type": "string"
              },
              "value": {
                "type": "object",
                "required": true,
                "schema": {
                  "manufacture_iso3166_1": {
                    "type": "object",
                    "schema": {
                      "key": {
                        "type": "string"
                      }
                    }
                  },
                  "stock_keeping_unit": {
                    "type": "string",
                    "required": true
                  },
                  "universal_product_code": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string",
                    "required": true
                  },
                  "description_extended": {
                    "type": "string"
                  },
                  "lead_time": {
                    "type": "number"
                  },
                  "safety_stock": {
                    "type": "number"
                  },
                  "minimum_stock": {
                    "type": "number"
                  },
                  "maximum_stock": {
                    "type": "number"
                  },
                  "purchase_price": {
                    "type": "number"
                  },
                  "sale_price": {
                    "type": "number"
                  },
                  "measurement": {
                    "type": "object",
                    "schema": {
                      "length": {
                        "type": "number"
                      },
                      "width": {
                        "type": "number"
                      },
                      "height": {
                        "type": "number"
                      },
                      "weight": {
                        "type": "number"
                      },
                      "imperial": {
                        "type": "boolean"
                      }
                    }
                  },
                  "pallet": {
                    "type": "object",
                    "schema": {
                      "items_per_tier": {
                        "type": "number"
                      },
                      "tiers": {
                        "type": "number"
                      },
                      "measurement": {
                        "type": "object",
                        "schema": {
                          "length": {
                            "type": "number"
                          },
                          "width": {
                            "type": "number"
                          },
                          "height": {
                            "type": "number"
                          },
                          "weight": {
                            "type": "number"
                          },
                          "imperial": {
                            "type": "boolean"
                          }
                        }
                      }
                    }
                  },
                  "grouping": {
                    "type": "object",
                    "schema": {
                      "key": {
                        "type": "string"
                      },
                      "value": {
                        "type": "object",
                        "schema": {
                          "name": {
                            "type": "string",
                            "required": true
                          },
                          "items": {
                            "type": "number"
                          },
                          "measurement": {
                            "type": "object",
                            "schema": {
                              "length": {
                                "type": "number"
                              },
                              "width": {
                                "type": "number"
                              },
                              "height": {
                                "type": "number"
                              },
                              "weight": {
                                "type": "number"
                              },
                              "imperial": {
                                "type": "boolean"
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "variations": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string"
                        },
                        "value": {
                          "type": "object",
                          "required": true,
                          "schema": {
                            "stock_keeping_unit": {
                              "type": "string"
                            },
                            "description": {
                              "type": "string"
                            },
                            "variations": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "schema": {
                                  "key": {
                                    "type": "string"
                                  },
                                  "value": {
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "getItem": {
            "name": "getItem",
            "route": "/item/:key",
            "method": "GET",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "deleteItem": {
            "name": "deleteItem",
            "route": "/item/:key",
            "method": "DELETE",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "getItemVariations": {
            "name": "getItemVariations",
            "route": "/item/:itemKey/variation",
            "method": "GET",
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              }
            }
          },
          "putItemVariation": {
            "name": "putItemVariation",
            "route": ["/item/:itemKey/variation", "/item/:itemKey/variation/:key"],
            "method": ["PUT", "POST"],
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              },
              "key": {
                "type": "string"
              },
              "variation": {
                "type": "object",
                "required": true,
                "schema": {
                  "stock_keeping_unit": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "variations": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string"
                        },
                        "value": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "getItemVariation": {
            "name": "getItemVariation",
            "route": "/item/:itemKey/variation/:key",
            "method": "GET",
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              },
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "deleteItemVariation": {
            "name": "deleteItemVariation",
            "route": "/item/:itemKey/variation/:key",
            "method": "DELETE",
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              },
              "key": {
                "type": "string",
                "required": true
              }
            }
          }
        }
      },
      "shipping": {
        "fastway": {}
      }
    },
    "types": {}
  };

}).call(this);


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
  document.addEventListener("DOMContentLoaded", function() {
    window.schemajs = window.schema;
    return window.BSON = bson().BSON;
  });

}).call(this);


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
  var uuid;

  uuid = {
    v4: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r, v;
        r = Math.random() * 16 | 0;
        v = (c === "x" ? r : r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  };

  this.uuid = uuid;

}).call(this);


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
  var defineShipperCommand;

  defineShipperCommand = function(protocol, name, definition) {
    var Command;
    Command = (function() {
      Command.$name = name;

      Command.$definition = definition;

      Command.$route = definition.route;

      Command.$method = definition.method;

      Command.$schema = definition.schema;

      Command.getName = function() {
        return Command.$name;
      };

      Command.getDefinition = function() {
        return Command.$definition;
      };

      Command.getRoute = function() {
        return Command.$route;
      };

      Command.getMethod = function() {
        return Command.$method;
      };

      Command.getSchema = function() {
        return Command.$schema;
      };

      Command.hasSchema = function() {
        return Command.getSchema() != null;
      };

      Command.validate = function(payload) {
        var localSchema;
        if (Command.$$schema != null) {
          return Command.$$schema.validate(payload);
        }
        localSchema = Command.getSchema();
        if (localSchema == null) {
          return {
            valid: true,
            data: payload,
            errors: []
          };
        }
        Command.$$schema = schemajs.create(localSchema);
        return Command.validate(payload);
      };

      Command.setTypes = function(obj) {
        var k, ret, type, v, val, _i, _len, _ref;
        if (obj == null) {
          return obj;
        }
        if (!(obj instanceof Object)) {
          return obj;
        }
        if (obj instanceof Array) {
          ret = [];
          for (_i = 0, _len = obj.length; _i < _len; _i++) {
            val = obj[_i];
            ret.push(Command.setTypes(val));
          }
          return ret;
        }
        if (!_.isPlainObject(obj)) {
          return obj;
        }
        if (((_ref = obj._metadata) != null ? _ref.name : void 0) != null) {
          type = TypeCache.getType(obj._metadata.name);
          ret = new type();
          _.assign(ret, obj);
          obj = ret;
        } else {
          ret = {};
        }
        for (k in obj) {
          v = obj[k];
          if (!obj.hasOwnProperty(k)) {
            continue;
          }
          ret[k] = Command.setTypes(v);
        }
        return ret;
      };

      function Command(payload) {
        this.payload = payload;
        if (!(this instanceof Command)) {
          return new Command(this.payload);
        }
        this.promise = this.resolve(this.payload).then(function(response) {
          return Command.setTypes(response);
        });
        this.promise.then((function(_this) {
          return function(response) {
            return _this.response = response;
          };
        })(this))["catch"]((function(_this) {
          return function(error) {
            return _this.error = error;
          };
        })(this));
        this.then = this.promise.then.bind(this.promise);
        this["catch"] = this.promise["catch"].bind(this.promise);
        this.progress = this.promise.progress.bind(this.promise);
      }

      Command.prototype.resolve = function() {
        var res;
        if (!Command.hasSchema()) {
          res = this.handler(this.payload);
          return this.resolvePromise(res);
        }
        return this.validate(this.ayload);
      };

      Command.prototype.validate = function() {
        var form, res;
        form = Command.validate(this.payload);
        if (!form.valid) {
          return ShipperEnvironment.reject(new ValidationError('Payload not valid', form.errors));
        }
        res = this.handler(form.data);
        return this.resolvePromise(res);
      };

      Command.prototype.toString = function() {
        return "Command [ " + (protocol.getModuleName()) + "." + (protocol.getName()) + "#" + (Command.getName()) + " ]";
      };

      Command.prototype.toJSON = function() {
        var json;
        json = Command.toJSON();
        json.payload = this.payload;
        json.response = this.response;
        json.error = this.error;
        return json;
      };

      Command.prototype.handler = function(payload) {
        return protocol.$send(Command.getName(), payload);
      };

      Command.prototype.resolvePromise = function(possiblePromise) {
        var deferred;
        if (possiblePromise == null) {
          return ShipperEnvironment.resolve();
        }
        if (possiblePromise.then instanceof Function && possiblePromise["catch"] instanceof Function) {
          if (possiblePromise.progress instanceof Function) {
            return possiblePromise;
          }
          deferred = ShipperEnvironment.defer();
          possiblePromise.then(deferred.resolve)["catch"](deferred.reject);
          if (possiblePromise.progress instanceof Function) {
            possiblePromise.progress(deferred.notify);
          }
          return deferred.promise;
        }
        return ShipperEnvironment.resolve(possiblePromise);
      };

      return Command;

    })();
    return Command;
  };

  this.defineShipperCommand = defineShipperCommand;

}).call(this);


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
  var ValidationError,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ValidationError = (function(_super) {
    __extends(ValidationError, _super);

    function ValidationError(message, errors) {
      this.message = message;
      this.errors = errors != null ? errors : void 0;
      ValidationError.__super__.constructor.call(this, message);
    }

    ValidationError.prototype.toString = function() {
      var k, res, v, _ref;
      res = "ValidationError: " + this.message;
      if (!this.errors) {
        return res;
      }
      _ref = this.errors;
      for (k in _ref) {
        v = _ref[k];
        if (!this.errors.hasOwnProperty(k)) {
          continue;
        }
        res += "\n\tError: " + v;
      }
      return res;
    };

    return ValidationError;

  })(Error);

  this.ValidationError = ValidationError;

}).call(this);


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
  var TypeCache, instance;

  TypeCache = (function() {
    TypeCache.prototype.$$types = void 0;

    function TypeCache() {
      this.$$types = {};
    }

    TypeCache.prototype.addType = function(name, type) {
      var oldType;
      oldType = this.$$types[name];
      this.$$types[name] = type;
      if (!this.window) {
        return;
      }
      if (typeof this.window === 'boolean') {
        this.window = window;
      }
      if (oldType != null) {
        if (this.window[name] !== oldType) {
          return;
        }
        this.window[name] = void 0;
      }
      if (this.window[name] != null) {
        return;
      }
      return this.window[name] = type;
    };

    TypeCache.prototype.getType = function(name, schema) {
      var type;
      if (schema == null) {
        schema = void 0;
      }
      type = this.$$types[name];
      if (type != null) {
        return type;
      }
      type = this.generateType(name, schema);
      this.addType(name, type);
      return type;
    };

    TypeCache.prototype.getInstance = function(name, id, schema) {
      var instance, type;
      if (schema == null) {
        schema = void 0;
      }
      type = this.getType(name, schema);
      if (id == null) {
        return new type();
      }
      instance = (type.$$instances != null ? type.$$instances : type.$$instances = {})[id];
      if (instance) {
        return instance;
      }
      instance = new type();
      type.$$instances[id] = instance;
      return instance;
    };

    TypeCache.prototype.generateType = function(name, schema) {
      if (schema == null) {
        schema = void 0;
      }
      return TypeGenerator.generate(name, schema);
    };

    return TypeCache;

  })();

  instance = new TypeCache();

  instance.TypeCache = TypeCache;

  this.TypeCache = instance;

}).call(this);


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
  var TypeGenerator, instance;

  TypeGenerator = (function() {
    function TypeGenerator() {}

    TypeGenerator.prototype.generate = function(name) {
      var cls, func;
      this.$validateFunctionName(name);
      func = new Function("return function " + name + " ( ) {\n  if ( !( this instanceof " + name + " ) ) {\n    return new " + name + " ( );\n  }\n}");
      cls = func();
      this.$extend(name, cls);
      return cls;
    };

    TypeGenerator.prototype.$extend = function(name, cls) {
      var proto;
      proto = cls.prototype;
      return proto.toString = function() {
        return "[object " + name + "]";
      };
    };

    TypeGenerator.prototype.$validateFunctionName = function(name) {
      if (name == null) {
        throw new Error('Name required');
      }
      if (!/^[A-Z0-9]+$/i.test(name)) {
        throw new Error('Name contains invalid characters');
      }
      if (!/^[A-Z]$/i.test(name[0])) {
        throw new Error('First letter of Name must be a alpha character');
      }
      return true;
    };

    return TypeGenerator;

  })();

  instance = new TypeGenerator();

  instance.TypeGenerator = TypeGenerator;

  this.TypeGenerator = instance;

}).call(this);


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
  var SocketRequest;

  SocketRequest = (function() {
    function SocketRequest(module, protocol, command, payload, deferred) {
      this.module = module;
      this.protocol = protocol;
      this.command = command;
      this.payload = payload;
      this.deferred = deferred;
      this.id = uuid.v4();
    }

    SocketRequest.prototype.toJSON = function() {
      return {
        module: this.module,
        protocol: this.protocol,
        command: this.command,
        payload: this.payload,
        metadata: {
          id: this.id
        }
      };
    };

    return SocketRequest;

  })();

  this.SocketRequest = SocketRequest;

}).call(this);
