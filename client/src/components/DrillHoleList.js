import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDrillHoles } from '../actions';

class DrillHoleList extends Component {
	componentDidMount() {
		this.props.fetchDrillHoles();
	}

	renderDrillHoles() {
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
		return(
			<div>
				<div className="table-title">
					<h1>Select a collar from the list below.</h1>
				</div>
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
		);
	}
}
function mapStateToProps({drillholes}) {
	return { drillholes };
}

export default connect(mapStateToProps, { fetchDrillHoles })(DrillHoleList);