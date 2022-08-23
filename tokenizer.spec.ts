import { test, expect } from 'vitest'
import { tokenizer, TokenTypes } from './tokenizer'

test.skip('tokenizer', () => {
  const code = `(add (subtract 4 2))`

  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' }
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
  const tokens = [{ type: TokenTypes.Name, value: 'add' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = `22`
  const tokens = [{ type: TokenTypes.Number, value: '22' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test.skip('(add 1 2)', () => {
  const code = `(add (subtract 4 2))`

  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '1' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' }
  ]
  expect(tokenizer(code)).toEqual(tokens)
})
