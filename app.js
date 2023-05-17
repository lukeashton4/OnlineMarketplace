// Product Node
class ProductNode {
  constructor(id, name, description, price, seller) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.seller = seller;
    this.next = null;
  }
}

// Product Catalog Linked List
class ProductCatalog {
  constructor() {
    this.head = null;
  }

  addProduct(id, name, description, price, seller) {
    const newNode = new ProductNode(id, name, description, price, seller);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  getProduct(id) {
    let current = this.head;
    while (current) {
      if (current.id === id) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
}

// User Node
class UserNode {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.left = null;
    this.right = null;
  }
}

// User Management Tree
class UserManagement {
  constructor() {
    this.root = null;
  }

  addUser(id, username, email, password) {
    const newNode = new UserNode(id, username, email, password);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.id < node.id) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  getUser(id) {
    return this.searchNode(this.root, id);
  }

  searchNode(node, id) {
    if (!node || node.id === id) {
      return node;
    }
    if (id < node.id) {
      return this.searchNode(node.left, id);
    } else {
      return this.searchNode(node.right, id);
    }
  }
}

// Usage Example
const productCatalog = new ProductCatalog();
productCatalog.addProduct(1, "Product 1", "Description 1", 10, "Seller 1");
productCatalog.addProduct(2, "Product 2", "Description 2", 20, "Seller 2");
const product = productCatalog.getProduct(2);
console.log(product); // Output: ProductNode { id: 2, name: 'Product 2', description: 'Description 2', price: 20, seller: 'Seller 2', next: null }

const userManagement = new UserManagement();
userManagement.addUser(1, "User 1", "user1@example.com", "password1");
userManagement.addUser(2, "User 2", "user2@example.com", "password2");
const user = userManagement.getUser(1);
console.log(user); // Output: UserNode { id: 1, username: 'User 1', email: 'user1@example.com', password: 'password1', left: null, right: null }
