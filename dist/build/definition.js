
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
  window.ShipperClientDefinition = {
    "modules": {
      "authentication": {
        "agent": {
          "login": {
            "name": "login",
            "route": ["/agent/login/:username", "/agent/login"],
            "method": ["PUT", "POST"],
            "schema": {
              "username": {
                "type": "string",
                "required": true
              },
              "password": {
                "type": "string",
                "required": true
              }
            }
          },
          "getAgents": {
            "name": "getAgents",
            "route": "/agent",
            "method": "GET",
            "schema": {}
          },
          "putAgent": {
            "name": "putAgent",
            "route": ["/agent", "/agent/:key"],
            "method": ["PUT", "POST"],
            "schema": {
              "key": {
                "type": "string"
              },
              "value": {
                "type": "object",
                "required": true,
                "schema": {
                  "name": {
                    "type": "string+"
                  },
                  "type": {
                    "type": "string",
                    "properties": {
                      "regex": {}
                    }
                  },
                  "role": {
                    "type": "string",
                    "properties": {
                      "regex": {}
                    }
                  },
                  "username": {
                    "type": "string+",
                    "required": true
                  },
                  "password": {
                    "type": "string+"
                  },
                  "location": {
                    "type": "object",
                    "schema": {
                      "key": {
                        "type": "string"
                      }
                    }
                  },
                  "features": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string+",
                          "properties": {
                            "regex": {}
                          }
                        }
                      }
                    }
                  },
                  "facilities": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string+"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "getAgent": {
            "name": "getAgent",
            "route": "/agent",
            "method": "GET",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "deleteAgent": {
            "name": "deleteAgent",
            "route": "/agent/:key",
            "method": "DELETE",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          }
        }
      },
      "data": {},
      "inventory": {
        "item": {
          "getItems": {
            "name": "getItems",
            "route": "/item",
            "method": "GET",
            "schema": {}
          },
          "putItem": {
            "name": "putItem",
            "route": ["/item", "/item/:key"],
            "method": ["PUT", "POST"],
            "schema": {
              "key": {
                "type": "string"
              },
              "value": {
                "type": "object",
                "required": true,
                "schema": {
                  "manufacture_iso3166_1": {
                    "type": "object",
                    "schema": {
                      "key": {
                        "type": "string"
                      }
                    }
                  },
                  "stock_keeping_unit": {
                    "type": "string",
                    "required": true
                  },
                  "universal_product_code": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string",
                    "required": true
                  },
                  "description_extended": {
                    "type": "string"
                  },
                  "lead_time": {
                    "type": "number"
                  },
                  "safety_stock": {
                    "type": "number"
                  },
                  "minimum_stock": {
                    "type": "number"
                  },
                  "maximum_stock": {
                    "type": "number"
                  },
                  "purchase_price": {
                    "type": "number"
                  },
                  "sale_price": {
                    "type": "number"
                  },
                  "measurement": {
                    "type": "object",
                    "schema": {
                      "length": {
                        "type": "number"
                      },
                      "width": {
                        "type": "number"
                      },
                      "height": {
                        "type": "number"
                      },
                      "weight": {
                        "type": "number"
                      },
                      "imperial": {
                        "type": "boolean"
                      }
                    }
                  },
                  "pallet": {
                    "type": "object",
                    "schema": {
                      "items_per_tier": {
                        "type": "number"
                      },
                      "tiers": {
                        "type": "number"
                      },
                      "measurement": {
                        "type": "object",
                        "schema": {
                          "length": {
                            "type": "number"
                          },
                          "width": {
                            "type": "number"
                          },
                          "height": {
                            "type": "number"
                          },
                          "weight": {
                            "type": "number"
                          },
                          "imperial": {
                            "type": "boolean"
                          }
                        }
                      }
                    }
                  },
                  "grouping": {
                    "type": "object",
                    "schema": {
                      "key": {
                        "type": "string"
                      },
                      "value": {
                        "type": "object",
                        "schema": {
                          "name": {
                            "type": "string",
                            "required": true
                          },
                          "items": {
                            "type": "number"
                          },
                          "measurement": {
                            "type": "object",
                            "schema": {
                              "length": {
                                "type": "number"
                              },
                              "width": {
                                "type": "number"
                              },
                              "height": {
                                "type": "number"
                              },
                              "weight": {
                                "type": "number"
                              },
                              "imperial": {
                                "type": "boolean"
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "variations": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string"
                        },
                        "value": {
                          "type": "object",
                          "required": true,
                          "schema": {
                            "stock_keeping_unit": {
                              "type": "string"
                            },
                            "description": {
                              "type": "string"
                            },
                            "variations": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "schema": {
                                  "key": {
                                    "type": "string"
                                  },
                                  "value": {
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "getItem": {
            "name": "getItem",
            "route": "/item/:key",
            "method": "GET",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "deleteItem": {
            "name": "deleteItem",
            "route": "/item/:key",
            "method": "DELETE",
            "schema": {
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "getItemVariations": {
            "name": "getItemVariations",
            "route": "/item/:itemKey/variation",
            "method": "GET",
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              }
            }
          },
          "putItemVariation": {
            "name": "putItemVariation",
            "route": ["/item/:itemKey/variation", "/item/:itemKey/variation/:key"],
            "method": ["PUT", "POST"],
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              },
              "key": {
                "type": "string"
              },
              "variation": {
                "type": "object",
                "required": true,
                "schema": {
                  "stock_keeping_unit": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "variations": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "schema": {
                        "key": {
                          "type": "string"
                        },
                        "value": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "getItemVariation": {
            "name": "getItemVariation",
            "route": "/item/:itemKey/variation/:key",
            "method": "GET",
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              },
              "key": {
                "type": "string",
                "required": true
              }
            }
          },
          "deleteItemVariation": {
            "name": "deleteItemVariation",
            "route": "/item/:itemKey/variation/:key",
            "method": "DELETE",
            "schema": {
              "itemKey": {
                "type": "string",
                "required": true
              },
              "key": {
                "type": "string",
                "required": true
              }
            }
          }
        }
      },
      "shipping": {
        "fastway": {}
      }
    },
    "types": {}
  };

}).call(this);
