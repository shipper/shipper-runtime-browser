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
class ShipperClient extends EventEmitter
  constructor: ( definition ) ->
    @$onLink( definition )
    @client = new SocketClient( )
    @client.once( 'capabilities', @$receiveCapabilities.bind( @ ) )
    @client.once( 'close', =>
      @emit( 'close' )
    )

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

  $receiveCapabilities: ( capabilities ) ->
    if capabilities.link
      @$send( 'protocol', 'link', 'generate', { } )
      .then( @$onLink.bind( @ ) )

  $onLink: ( definition = undefined ) ->
    unless definition?
      return
    @definition = definition
    @$$defineModules( )
    @emit( 'link', @ )

  $module: ( name ) ->
    deferred = ShipperEnvironment.defer()
    @ready( =>
      unless @$$modules[ name.toLowerCase( ) ]?
        return deferred.reject( "No module #{ name }")
      return deferred.resolve( @$$modules[ name.toLowerCase( ) ].value )
    )
    return deferred.promise

  ready: ( callback ) ->
    if @definition
      return callback( @ )
    @once( 'link', =>
      callback( @ )
    )

shipperClientInstance = undefined

this.newShipperClient = ->
  return shipperClientInstance = new ShipperClient( ShipperEnvironment.getProtocolDefinition( ) )

this.getShipperClient = ->
  if shipperClientInstance?
    return shipperClientInstance
  return shipperClientInstance = newShipperClient( )