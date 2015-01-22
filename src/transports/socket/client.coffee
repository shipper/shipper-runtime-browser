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
class SocketClient extends EventEmitter
  constructor: ->
    @requests = { }
    @parameters = ShipperEnvironment.getWebSocketParameters( )
    @deferred = ShipperEnvironment.defer()
    @promise = @deferred.promise
    try
      @socket = new WebSocket(
        @parameters.url,
        @parameters.protocol
      )
      @socket.binaryType = 'arraybuffer'

      @socket.onmessage = @receive.bind( @ )

      @socket.error = @error.bind( @ )

      @socket.onopen = =>
        @deferred.resolve( @socket )
        @emit( 'open' )

      @socket.onclose = =>
        @closed = yes
        @emit( 'close' )

    catch e
      @deferred.reject( e )

    window.onbeforeunload = =>
      @close( )

  close: ->
    @socket.close( )

  error: ( error ) ->
    console.log( error )

  receive: ( message ) ->

    if typeof message.data is 'string'
      data = JSON.parse( message.data )
    else if message.data instanceof ArrayBuffer
      array = new Uint8Array( message.data )
      data = BSON.deserialize( array )
    else
      data = BSON.deserialize( message.data )

    unless data?
      return

    if data.metadata?.id?
      return @receiveWithId( data.metadata.id, data )

    if data.command is 'capabilities' and data.payload?
      return @receiveCapabilities( data.payload )

  receiveCapabilities: ( payload ) ->
    @emit( 'capabilities', payload )

  receiveWithId: ( id, data ) ->

    req = @requests[ id ]

    unless req?
      return

    if data.error
      req.deferred.reject( data.error )
    else if data.notify
      req.deferred.notify( data.payload )
    else
      req.deferred.resolve( data.payload )

  sendRequest: ( module, protocol, command, payload ) ->
    deferred = ShipperEnvironment.defer()
    req = new SocketRequest(
      module,
      protocol,
      command,
      payload,
      deferred
    )

    @requests[ req.id ] = req

    setTimeout( ->
      req.deferred.reject( 'Request timed out' )
    , @parameters.timeout)

    @send( req )

    return deferred.promise

  send: ( data ) ->
    if @closed
      return ShipperEnvironment.reject( 'Connection is closed' )
    if typeof data isnt 'string'
      try
        if data.toJSON?
          data = data.toJSON( )
        data = BSON.serialize( data )
    @promise
    .then( =>
      @socket.send( data )
    )

this.SocketClient = SocketClient