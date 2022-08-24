import {
  createCallExpressionNode,
  createNumberLiteralNode,
  createRootNode,
  createStringLiteralNode
} from './ast'
import { Token, TokenTypes } from './tokenizer'

export function parser(tokens: Token[]) {
  let current = 0
  const ast = createRootNode()

  function walk() {
    let token = tokens[current]
    if (token.type === TokenTypes.Number) {
      // rootNode.body.push(createNumberNode(token.value))
      current++
      return createNumberLiteralNode(token.value)
    }
    if (token.type === TokenTypes.String) {
      current++
      return createStringLiteralNode(token.value)
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current]
      const node = createCallExpressionNode(token.value)

      token = tokens[++current]
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        node.params.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    throw new Error(`undefined token: ${token}`)
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }
  return ast
}
