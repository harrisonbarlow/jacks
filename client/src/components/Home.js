import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from './PageTitle';
import hero from '../images/hero.jpg';

class Home extends Component {
	render() {
		const title = "Test site to view drilling data.";
		return(
			<div className="home">
				<div className="container-home">
					<PageTitle title={title} />
					<Link to="/drillholes/" className="btn btn-light">
						View Drill Holes
					</Link>
				</div>
			</div>
		);
	}
}

export default Home;