export const swaggerDocument = 
{
    "openapi": "3.0.3",
    "info": {
      "title": "My Bank API",
      "description": "Aqui vai a descrição da API",
      "version": "1.0.0"
    },
    "tags": [
      {
        "name": "account",
        "description": "Gerenciamento das contas salvas"
      }
    ],
    "paths": {
      "/account": {
        "get": {
          "tags": [
            "account"
          ],
          "summary": "Encontre as contas existentes",
          "description": "Retorna todas as contas cadastradas no banco de dados.",
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Account"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Error occurred"
            }
          }
        },
        "post": {
          "tags": [
            "Account"
          ],
          "summary": "Cria uma nova conta",
          "description": "Cria uma nova conta com os dados informados no body da requisição",
          "requestBody": {
            "description": "Cria uma nova conta no banco",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Requisicao bem sucedida"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Account": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "Renato"
            },
            "balance": {
              "type": "number",
              "example": 2334.32
            }
          }
        }
      }
    }
  };