import './App.css';
import InputCard from './components/input_components';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import Display from './components/bar_chart';
import { useState, useEffect } from 'react';
import dataOut from './data/data_out.json';
import keysOut from './data/key_out.json'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

import ipf_map from './ipf-map.png'


Chart.defaults.font.size = 18;

function toUniqueQuery(query) {
  let qlist = [];
  for (let key in query) {
    qlist.push(query[key]);
  };
  qlist = qlist.sort();
  let qstring = JSON.stringify(qlist);
  return qstring;
};

// read data into json format
const dataMap = new Map();
for (let i = 0; i < dataOut.length; i++) {
  dataMap.set(toUniqueQuery(keysOut[i]), dataOut[i]);
}

const pictureMap = new Map();
const pictureMapList = [
  [{ array: '132kV array', combo: 'HVDC', plat: '1 plat', fiftyormid: '50:50' }, '132V-1 PLAT-HVDC.png'],
  [{ array: '66kV array', combo: 'HVDC', plat: '1 plat', fiftyormid: '50:50' }, '66kV-1 PLAT-HVDC.png'],
  [{ array: '132kV array', combo: '4x220kV', plat: '1 plat', fiftyormid: '50:50' }, '132kV-1 PLAT-220kV-5050.png'],
  [{ array: '132kV array', combo: '4x275kV', plat: '1 plat', fiftyormid: '50:50' }, '132kV-1 PLAT-275kV-5050.png'],
  [{ array: '132kV array', combo: '3x275kV', plat: '1 plat', fiftyormid: 'Mid' }, '132kV-1 PLAT-275kV-5050.png'],
  [{ array: '66kV array', combo: '4x220kV', plat: '1 plat', fiftyormid: '50:50' }, '66kV-1 PLAT-220kV or 275kV-5050.png'],
  [{ array: '132kV array', combo: '4x220kV', plat: '2 plat', fiftyormid: '50:50' }, '132kV-2 PLAT-220kV-5050.png'],
  [{ array: '66kV array', combo: '4x275kV', plat: '1 plat', fiftyormid: '50:50' }, '66kV-1 PLAT-220kV or 275kV-5050.png'],
  [{ array: '66kV array', combo: '4x220kV', plat: '2 plat', fiftyormid: '50:50' }, '66kV-2 PLAT-220kV or 275kV-5050.png'],
  [{ array: '132kV array', combo: '4x275kV', plat: '2 plat', fiftyormid: '50:50' }, '66kV-2 PLAT-220kV or 275kV-5050.png'],
  [{ array: '66kV array', combo: '4x275kV', plat: '2 plat', fiftyormid: '50:50' }, '66kV-2 PLAT-220kV or 275kV-5050.png'],
  [{ array: '66kV array', combo: '4x220kV', plat: '4 plat', fiftyormid: '50:50' }, '66kV-4 PLAT-220kV or 275kV-5050.png'],
  [{ array: '132kV array', combo: '3x275kV', plat: '3 plat', fiftyormid: 'Mid' }, '132kV-3 PLAT-275kV-5050.png'],
  [{ array: '66kV array', combo: '4x275kV', plat: '4 plat', fiftyormid: '50:50' }, '66kV-4 PLAT-220kV or 275kV-5050.png'],
  [{ array: '132kV array', combo: '4x220kV', plat: '1 plat', fiftyormid: 'Mid' }, '132kV-1 PLAT-220kV-5050.png'],
  [{ array: '132kV array', combo: '4x220kV', plat: '2 plat', fiftyormid: 'Mid' }, '132kV-2 PLAT-220kV-5050.png'],
  [{ array: '132kV array', combo: '4x275kV', plat: '1 plat', fiftyormid: 'Mid' }, '132kV-1 PLAT-275kV-5050.png']
]
for (let i = 0; i < pictureMapList.length; i++) {
  pictureMap.set(toUniqueQuery(pictureMapList[i][0]), pictureMapList[i][1])
}
// is is the data for the best possible options
const bestQuery = {
  array: '132kV array',
  combo: 'HVDC',
  plat: '1 plat',
  fiftyormid: '50:50'
}
const bestOptions = dataMap.get(toUniqueQuery(bestQuery))

const gbp2usd = 1.25



function IntroModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show the modal when the component mounts
    setShow(true);
  }, []); // Empty dependency array ensures this effect runs only once

  const handleClose = () => setShow(false);

  return (
    <>
      <Button className='my-2' variant="outline-primary btn-lg" onClick={() => setShow(true)}>
        Introduction
      </Button>

      <Modal size='lg' show={show} onHide={handleClose}>
        <ModalHeader><h4>Your Task</h4></ModalHeader>
        <ModalBody><h5>Background</h5>
          <p>Design 1500 MW array.  Location is approximately 50km off the coast of England.</p>
          <img className='img-fluid mb-3' src={require('./ipf-map.png')}></img>

          <h5>Goal</h5>
          <p>Find least cost option considering CapEx, Losses, and Availability considering the following:</p>
          <ul>
            <li>Array voltage – 66kV vs 132kV</li>
            <li>Number of Platforms – 1, 2, 3, 4</li>
            <li>Export Voltage – 220kV, 275kV, 400kV (HVDC)</li>
            <li>Reactive Power Compensation (HVAC only): 50:50 or Mid-Point (MP)</li>
          </ul>
          <h5>Equipment</h5>
          <ul>
            <li>20 MW WTGs</li>
            <li>2000mm Cable [HVAC]: 460MVA (@220kV), 568MVA (@275kV)</li>
          </ul>


        </ModalBody>
        <ModalFooter><Button variant='secondary' onClick={handleClose}>Close</Button></ModalFooter>
      </Modal>
    </>
  );
}

function Controller() {

  const options = {

    scales: {
      x: {
        stacked: true
      },
      y: {
        title: {
          display: true,
          text: 'Cost (Million $)'
        },
        min: 0,
        max: gbp2usd * 1600,
        ticks: { stepSize: 200 }

      }
    },
    maintainAspectRatio: false
  };


  const dummyData = {
    labels: ['empty'],
    datasets: [
      {
        label: 'empty',
        stack: 'stack1',
        data: [2]
      }
    ]
  };
  const [data, setData] = useState(dummyData);
  const [sld, setSld] = useState('no image')

  const colorPalette = [
    '#A9DFFA',// Extra Light Blue
    '#6ECFF6', // Light Blue
    '#3B8DBD', // Medium Blue
    '#1E3A5F', // Dark Blue
    '#3366ff',



    '#9EDB8E', // Light Green
    '#5E9C4F', // Medium Green
    '#2F4E25', // Dark Green
    '#C4E6B3', // Extra Light Green
    '	#66ff66',
    '#00ff99',

    '#ff99dd', // Extra Light Purple
    '#B98CC6', // Light Purple
    '#7B4B9E', // Medium Purple
    '#b300b3',
    '#3E1F4F' // Dark Purple

    // Extra Dark Purple
  ];


  function toDatasets(data) {
    // we expect data to be in the form:
    // {'capex': {...}, 'losses': {...}, 'avail': {...}}
    // we want to parse it as a chart.js datasets object
    var datasets = []
    var stack = '1'
    let index = 0
    for (let category in data) {
      for (let point in data[category]) {
        let set = {
          label: point,
          stack: stack,
          data: [(gbp2usd * data[category][point]), (gbp2usd * bestOptions[category][point])],
          backgroundColor: colorPalette[index]
        };
        index++;
        datasets.push(set);
      };
    };
    return datasets;
  };

  function queryToString(pretext, query) {
    var str = pretext
    for (let q in query) {
      str = str.concat(query[q], ', ');
    }
    str = str.slice(0, -2);
    return str
  }


  function updateData(query) {
    // update the actual data being passed down to the bar chart
    var selectedData = dataMap.get(toUniqueQuery(query));
    var datasets = toDatasets(selectedData);
    var dataObject = {
      labels: [queryToString('Your Selection: ', query),
      queryToString('Best Selection: ', bestQuery)],
      datasets: datasets
    };

    // update the query being passed to the SLD image card
    var imageSrc = pictureMap.get(toUniqueQuery(query))
    console.log(imageSrc)
    console.log(pictureMap)
    // set these two quantities
    setSld(imageSrc)
    setData(dataObject);
  };

  return (
    <>
      <InputCard updateData={updateData} />

      <Display data={data} options={options} imageSrc={sld} />


    </>
  );
};



function App() {
  return (
    <div className="App">
      <h1 className=''>TNEI IPF Explorer</h1>
      <IntroModal />
      {/* <img className='mt-2' src={logo} style={{ height: '100px', width: 'auto' }}></img> */}




      <Controller />

    </div >
  );
}
export default App;