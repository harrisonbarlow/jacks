import React, { Component } from 'react';

class DrillHoleRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      isReliable: this.props.reliable
	    };
	    this.toggleReliable = this.toggleReliable.bind(this);
	}

	toggleReliable() {
    	this.setState(state => ({ isReliable: !state.isReliable }));
	}

	render() {
		return(
			<tr key={this.props.index}>
		      <td>{this.props.depth}</td>
		      <td>{this.props.dip}</td>
		      <td>{this.props.azimuth}</td>
		      {this.state.isReliable ? <td className="table-success">Y</td> : <td className="table-danger">N</td>}
			  <td>
			  	<button className="btn btn-primary" onClick={this.toggleReliable} role="button">Override</button>
			  </td>
		    </tr>
		);
	}
}

export default DrillHoleRow;