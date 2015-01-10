
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

      function Command(payload) {
        this.payload = payload;
        if (!(this instanceof Command)) {
          return new Command(this.payload);
        }
        this.promise = this.resolve(this.payload);
        this.promise.then((function(_this) {
          return function(response) {
            return _this.response = response;
          };
        })(this)).fail((function(_this) {
          return function(error) {
            return _this.error = error;
          };
        })(this));
        this.then = this.promise.then.bind(this.promise);
        this.fail = this.promise.fail.bind(this.promise);
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
          return Q.reject(new ValidationError('Payload not valid', form.errors));
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
          return Q.resolve();
        }
        if (possiblePromise.then instanceof Function && !(possiblePromise.fail instanceof Function) && possiblePromise["catch"] instanceof Function) {
          possiblePromise.fail = possiblePromise["catch"];
        }
        if (possiblePromise.then instanceof Function && possiblePromise.fail instanceof Function) {
          if (possiblePromise.progress instanceof Function) {
            return possiblePromise;
          }
          deferred = Q.defer();
          possiblePromise.then(deferred.resolve).fail(deferred.reject);
          if (possiblePromise.progress instanceof Function) {
            possiblePromise.progress(deferred.notify);
          }
          return deferred.promise;
        }
        return Q.resolve(possiblePromise);
      };

      return Command;

    })();
    return Command;
  };

  window.defineShipperCommand = defineShipperCommand;

}).call(this);
