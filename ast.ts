export enum NodeTypes {
  Program,
  NumberLiteral,
  StringLiteral,
  CallExpression
}

interface Node {
  type: NodeTypes
}
type ChildNode = NumberLiteralNode | CallExpressionNode | StringLiteralNode

interface RootNode extends Node {
  type: NodeTypes.Program
  body: ChildNode[]
}
interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral
  value: string
}
interface StringLiteralNode extends Node {
  type: NodeTypes.StringLiteral
  value: string
}
interface CallExpressionNode extends Node {
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
