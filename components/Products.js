import React, { Component } from 'react';
import Product from './Product';
import LoadingProducts from '../loaders/Products';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Products extends Component {
	render() {
		let productsData;
		let term = this.props.searchTerm;
		let category = this.props.show;
		let x;
		let maxPrice = this.props.max;
		let minPrice = this.props.min;
		console.log(maxPrice)
		// 	let sortarray = this.props.productsList;
		// 	var compare_price_low = function(a,b) {
		//   if (a.price < b.price)
		//     return -1;
		//   if (a.price > b.price)
		//     return 1;
		//   return 0;
		// }
		// 	sortarray.sort(compare_price_low);


		// function searchingFor(term) {
		// 	return function (x) {
		// 		return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
		// 	}
		// }
		// productsData = this.props.productsList.filter(searchingFor(term)).map(product => {
		// 	if (product.category === category || category === "showall") {
		// 		if (product.price >= minPrice && product.price <= maxPrice) {

		// 			return (
		// 				<Product category={product.category} key={product.id} price={product.price} name={product.name} image={product.image} id={product.id} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} openModal={this.props.openModal} />
		// 			)
		// 		}
		// 	}

		// }
		// );

		productsData = this.props.productsList.map(product => {
			return <Product category={product.cateId} key={product.id} price={product.price} name={product.name} image={product.imageUrl} id={product.productId} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} openModal={this.props.openModal} />

		})

		// Empty and Loading States
		let view;
		if (productsData.length <= 0 && !term) {
			view = <LoadingProducts />
		} else if (productsData.length <= 0 && term) {
			view = <NoResults />
		} else {
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				component="div"
				className="products">
				{productsData}
			</CSSTransitionGroup>
		}
		return (
			<div className="products-wrapper">
				{view}
			</div>
		)
	}
}

export default Products;
