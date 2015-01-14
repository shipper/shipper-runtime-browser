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
class ShipperClient
  constructor: ( @definition ) ->
    @$$defineModules( )
    @client = new SocketClient( )

  $$defineModules: ->
    @$$modules = { }
    for key, value of @definition.modules
      unless @definition.modules.hasOwnProperty( key )
        continue
      module = new ShipperModule( @, key, value )
      @$$modules[ key.toLowerCase( ) ] = {
        key: key,
        value: module,
        definition: value
      }
      unless @[ key ]?
        @[ key ] = module
    return @$$modules

  $getModule: ( name ) ->
    unless typeof name is 'string'
      throw new TypeError( 'Name is expected to be a string' )
    module = @$$modules[ name.toLowerCase( ) ]
    unless module?.value?
      throw new Error( "Unknown module: #{ name }")
    return module.value

  $getProtocol: ( moduleName, protocolName ) ->
    module = @$getModule( moduleName )
    return module.$getProtocol( protocolName )

  $getCommand: ( moduleName, protocolName, commandName ) ->
    module = @$getModule( moduleName )
    return module.$getCommand( protocolName, commandName )

  $send: ( module, protocol, command, payload ) ->
    return @client.sendRequest( module, protocol, command, payload )

shipperClientInstance = undefined

this.newShipperClient = ->
  unless ShipperEnvironment.hasProtocolDefinition( )
    throw new Error( "No definition implemented" )
  return shipperClientInstance = new ShipperClient( ShipperEnvironment.getProtocolDefinition( ) )

this.getShipperClient = ->
  if shipperClientInstance?
    return shipperClientInstance
  return shipperClientInstance = newShipperClient( )