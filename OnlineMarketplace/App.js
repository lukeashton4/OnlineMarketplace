import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  //product node
  class ProductNode {
    constructor(id, name, description, price) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.next = null;
    }
  }

  //catalogue linked list
  class Catalogue {
    constructor() {
      this.head = null;
    }

    //add a new product
    addProduct(name, description, price) {
      let id = 0;

      if (!this.head) {
        id = 1;
        const newProduct = new ProductNode(id, name, description, price);
        this.head = newProduct;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        id = current.id + 1;
        const newProduct = new ProductNode(id, name, description, price);
        current.next = newProduct;
      }
    }

    deleteProduct(id) {
      if (!this.head) {
        return; //catalogue has no items
      }

      if (this.head.id === id) {
        this.head = this.head.next;
        return; //deletes the head node
      }

      let prev = this.head;
      let current = this.head.next;

      while (current) {
        if (current.id === id) {
          prev.next = current.next;
          return; //deletes the current node
        }

        prev = current;
        current = current.next;
      }
    }

    //return product if it exists
    searchProduct(name) {
      let current = this.head;
      while (current) {
        if (current.name === name) {
          return current;
        }
        current = current.next;
      }
      return null;
    }

    //returns catalogue length
    getCatalogueLength() {
      let count = 0;
      let current = this.head;

      while (current) {
        count++;
        current = current.next;
      }

      return count;
    }

    //returns catalogue
    getCatalogue() {
      let current = this.head;
      let products = [];

      while (current) {
        products.push(current);
        current = current.next;
      }

      return products;
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

  //user management tree
  class UserManagement {
    constructor() {
      this.root = null;
    }

    //insert a new user account
    insertUser(id, username, email, password) {
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

    //deletes a user account
    deleteUser(id) {
      this.root = this.deleteNode(this.root, id);
    }

    deleteNode(node, id) {
      if (!node) {
        return null; // User not found
      }

      if (id === node.id) {
        //if node has no children
        if (!node.left && !node.right) {
          return null;
        }

        //if node has only one child
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }

        //if node has two children
        const minNode = this.findMinNode(node.right);
        node.id = minNode.id;
        node.username = minNode.username;
        node.email = minNode.email;
        node.password = minNode.password;
        node.right = this.deleteNode(node.right, minNode.id);
        return node;
      }

      if (id < node.id) {
        node.left = this.deleteNode(node.left, id);
      } else {
        node.right = this.deleteNode(node.right, id);
      }

      return node;
    }

    //returns user
    getUser(id) {
      return this.searchNode(this.root, id);
    }

    //returns user if they exist
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

  //catalogue usage example
  const catalogue = new Catalogue(); //initializes catalogue
  catalogue.addProduct(
    "Gaming Chair",
    "Comfy chair for all your gaming needs!",
    80
  ); //adds a product to the catalogue
  catalogue.addProduct("Water Bottle", "Quench your thirst!", 5); //adds a product to the catalogue
  const product = catalogue.searchProduct("Water Bottle"); //finds existing product
  console.log("product", product); //logs found product
  const catalogueLength = catalogue.getCatalogueLength(); //finds number of products in catalogue
  catalogue.deleteProduct(1); //deletes an existing product
  console.log("catalogue", catalogue.getCatalogue()); //returns whole catalogue

  //userManagement usage example
  const userManagement = new UserManagement(); //initializes userManagement
  userManagement.insertUser(
    1,
    "Luke Ashton",
    "luke.ashton@something.com",
    "thisisapassword"
  ); //adds a new user
  userManagement.insertUser(
    2,
    "Bob Smith",
    "bobsmith@somethingelse.com",
    "bobsmithspassword"
  ); //adds a new user
  const user = userManagement.getUser(1); //returns existing user
  console.log("user", user); //logs existing user
  userManagement.deleteUser(1); //deletes an existing user

  const renderCatalogue = () =>
    catalogue.getCatalogue().map((product) => (
      <View>
        <Text>{product.name}</Text>
        <Text>{product.description}</Text>
        <Text>{product.price}</Text>
        <Button
          title={"Delete"}
          onPress={() => catalogue.deleteProduct(product.id)}
        />
      </View>
    ));

  return (
    <View>
      <Text>Add a product:</Text>
      <Text>Name</Text>
      <TextInput
        value={newProductName}
        onChangeText={(value) => setNewProductName(value)}
      />
      <Text>Description</Text>
      <TextInput
        value={newProductDescription}
        onChangeText={(value) => setNewProductDescription(value)}
      />
      <Text>Price</Text>
      <TextInput
        value={newProductPrice}
        onChangeText={(value) => setNewProductPrice(value)}
      />

      <Button
        title={"add product"}
        onPress={() =>
          catalogue.addProduct(
            newProductName,
            newProductDescription,
            newProductPrice
          )
        }
      />

      <Button
        title={"get length"}
        onPress={() => console.log(catalogue.getCatalogueLength())}
      />

      <Button
        title={"get array"}
        onPress={() => console.log(catalogue.getCatalogue())}
      />

      <Text>Search for a Product:</Text>
      <TextInput
        value={searchTerm}
        onChangeText={(value) => setSearchTerm(value)}
      />

      <Button
        title={"search"}
        onPress={() => catalogue.searchProduct(searchTerm)}
      />

      {renderCatalogue()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
