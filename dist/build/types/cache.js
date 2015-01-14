(function() {
  var TypeCache, instance;

  TypeCache = (function() {
    TypeCache.prototype.$$types = void 0;

    function TypeCache() {
      this.$$types = {};
    }

    TypeCache.prototype.addType = function(name, type) {
      return this.$$types[name] = type;
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
