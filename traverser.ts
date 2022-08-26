import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from './ast'

type ParentNode = RootNode | CallExpressionNode | undefined
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void

interface VisitorOption {
  enter: MethodFn
  exit?: MethodFn
}

export interface Visitor {
  Program?: VisitorOption
  CallExpression?: VisitorOption
  NumberLiteral?: VisitorOption
  StringLiteral?: VisitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 深度优先搜索

  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent)
    })
  }
  function traverseNode(node: ChildNode | RootNode, parent?: ParentNode) {
    const methods = visitor[node.type]
    // enter
    if (methods) {
      methods.enter(node, parent)
    }
    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break
      case NodeTypes.CallExpression:
        traverseArray(node.params, node)
        break
      case NodeTypes.Program:
        traverseArray(node.body, node)
        break
    }

    // exit
    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }
  traverseNode(rootNode)
}
