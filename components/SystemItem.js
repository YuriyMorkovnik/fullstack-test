import Head from 'next/head';
import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ShowChart from '@material-ui/icons/ShowChart';
import Typography from '@material-ui/core/Typography';

import { systemType } from '../utils/propTypes';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    justifyContent: 'space-between'
  },
  listItemBody: {
    flexDirection: 'column'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


function SystemItemBody ({ name, type, site, status, children, handleClick }) {
	const classes = useStyles();
	return (
		<ListItem className={classes.listItem} button>
		<div className={classes.listItemBody}>
			<Typography variant="h5" component="div">
				{name}
			</Typography>
			<ListItemText primary={`Type: ${type}`} />
			<ListItemText primary={`Site: ${site}`} />
			<ListItemText primary={`Status: ${status}`} />
			<IconButton onClick={handleClick}>
				<ShowChart/>
			</IconButton>
		</div>
		{children}
	</ListItem>
	)
}


function SystemItem({ item, handleClickChartButton }) {  
  const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);

  const handleOpenChildren = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const ExpandIcon = useMemo(() => isOpen ? ExpandLess : ExpandMore, [isOpen]);

	return (
		<div>
			<SystemItemBody
				handleClick={handleClickChartButton(item.type.name)}
				name={item.name}
				type={item.type.name}
				site={item.site.name}
				status={item.activityStatus.name}
			>
				{item.children && <ExpandIcon onClick={handleOpenChildren} />}
			</SystemItemBody>
			{item.children && (
				<Collapse in={isOpen} timeout="auto" unmountOnExit>
					<List disablePadding>
						{item.children.map(child => (
							<div className={classes.nested} key={child.id}>
								<SystemItemBody
									handleClick={handleClickChartButton(child.type.name)}
									name={child.name}
									type={child.type.name}
									site={child.site.name}
									status={child.activityStatus.name}
								/>
							</div>
						))}
					</List>
				</Collapse>
			)}
		</div>
	)
}

SystemItem.propTypes = {
	item: systemType.isRequired,
	handleClickChartButton: PropTypes.func.isRequired
}

export default SystemItem;
