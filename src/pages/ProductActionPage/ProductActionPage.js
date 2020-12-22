import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {actAddProductRequest,actGetProductRequest,actUpdateProductRequest} from './../../actions/index';
import {connect} from 'react-redux';

class ProductActionPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        id:'',
        txtName: '',
        txtPrice: '',
        chkbStatus: false
      };
    }

    componentDidMount() {
      var {match} = this.props;

      if(match) {
        this.props.onEditProduct(match.params.id);
        
      }
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps && nextProps.itemEditing) {
        var {itemEditing} = nextProps;
        this.setState({
          id: itemEditing.id,
          txtName: itemEditing.name,
          txtPrice: itemEditing.price,
          chkbStatus: itemEditing.status
        });
      }
    }

    onHandleChange = (e) => {
      var target = e.target;
      var name = target.name;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      
      this.setState({
        [name]: value
      })
    };

    onHandleSubmit = e => {
      e.preventDefault();
      var {id, txtName, txtPrice, chkbStatus} = this.state;
      var {history} = this.props;

      if(id) {
        this.props.onUpdateProduct({
          id:id,
          name: txtName,
          price: txtPrice,
          status: chkbStatus === 'true' ? true : false || chkbStatus === true ? true : false
        });
      } else {
        this.props.onAddProduct({
          name: txtName,
          price: txtPrice,
          status: chkbStatus === 'true' ? true : false || chkbStatus === true ? true : false
        });
      }
      history.goBack();

    }

    render() {
        var {txtName, txtPrice, chkbStatus} = this.state;
        return (
          <div>            
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">                
                <form onSubmit={this.onHandleSubmit}>               
                  <div className="form-group">
                    <label>Tên sản phẩm:</label>
                    <input type="text" className="form-control" name="txtName" value={txtName} onChange={this.onHandleChange} />
                  </div>
                  <div className="form-group">
                    <label>Giá:</label>
                    <input type="text" className="form-control" name="txtPrice" value={txtPrice} onChange={this.onHandleChange} />
                  </div>
                  <div className="form-group">
                    <label>Trạng thái:</label>
                  </div>                  
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="chkbStatus" value={chkbStatus} checked={chkbStatus} onChange={this.onHandleChange} />
                      Còn hàng
                    </label>
                  </div>
                  <Link to="/product-list" className="btn btn-danger mr-10">
                    Trở lại
                  </Link>                                    
                  <button type="submit" className="btn btn-primary">Lưu lại</button>
                </form>
                
              </div>
            </div>            
          </div>         
        );
    }

}

const mapStateToProps = (state) => ({
  itemEditing : state.itemEditing
});

const mapDispatchToProps = (dispatch,props) => ({
  onAddProduct: (product) => dispatch(actAddProductRequest(product)),
  onEditProduct: (id) => dispatch(actGetProductRequest(id)),
  onUpdateProduct: (product) => dispatch(actUpdateProductRequest(product))
});

export default connect(mapStateToProps,mapDispatchToProps)(ProductActionPage);