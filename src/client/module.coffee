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
class ShipperModule
  constructor: ( @client, @name, @definition ) ->
    @$$defineProtocols( )

  $$defineProtocols: ->
    @$$protocols = { }
    for key, value of @definition
      unless @definition.hasOwnProperty( key )
        continue
      protocol = new ShipperProtocol( @, key, value )
      @$$protocols[ key.toLowerCase( ) ] = {
        key: key,
        value: protocol
        definition: value
      }
      unless @[ key ]?
        @[ key ] = protocol
    return @$$protocols

  $getProtocol: ( name ) ->
    unless typeof name is 'string'
      throw new TypeError( 'Name is expected to be a string' )
    protocol = @$$protocols[ name.toLowerCase( ) ]
    unless protocol?.value?
      throw new Error( "Unknown protocol: #{ name }" )
    return protocol.value

  $getCommand: ( protocolName, commandName ) ->
    protocol = @$getProtocol( protocolName )
    return protocol.$getCommand( commandName )

  $send: ( protocol, command, payload ) ->
    return @client.$send( @name, protocol, command, payload )


window.ShipperModule = ShipperModule