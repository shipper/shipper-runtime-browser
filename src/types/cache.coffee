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
class TypeCache
  $$types: undefined
  constructor: ->
    @$$types = { }

  addType: ( name, type ) ->
    oldType = @$$types[ name ]
    @$$types[ name ] = type

    unless @window
      return

    if typeof @window is 'boolean'
      @window = window

    if oldType?
      unless @window[ name ] is oldType
        return
      @window[ name ] = undefined

    if @window[ name ]?
      return

    @window[ name ] = type

  getType: ( name, schema = undefined ) ->
    type = @$$types[ name ]
    if type?
      return type
    type = @generateType( name, schema )
    @addType( name, type )
    return type

  getInstance: ( name, id, schema = undefined ) ->
    type = @getType( name, schema )
    unless id?
      return new type( )

    instance = ( type.$$instances ?= { } )[ id ]
    if instance
      return instance

    instance = new type( )
    type.$$instances[ id ] = instance
    return instance

  generateType: ( name, schema = undefined ) ->
    return TypeGenerator.generate( name, schema )

instance = new TypeCache()
instance.TypeCache = TypeCache

this.TypeCache = instance
