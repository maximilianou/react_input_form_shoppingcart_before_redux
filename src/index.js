import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: Date.now(),
      name: "",
      price: 0
    };
    this.state = this.initialState;
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };
  render() {
    const { id, name, price } = this.state;
    return (
      <form>
        <label htmlFor="id">
          Id
          <input
            type="text"
            readOnly
            id="id"
            name="id"
            value={id}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="price">
          price
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={this.handleChange}
          />
        </label>
        <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}

const ProductsList = props => {
  const { products, adding } = props;
  return (
    <section>
      <h2>List of Products</h2>
      {products.map(product => (
        <article key={"product_" + product.id}>
          <h4>{product.name}</h4>
          <span>{product.price}</span>
          <button onClick={adding} value={JSON.stringify(product)}>
            +
          </button>
        </article>
      ))}
    </section>
  );
};
const ItemsList = props => {
  const { items, removing } = props;
  return (
    <section>
      {items.map(item => (
        <article key={"item_" + item.product.id}>
          <h4>{item.product.name}</h4>
          <span>{item.product.price}</span>
          <span>{item.quantity}</span>
          <span>{item.quantity * item.product.price}</span>
          <button onClick={removing} value={JSON.stringify(item)}>
            -
          </button>
        </article>
      ))}
    </section>
  );
};
class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        <h2>Shopping Cart</h2>
        <ItemsList items={this.props.items} removing={this.props.removing} />
      </section>
    );
  }
}
class App extends React.Component {
  state = {
    products: [
      { id: 20, name: "Limonade", price: 200 },
      { id: 21, name: "Green Tea", price: 150 },
      { id: 22, name: "Chocolate Milk", price: 350 }
    ],
    items: []
  };
  constructor(props) {
    super(props);
    this.adding = this.adding.bind(this);
    this.removing = this.removing.bind(this);
  }
  adding = evt => {
    const product = JSON.parse(evt.target.value);
    let item = this.state.items.find(ite => ite.product.id === product.id);
    if (item === null || item === undefined) {
      item = {};
      item.product = product;
    }
    if (item.quantity === undefined) {
      item.quantity = 1;
      this.setState({ items: [...this.state.items, item] });
    } else {
      item.quantity += 1; // mm.. here i'm changing the original object. mmm...
      this.setState({ items: [...this.state.items] });
    }
  };
  removing = evt => {
    const item_p = JSON.parse(evt.target.value);
    const item = this.state.items.find(
      ite => ite.product.id === item_p.product.id
    );
    if (item.quantity === 1) {
      const listItems = this.state.items.filter(
        ite => ite.product.id !== item.product.id
      );
      this.setState({
        items: listItems
      });
    } else {
      item.quantity -= 1; // mmm.. here i'm changing the original object. mmm...
      this.setState({ items: [...this.state.items] });
    }
  };
  handleSubmit = product => {
    this.setState({ products: [...this.state.products, product] });
  };
  render() {
    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit} />
        <ProductsList products={this.state.products} adding={this.adding} />
        <ShoppingCart items={this.state.items} removing={this.removing} />
      </div>
    );
  }
}

const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
