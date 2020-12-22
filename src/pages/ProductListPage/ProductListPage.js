import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {actFetchProductsRequest,actDeleteProductRequest} from './../../actions/index';

class ProductListPage extends Component {

  componentDidMount() {
    this.props.fetchAllProducts();
  };

  onDelete = (id) => {
    this.props.onDeleteProduct(id);
  };

  findIndex = (products,id) => {
    var result = -1;
    products.forEach((product,index) => {
      if(product.id === id) {
        result = index;
      }
    })
    return result;
  }

    render() {
        var {products} = this.props;
        return (
          <div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">                
                  <Link to="product/add" className="btn btn-info mb-10">Thêm sản phẩm</Link>                
                <ProductList>
                  {this.showProducts(products)}
                </ProductList>
              </div>
          </div>         
        );
    }

    showProducts = (products) => {
      var result = null;
      if(products.length > 0) {
        result = products.map((product, index) => <ProductItem key={index} product={product} index={index} onDelete={this.onDelete} />)
      }
      return result;
    }
}

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch,props) => ({
  fetchAllProducts: () => dispatch(actFetchProductsRequest()),
  onDeleteProduct: (id) => dispatch(actDeleteProductRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
