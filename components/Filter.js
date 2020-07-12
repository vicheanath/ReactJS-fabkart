import React, { Component } from 'react';

class Filter extends Component {
  handleChange({ target }) {
    this.props.handleChangeShow(target.value)
  }

  render() {
    return (
      <div className="filter-select">
        <select onChange={this.handleChange.bind(this)}>
          <option value="showall">All Categories</option>
          {this.props.categoryList.map(cate => {
            return <option value={cate.name}>{cate.name}</option>

          })}
        </select>
      </div>

    );
  }
}

export default Filter;
