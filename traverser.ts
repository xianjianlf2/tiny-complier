import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from './ast'

interface VisitorOption {
  enter(node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined)
  exit(node: RootNode | ChildNode, parent: RootNode | ChildNode | undefined)
}
type ParentNode = RootNode | CallExpressionNode | undefined

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
    const visitorObj = visitor[node.type]
    // enter
    if (visitorObj) {
      visitorObj.enter(node, parent)
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
    if (visitorObj) {
      visitorObj.exit(node, parent)
    }
  }
  traverseNode(rootNode)
}
