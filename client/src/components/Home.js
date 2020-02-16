import React, { Component } from 'react';
import PageTitle from './PageTitle';

class Home extends Component {
	render() {
		const title = "Test site to view drilling data";
		return(
			<PageTitle title={title} />
		);
	}
}

export default Home;