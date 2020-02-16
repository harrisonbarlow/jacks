import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDrillHoles } from '../actions';
import Spinner from './Spinner';
import PageTitle from './PageTitle';

class DrillHoleList extends Component {
	componentDidMount() {
		this.props.fetchDrillHoles();
	}

	renderDrillHoles() {
		if(!this.props.drillholes.length) {
			return(
				<Spinner />
			);
		}
		return this.props.drillholes.map(drillhole => {
			return(
				<tr key={drillhole.id}>
			      <td>{drillhole.id}</td>
			      <td>{drillhole.latitude}°</td>
			      <td>{drillhole.longitude}°</td>
			      <td>{drillhole.dip}°</td>
			      <td>{drillhole.azimuth}°</td>
			      <td>
			      	<Link to={`/drillholes/${drillhole.id}`} className="btn btn-link">
						View
    				</Link>
			      </td>
			    </tr>
			);
		});
	}

	render() {
		const title = "Select a collar from the list below.";
		return(
			<div className="table-drillhole">
				<PageTitle title={title} />
				<div className="table-responsive">
					<table className="table table-striped">
					  <thead className="thead-dark">
					    <tr>
					      <th scope="col">Collar</th>
					      <th scope="col">Latitude</th>
					      <th scope="col">Longitude</th>
					      <th scope="col">Dip</th>
					      <th scope="col">Azimuth</th>
					      <th scope="col"></th>
					    </tr>
					  </thead>
					  <tbody>
					    {this.renderDrillHoles()}
					  </tbody>
					</table>
				</div>
			</div>
		);
	}
}
function mapStateToProps({drillholes}) {
	return { drillholes };
}

export default connect(mapStateToProps, { fetchDrillHoles })(DrillHoleList);