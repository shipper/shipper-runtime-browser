
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
