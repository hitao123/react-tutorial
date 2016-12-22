import React, { PropTypes } from  'react'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

const  ProductsContainer = ({ products, addToCart }) => (
    <ProductsList title="Products"/>
        {products.map(product => {
            <ProductItem key={product.id} 
            product={product}
            onAddToCartClicked={() => addToCart(product.id)}/>
        })}
    <ProductsList />
)

ProductContainer.propTypes = {
    product: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired
    }).isRequired).isRequired,
    addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    products: getVisibleProducts(state.products)
})

//addToCart 相当于 mapDispatchToProps 
export default connect(
    mapStateToProps,
    { addToCart }
)(ProductContainer)

