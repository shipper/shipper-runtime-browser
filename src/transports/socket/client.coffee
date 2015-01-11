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
class SocketClient
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

      @socket.onmessage = @receive.bind( @ )

      @socket.error = @error.bind( @ )

      @socket.onopen = =>
        @deferred.resolve( @socket )

      @socket.onclose = =>
        @closed = yes
    catch e
      @deferred.reject( e )

    window.onbeforeunload = =>
      @close( )

  close: ->
    @socket.close( )

  error: ( error ) ->
    console.log( error )

  receive: ( message ) ->
    try
      json = JSON.parse( message.data )

    unless json
      return

    unless json?.metadata?.id?
      return

    req = @requests[ json.metadata.id ]

    unless req?
      return

    if json.error
      req.deferred.reject( json.error )
    else if json.notify
      req.deferred.notify( json.payload )
    else
      req.deferred.resolve( json.payload )


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
      return Q.reject( 'Connection is closed' )
    if typeof data isnt 'string'
      try
        data = JSON.stringify( data )
    @promise
    .then( =>
      @socket.send( data )
    )

window.SocketClient = SocketClient