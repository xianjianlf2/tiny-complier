export enum NodeTypes {
  Program = 'Program',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  CallExpression = 'CallExpression'
}

interface Node {
  type: NodeTypes
}
export type ChildNode =
  | NumberLiteralNode
  | CallExpressionNode
  | StringLiteralNode

export interface RootNode extends Node {
  type: NodeTypes.Program
  body: ChildNode[]
}
export interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral
  value: string
}
export interface StringLiteralNode extends Node {
  type: NodeTypes.StringLiteral
  value: string
}
export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression
  name: string
  params: ChildNode[]
}

export function createRootNode(): RootNode {
  return { type: NodeTypes.Program, body: [] }
}
export function createNumberLiteralNode(value: string): NumberLiteralNode {
  return { type: NodeTypes.NumberLiteral, value }
}
export function createStringLiteralNode(value: string): StringLiteralNode {
  return { type: NodeTypes.StringLiteral, value }
}

export function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: []
  }
}
