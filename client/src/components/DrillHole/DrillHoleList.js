import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDrillHoles, viewDrillHole } from '../../actions';
import Spinner from '../Spinner';
import PageTitle from '../PageTitle';

class DrillHoleList extends Component {
	constructor(props) {
		super(props);
		this.viewDrillHole = this.viewDrillHole.bind(this);
	}
	
	componentDidMount() {
		this.props.fetchDrillHoles();
	}

	viewDrillHole(id) {
		this.props.viewDrillHole(id);
	}

	renderDrillHoles() {
		if(!this.props.drillholes.length) {
			return(
				<tr>
					<td colSpan="6">
						<Spinner />
					</td>
				</tr>
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
						<Link to={`/drillholes/${drillhole.id}`} className="btn btn-link" onClick={() => { this.viewDrillHole(drillhole.id)}}>
						View
						</Link>
					</td>
				</tr>
			);
		});
	}

	render() {
		const title = "Select a drill hole from the list below.";
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

export default connect(mapStateToProps, { fetchDrillHoles, viewDrillHole })(DrillHoleList);