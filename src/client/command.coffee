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
defineShipperCommand = ( protocol, name, definition ) ->

  class Command
    @$name: name
    @$definition: definition
    @$route: definition.route
    @$method: definition.method
    @$schema: definition.schema

    @getName: ->
      return Command.$name

    @getDefinition: ->
      return Command.$definition

    @getRoute: ->
      return Command.$route

    @getMethod: ->
      return Command.$method

    @getSchema: ->
      return Command.$schema

    @hasSchema: ->
      return Command.getSchema( )?

    @validate: ( payload ) ->
      if Command.$$schema?
        return Command.$$schema.validate(
          payload
        )

      localSchema = Command.getSchema( )

      if not localSchema?
        return {
          valid: true
          data: payload
          errors: [ ]
        }

      Command.$$schema = schemajs.create(
        localSchema
      )

      return Command.validate( payload )

    constructor: ( @payload ) ->
      if @ not instanceof Command
        return new Command( @payload )

      @promise = @resolve( @payload )
      @promise
      .then( ( response ) =>
        @response = response
      )
      .fail( ( error ) =>
        @error = error
      )

      @then = @promise.then.bind( @promise )
      @fail = @promise.fail.bind( @promise )
      @progress = @promise.progress.bind( @promise )

    resolve: ->
      unless Command.hasSchema()
        res = @handler( @payload )
        return @resolvePromise( res )
      return @validate( @ayload )

    validate: ->
      form = Command.validate( @payload )

      unless form.valid
        return Q.reject(
          new ValidationError(
            'Payload not valid',
            form.errors
          )
        )

      res = @handler( form.data )
      return @resolvePromise( res )

    toString: ->
      return "Command [ #{ protocol.getModuleName( ) }.#{ protocol.getName( ) }##{ Command.getName( ) } ]"

    toJSON: ->
      json = Command.toJSON( )
      json.payload = @payload
      json.response = @response
      json.error = @error
      return json

    handler: ( payload ) ->
      return protocol.$send( Command.getName( ), payload )

    resolvePromise: ( possiblePromise ) ->
      unless possiblePromise?
        return Q.resolve( )

      if (
        possiblePromise.then instanceof Function and
          possiblePromise.fail not instanceof Function and
          possiblePromise.catch instanceof Function
      )
        possiblePromise.fail = possiblePromise.catch

      if (
        possiblePromise.then instanceof Function and
          possiblePromise.fail instanceof Function
      )
        unless possiblePromise.progress not instanceof Function
          return possiblePromise
        deferred = Q.defer()
        possiblePromise
        .then(
          deferred.resolve
        )
        .fail(
          deferred.reject
        )
        if possiblePromise.progress instanceof Function
          possiblePromise.progress(
            deferred.notify
          )
        return deferred.promise

      return Q.resolve( possiblePromise )



  return Command


window.defineShipperCommand = defineShipperCommand