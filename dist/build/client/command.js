
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
