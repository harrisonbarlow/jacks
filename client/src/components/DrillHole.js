import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDrillHole, viewDrillHole } from '../actions';
import DrillHoleRow from './DrillHoleRow';
import DrillHoleInfo from './DrillHoleInfo';
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

	reliableAzimuth(current, previous) {
		return ((current - previous) <= AZIMUTH_TOLERANCE) ? true : false;
	}

	reliableDip(current) {
		return (Math.abs((current - this.average)) <= DIP_TOLERANCE) ? true : false;
	}

	averageOfPrevious(data, index) {
		if(index < 5) return data[index].dip;
		var sum = 0;
		for(var i = index - 5; i < index; i++) {
			sum += data[i].dip;
		}
		return sum / 5;
	}

	renderPosition() {
		return this.props.drillholes.map(drillhole => {
			return (
				<DrillHoleInfo latitude={drillhole.latitude} longitude={drillhole.longitude} />
			);
		});
	}

	renderData() {
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
			var prev = drillhole.data[0].azimuth;
			return drillhole.data.map((data, index) => {
				this.average = this.averageOfPrevious(drillhole.data, index);
				if(this.reliableAzimuth(data.azimuth, prev) && this.reliableDip(data.dip)) {
					prev = data.azimuth;
					return(
					    <DrillHoleRow key={index} depth={data.depth} dip={data.dip} azimuth={data.azimuth} reliable={true} />
					);
				} else {
					prev = data.azimuth;
					return(
						<DrillHoleRow key={index} depth={data.depth} dip={data.dip} azimuth={data.azimuth} reliable={false} />
					);
				}
			});
		});
	}

	render() {
		const title = "Displaying drilling data.";
		return(
			<div>
				<PageTitle title={title} />
				{this.renderPosition()}
				<div className="table-responsive">
					<table className="table table-striped">
					  <thead className="thead-dark">
					    <tr>
					      <th scope="col">Depth</th>
					      <th scope="col">Dip</th>
					      <th scope="col">Azimuth</th>
					      <th scope="col">Reliable?</th>
					      <th scope="col">Override</th>
					    </tr>
					  </thead>
					  <tbody>
					  	{this.renderData()}
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

export default connect(mapStateToProps, { fetchDrillHole, viewDrillHole })(DrillHole);