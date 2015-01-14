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
class ShipperEnvironmentObject

  deferCallback: null

  setProtocolDefinition: ( @protocolDefinition ) ->

  getProtocolDefinition: ->
    return @protocolDefinition or window[ "ShipperClientDefinition" ]

  hasProtocolDefinition: ->
    return @getProtocolDefinition( )?

  setWebSocketParameters: ( @socketParams ) ->

  getWebSocketParameters: ->
    return @socketParams or {
      url: 'ws://localhost:2202'
      protocol: 'shipper'
      timeout: 10000
    }

  setPromiseLibrary: ( lib ) ->
    @deferCallback = lib.defer
    @deferResolve = lib.resolve
    @deferReject = lib.reject

  resolve: ->
    unless @deferResolve instanceof Function
      unless Q?.resolve instanceof Function
        return
      return Q.resolve.apply( null, arguments )
    return @deferResolve.apply( null, arguments )

  reject: ->
    unless @deferReject instanceof Function
      unless Q?.reject instanceof Function
        return
      return Q.reject.apply( null, arguments )
    return @deferReject.apply( null, arguments )

  defer: ->
    unless @deferCallback instanceof Function
      unless Q?.defer instanceof Function
        return
      return Q.defer( )
    return @deferCallback( )

this.ShipperEnvironment = new ShipperEnvironmentObject( )
