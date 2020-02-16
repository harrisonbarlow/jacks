import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDrillHole } from '../actions';
//import { Link } from 'react-router-dom';
import DrillHoleRow from './DrillHoleRow';
import Spinner from './Spinner';
import PageTitle from './PageTitle';
const AZIMUTH_TOLERANCE = 5;
const DIP_TOLERANCE = 3;

class DrillHole extends Component {
	constructor(props) {
		super(props);
		this.average = 0;
	}

	componentDidMount() {
		this.props.fetchDrillHole(this.props.match.params.id);
	}

	reliableAzimith(current, previous) {
		return ((current - previous) <= AZIMUTH_TOLERANCE) ? true : false;
	}

	reliableDip(current) {
		return (Math.abs((current - this.average)) <= DIP_TOLERANCE) ? true : false;
	}

	averageOfPrevious(data, index) {
		var sum = 0;
		for(var i = index - 5; i < index; i++) {
			sum += data[i].dip;
		}
		return sum / 5;
	}

	renderPosition() {
		return this.props.drillholes.map(drillhole => {
			return (
				<div className="drillhole-info" key={drillhole.latitude}>
					<ul className="list-group">
					  <li className="list-group-item">
					  	<strong>Latitude:</strong> {drillhole.latitude}
					  </li>
					  <li className="list-group-item">
					  	<strong>Longitude:</strong> {drillhole.longitude}
					  </li>
					  <li className="list-group-item">
					  	<a href={`https://www.google.com/maps/?q=${drillhole.latitude},${drillhole.longitude}`} className="btn btn-link">
							Open In Google Maps
	    				</a>
					  </li>
					</ul>
				</div>
			);
		});
	}

	renderData() {
		if(!this.props.drillholes.length) {
			return(
				<Spinner />
			);
		}
		return this.props.drillholes.map(drillhole => {
			return drillhole.data.map((data, index) => {
				var prev = 0;
				if(index >= 5) {
					this.average = this.averageOfPrevious(drillhole.data, index);
				}
				if((index < 5) || this.reliableAzimith(data.azimuth, prev) || this.reliableDip(data.dip)) {
					prev = data.azimuth;
					return(
					    <DrillHoleRow index={index} depth={data.depth} dip={data.dip} azimuth={data.azimuth} reliable={true} />
					);
				} else {
					prev = data.azimuth;
					return(
						<DrillHoleRow index={index} depth={data.depth} dip={data.dip} azimuth={data.azimuth} reliable={false} />
					);
				}
			});
		});
	}

	render() {
		const title = "Showing drilling data.";
		console.log(this.props);
		return(
			<div>
				<PageTitle title={title} />
				{this.renderPosition()}
				<table className="table table-striped">
				  <thead className="thead-dark">
				    <tr>
				      <th scope="col">Depth</th>
				      <th scope="col">Dip</th>
				      <th scope="col">Azimuth</th>
				      <th scope="col">Reliable?</th>
				      <th scope="col">Over Ride</th>
				    </tr>
				  </thead>
				  <tbody>
				  	{this.renderData()}
				  </tbody>
				</table>
			</div>
		);
	}
}
function mapStateToProps({drillholes}) {
	return { drillholes };
}

export default connect(mapStateToProps, { fetchDrillHole })(DrillHole);