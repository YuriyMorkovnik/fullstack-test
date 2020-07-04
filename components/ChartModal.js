import Head from 'next/head';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const typeToKebabCase = type => type.toLowerCase().split(' ').join('-');

const getChartDataByType = type => require(`../mockData/${typeToKebabCase(type)}.json`)

function ChartModal ({ systemType, handleClose, isOpen }) {

	const [options, setOptions] = useState({})

	useEffect(() => {
		if (!systemType) return;
		const chartData = getChartDataByType(systemType);
		setOptions({
			title: {
				text: systemType
			},
			series: chartData.series
		});
	}, [systemType])

	return (
    <Dialog  onClose={handleClose} fullWidth open={isOpen}>
      <HighchartsReact
				highcharts={Highcharts}
				options={options}
  		/>
    </Dialog>
  );
}

ChartModal.propTypes = {
	systemType: PropTypes.string,
	handleClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired
}


export default ChartModal;