import PropTypes from 'prop-types';


export const systemType = PropTypes.shape({
	id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.shape({
		name: PropTypes.string,
	}),
	site: PropTypes.shape({
		name: PropTypes.string,
	}),
	activityStatus: PropTypes.shape({
		name: PropTypes.string,
	}),
})