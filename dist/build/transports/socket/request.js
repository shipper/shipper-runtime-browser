
/**
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
 */

(function() {
  var SocketRequest;

  SocketRequest = (function() {
    function SocketRequest(module, protocol, command, payload, deferred) {
      this.module = module;
      this.protocol = protocol;
      this.command = command;
      this.payload = payload;
      this.deferred = deferred;
      this.id = uuid.v4();
    }

    SocketRequest.prototype.toJSON = function() {
      return {
        module: this.module,
        protocol: this.protocol,
        command: this.command,
        payload: this.payload,
        metadata: {
          id: this.id
        }
      };
    };

    return SocketRequest;

  })();

  window.SocketRequest = SocketRequest;

}).call(this);
