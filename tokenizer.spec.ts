import { test, expect } from 'vitest'
import { tokenizer, TokenTypes } from './tokenizer'

test('(add 2 (subtract 4 2))', () => {
  const code = `(add 2 (subtract 4 2))`

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
  expect(tokenizer(code)).toEqual(tokens)
})

test('left parent', () => {
  const code = `(`
  const tokens = [{ type: TokenTypes.Paren, value: '(' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('right parent', () => {
  const code = `)`
  const tokens = [{ type: TokenTypes.Paren, value: ')' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('add', () => {
  const code = `add`
  const tokens = [{ type: TokenTypes.String, value: 'add' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = `22`
  const tokens = [{ type: TokenTypes.Number, value: '22' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test('(add 1 2)', () => {
  const code = `(add 1 2)`

  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.String, value: 'add' },
    { type: TokenTypes.Number, value: '1' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' }
  ]
  expect(tokenizer(code)).toEqual(tokens)
})
