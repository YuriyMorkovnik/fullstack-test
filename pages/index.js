import { useState, useMemo } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types';


import SystemList from '../components/SystemList';
import ChartModal from '../components/ChartModal';
import { systemType } from '../utils/propTypes';


function Systems({ systems }) {
  const [systemType, setSysyemType] = useState(null)
  const handleCloseChartModal = () => {
    setSysyemType(null);
  }
  const handleClickChartButton = (type) => () => {
    setSysyemType(type)
  }
  return (
    <Container maxWidth="sm">
      <SystemList systems={systems} handleClickChartButton={handleClickChartButton}/>
      <ChartModal systemType={systemType} handleClose={handleCloseChartModal} isOpen={!!systemType}/>
    </Container>      
  )
}

Systems.propTypes = {
  systems: PropTypes.arrayOf(systemType).isRequired
}

export async function getStaticProps() {
  // imitation async request
  const { data: systems } = await Promise.resolve(require('../mockData/systems.json'));
  return {
    props: {
      systems,
    },
  }
}

export default Systems;
