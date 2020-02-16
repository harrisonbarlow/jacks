import React, { Component } from 'react';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<div className="table-title">
					<h1>{this.props.title}</h1>
				</div>
			</div>
		);
	}
}

export default Home;