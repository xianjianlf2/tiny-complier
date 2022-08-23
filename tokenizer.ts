export enum TokenTypes {
  Paren,
  Name,
  Number
}

interface Token {
  type: TokenTypes
  value: string
}
// 通过指针的方式去遍历字符串，根据token的类型入栈
export function tokenizer(code: string) {
  const tokens: Token[] = []
  let current = 0
  let char = code[current]
  if (char === '(') {
    tokens.push({
      type: TokenTypes.Paren,
      value: char
    })
  }
  if (char === ')') {
    tokens.push({
      type: TokenTypes.Paren,
      value: char
    })
  }

  // char
  const LETTERS = /[a-z]/i
  if (LETTERS.test(char)) {
    let value = ''
    while (LETTERS.test(char) && current < code.length) {
      value += char
      char = code[++current]
    }
    tokens.push({
      type: TokenTypes.Name,
      value
    })
  }
  // number

  const NUMBERS = /[0-9]/i
  if (NUMBERS.test(char)) {
    let value = ''
    while (NUMBERS.test(char) && current < code.length) {
      value += char
      char = code[++current]
    }
    tokens.push({
      type: TokenTypes.Number,
      value
    })
  }
  return tokens
}
