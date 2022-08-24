import { expect, test } from 'vitest'
import { NodeTypes } from './ast'
import { parser } from './parser'
import { TokenTypes } from './tokenizer'

test('parser tokens to ast', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.String, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.String, value: 'subtract' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: ')' }
  ]
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2'
          },
          {
            type: NodeTypes.CallExpression,
            name: 'subtract',
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: '4'
              },
              {
                type: NodeTypes.NumberLiteral,
                value: '2'
              }
            ]
          }
        ]
      }
    ]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('number', () => {
  const tokens = [{ type: TokenTypes.Number, value: '2' }]

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.NumberLiteral,
        value: '2'
      }
    ]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('name', () => {
  const tokens = [{ type: TokenTypes.String, value: 'hello' }]

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.StringLiteral,
        value: 'hello'
      }
    ]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('call expression (add 2 4)', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.String, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' }
  ]
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2'
          },
          {
            type: NodeTypes.NumberLiteral,
            value: '4'
          }
        ]
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})
