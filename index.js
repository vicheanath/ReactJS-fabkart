import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header';
import Products from './components/Products';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import Filter from './components/Filter';
import QuickView from './components/QuickView';
import Range from './components/Range';

const url = "http://localhost:5000/restaurantmenu-fda8e/asia-east2/api/";
class App extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			term: '',
			category: [],
			cartBounce: false,
			quantity: 1,
			quickViewProduct: {},
			modalActive: false,
			show: "showall",
			min: 0,
			max: 1200,
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleMobileSearch = this.handleMobileSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleChangeShow = this.changeShow.bind(this);
	}
	// Fetch Initial Set of Products from external API
	getProducts() {
		
		axios.get(url+'products')
			.then(res => {
				this.setState({
					products: res.data,
				})
			})
	}
	getCategory() {
		axios.get(url+'categorys')
			.then(res => {
				this.setState({
					category: res.data,
				})
				console.log(res.data);
			})
	}
	componentWillMount() {
		this.getProducts();
		this.getCategory();
	}

	// Search by Keyword
	handleSearch(event) {
		this.setState({ term: event.target.value });
	}
	// Mobile Search Reset
	handleMobileSearch() {
		this.setState({ term: "" });
	}
	// Filter by Category
	handleCategory(event) {
		this.setState({ category: event.target.value });
		console.log(this.state.category);
	}
	// Add to Cart
	handleAddToCart(selectedProducts) {
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		if (this.checkProduct(productID)) {
			let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart: cartItem,
			cartBounce: true,
		});
		setTimeout(function () {
			this.setState({ cartBounce: false });
		}.bind(this), 1000);
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	handleRemoveProduct(id, e) {
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
	}
	checkProduct(productID) {
		let cart = this.state.cart;
		return cart.some(function (item) {
			return item.id === productID;
		});
	}
	sumTotalItems() {
		let total = 0;
		let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
	}
	sumTotalAmount() {
		let total = 0;
		let cart = this.state.cart;
		for (var i = 0; i < cart.length; i++) {
			total += cart[i].price * parseInt(cart[i].quantity);
		}
		this.setState({
			totalAmount: total
		})
	}
	//Update Quantity
	updateQuantity(qty) {
		console.log("hola!")
		this.setState({
			moq: qty
		})
	}
	//Reset Quantity
	updateQuantity(qty) {
		console.log("hola!")
		this.setState({
			quantity: qty
		})
	}
	// Open Modal
	openModal(product) {
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}
	// Close Modal
	closeModal() {
		this.setState({
			modalActive: false
		})
	}
	changeShow(show) {
		this.setState({ show: show });
	}
	changeRange({ value }) {
		this.setState({
			max: value.max,
			min: value.min,
		});

	}

	render() {
		return (
			<div className="container">
				<Header
					cartBounce={this.state.cartBounce}
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
					handleSearch={this.handleSearch}
					handleMobileSearch={this.handleMobileSearch}
					handleCategory={this.handleCategory}
					categoryTerm={this.state.category}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
				/>
				<div className="filter-palace products-wrapper">

					<Filter handleChangeShow={this.changeShow.bind(this)} categoryList={this.state.category} show={this.state.show} />
					<Range handleChangeRange={this.changeRange.bind(this)} max={this.state.max} min={this.state.min} />
				</div>

				<Products
					min={this.state.min}
					max={this.state.max}
					show={this.state.show}
					productsList={this.state.products}
					searchTerm={this.state.term}
					addToCart={this.handleAddToCart}
					productQuantity={this.state.quantity}
					updateQuantity={this.updateQuantity}
					openModal={this.openModal}
				/>
				<Footer />
				<QuickView product={this.state.quickViewProduct} openModal={this.state.modalActive} closeModal={this.closeModal} />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
