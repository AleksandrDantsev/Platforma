export const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "code": { "type": "string" },
      "columns": {
        "type": "array",
        "minItems": 1,
        "items": {
          "type": "object",
          "properties": {
            "dataField": { "type": "string" },
            "caption": { "type": "string" },
            "dataType": { "type": "string" },
            "format": { "type": "string" },
            "alignment": { "type": "string" }
          },
          "required": ["dataField", "caption"]
        }
      }
    },
    "required": ["name", "code", "columns"]
  }