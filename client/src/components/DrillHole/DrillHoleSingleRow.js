import React, { Component } from 'react';

class DrillHoleSingleRow extends Component {
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
			<tr>
		    	<td>{this.props.depth}</td>
		    	<td>{this.props.dip}</td>
		    	<td>{this.props.azimuth}</td>
		    	{this.state.isReliable ? <td className="table-success">Yes</td> : <td className="table-danger">No</td>}
				<td>
			  		<div className="btn btn-dark" onClick={this.toggleReliable} role="button">Override</div>
				</td>
		    </tr>
		);
	}
}

export default DrillHoleSingleRow;