class TypeGenerator
  generate: ( name ) ->
    @$validateFunctionName( name )

    func = new Function( """
        return function #{ name } ( ) {
          if ( !( this instanceof #{ name } ) ) {
            return new #{ name } ( );
          }
        }
    """ )
    cls = func( )

    @$extend( name, cls )

    return cls

  $extend: ( name, cls ) ->
    proto = cls.prototype
    proto.toString = ->
      return "[object #{ name }]"


  $validateFunctionName: ( name ) ->
    unless name?
      throw new Error( 'Name required' )
    unless /^[A-Z0-9]+$/i.test( name )
      throw new Error( 'Name contains invalid characters' )
    unless /^[A-Z]$/i.test( name[ 0 ] )
      throw new Error( 'First letter of Name must be a alpha character' )
    return true

instance = new TypeGenerator( )
instance.TypeGenerator = TypeGenerator

this.TypeGenerator = instance