import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDrillHole, viewDrillHole } from '../../actions';
import DrillHoleSingleRow from './DrillHoleSingleRow';
import DrillHoleSinglePosition from './DrillHoleSinglePosition';
import Spinner from '../Spinner';
import PageTitle from '../PageTitle';
const AZIMUTH_TOLERANCE = 5;
const DIP_TOLERANCE = 3;

class DrillHoleSingle extends Component {

	componentDidMount() {
		this.props.fetchDrillHole(this.props.match.params.id);
	}

	reliableAzimuth(current, previous) {
		return Math.abs(current - previous) <= AZIMUTH_TOLERANCE ? true : false;
	}

	reliableDip(current, average) {
		return Math.abs(current - average) <= DIP_TOLERANCE ? true : false;
	}

	//The first 5 are always reliable since we do not have enough data, so return current dip instead of calculaing average.
	calcAverageOfPrevious(data, index) {
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
				<DrillHoleSinglePosition key={drillhole.id} latitude={drillhole.latitude} longitude={drillhole.longitude} />
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
			var prevAzimuth = drillhole.data[0].azimuth; //get first azimuth value
			return drillhole.data.map((data, index) => {
				var averageDipOfPrev = this.calcAverageOfPrevious(drillhole.data, index);
				var isReliable = (this.reliableAzimuth(data.azimuth, prevAzimuth) && this.reliableDip(data.dip, averageDipOfPrev)) ? true : false;
				prevAzimuth = data.azimuth;
				return(
					<DrillHoleSingleRow key={index} depth={data.depth} dip={data.dip} azimuth={data.azimuth} reliable={isReliable} />
				);
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

export default connect(mapStateToProps, { fetchDrillHole, viewDrillHole })(DrillHoleSingle);