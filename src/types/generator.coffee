###*
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
###
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