class TypeCache
  $$types: undefined
  constructor: ->
    @$$types = { }

  addType: ( name, type ) ->
    @$$types[ name ] = type

  getType: ( name, schema = undefined ) ->
    type = @$$types[ name ]
    if type?
      return type
    type = @generateType( name, schema )
    @addType( name, type )
    return type

  generateType: ( name, schema = undefined ) ->
    return TypeGenerator.generate( name, schema )

instance = new TypeCache()
instance.TypeCache = TypeCache

this.TypeCache = instance
