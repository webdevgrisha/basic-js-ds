const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    if (!this.tree) {
      this.tree = new Node(data);
      return;
    }

    let currNode = this.tree;

    while (true) {
      if (data < currNode.data) {
        if (!currNode.left) {
          currNode.left = new Node(data);
          break;
        } else {
          currNode = currNode.left;
        }
      } else {
        if (!currNode.right) {
          currNode.right = new Node(data);
          break;
        } else {
          currNode = currNode.right;
        }
      }
    }
  }

  has(data) {
    let currNode = this.tree;
    let isExist = false;

    while (!isExist && currNode) {
      if (data === currNode.data) {
        isExist = true;
        break;
      }

      currNode = data < currNode.data ? currNode.left : currNode.right;
    }

    return isExist;
  }

  find(data) {
    let currNode = this.tree;
    let node = null;

    while (!node && currNode) {
      if (data === currNode.data) {
        node = currNode;
        break;
      }

      currNode = data < currNode.data ? currNode.left : currNode.right;
    }

    return node;
  }

  remove(data) {
    let currNode = this.tree;
    let prev = null;
    let branch = null;

    while (currNode) {
      if (data !== currNode.data) {
        prev = currNode;

        if (data < currNode.data) {
          branch = "left";
          currNode = currNode.left;
        } else {
          branch = "right";
          currNode = currNode.right;
        }

        continue;
      }

      if (currNode.left === null && currNode.right === null) {
        !prev ? (this.tree = null) : (prev[branch] = null);
      } else if (currNode.right === null) {
        !prev ? (this.tree = currNode.left) : (prev[branch] = currNode.left);
      } else if (currNode.left === null) {
        !prev ? (this.tree = currNode.right) : (prev[branch] = currNode.right);
      } else {
        const leftBranch = currNode.left;
        const rightBranch = currNode.right;

        let node = currNode.right;
        let prevNode = currNode;

        while (node) {
          if (!node.left) break;
          prevNode = node;
          node = node.left;
        }

        prevNode.left = node.right;

        node.left = leftBranch;
        node.right = rightBranch;

        !prev ? (this.tree = node) : (prev[branch] = node);
      }

      break;
    }
  }

  min() {
    let currNode = this.tree;
    let min = null;

    while (currNode) {
      min = currNode;

      currNode = currNode.left;
    }

    return min && min.data;
  }

  max() {
    let currNode = this.tree;
    let max = null;

    while (currNode) {
      max = currNode;

      currNode = currNode.right;
    }

    return max && max.data;
  }
}

module.exports = {
  BinarySearchTree,
};
