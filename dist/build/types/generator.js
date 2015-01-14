
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
