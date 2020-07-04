import Head from 'next/head';
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import SystemItem from './SystemItem';
import { systemType } from '../utils/propTypes';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
});

function SystemList ({ systems, handleClickChartButton }) {
	const classes = useStyles();


	return (
		<List
			component="nav"
			subheader={
				<ListSubheader component="div">
					<Typography variant="h3">
						Systems list
            </Typography>
				</ListSubheader>
			}
			className={classes.root}
		>
			{systems.map(item => (
				<SystemItem key={item.id} handleClickChartButton={handleClickChartButton} item={item} />
			))}
		</List>
	)
}

SystemList.propTypes = {
	systems: PropTypes.arrayOf(systemType).isRequired,
	handleClickChartButton: PropTypes.func.isRequired
}

export default SystemList;
