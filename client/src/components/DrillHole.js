import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDrillHole } from '../actions';

class DrillHole extends Component {
	componentDidMount() {
		this.props.fetchDrillHole(this.props.match.params.id);
	}

	renderData() {
		if(this.props.drillholes) {
			var i = 0;
			return this.props.drillholes.map(drillhole => {
				var prev = 0;
				var avg = 0
				return drillhole.data.map(data => {
					avg = data.azimuth / ( i + 1);
					if(data.azimuth - prev <= 5 || i == 0) {
						prev = data.azimuth;
						return(
							<tr key={i++}>
						      <td>{data.depth}</td>
						      <td>{data.dip}</td>
						      <td>{data.azimuth}</td>
						      <td>Y</td>
						    </tr>
						);
					} else {
						return(
							<tr key={i++}>
						      <td>{data.depth}</td>
						      <td>{data.dip}</td>
						      <td>{data.azimuth}</td>
						      <td>N</td>
						    </tr>
						);
					}
				});
			})
		}
	}

	render() {
		return(
			<div>
				<div className="table-title">
					<h1>Showing drilling data.</h1>
				</div>
				<table className="table table-striped">
				  <thead className="thead-dark">
				    <tr>
				      <th scope="col">Depth</th>
				      <th scope="col">Dip</th>
				      <th scope="col">Azimuth</th>
				      <th scope="col">Reliable?</th>
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