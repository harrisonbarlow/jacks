import React, { Component } from 'react';

class Spinner extends Component {

	render() {
		return(
			<tr>
				<td colSpan="6">
					<div className="lds-dual-ring"></div>
				</td>
			</tr>
		);
	}
}

export default Spinner;