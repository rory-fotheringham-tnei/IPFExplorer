import './App.css';
import InputCard from './components/input_components';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import Display from './components/bar_chart';
import { useState } from 'react';
import dataOut from './data/data_out.json';
import keysOut from './data/key_out.json'
import logo from './TNEI_logo.png'

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
// is is the data for the best possible options
const bestQuery = {
  array: '132kV array',
  combo: 'HVDC',
  plat: '1 plat',
  fiftyormid: '50:50'
}
const bestOptions = dataMap.get(toUniqueQuery(bestQuery))



function Controller() {

  const options = {

    scales: {
      x: {
        stacked: true
      },
      y: {
        min: 0,
        max: 1600,
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
          data: [data[category][point], bestOptions[category][point]],
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
    var selectedData = dataMap.get(toUniqueQuery(query));
    var datasets = toDatasets(selectedData);
    var dataObject = {
      labels: [queryToString('Your Selection: ', query),
      queryToString('Best Selection: ', bestQuery)],
      datasets: datasets
    };
    setData(dataObject);
  };

  return (
    <>
      <InputCard updateData={updateData} />
      <Display data={data} options={options} />
    </>
  );
};




function App() {
  return (
    <div className="App">
      <div className='row'>
        {/* <img className='mt-2' src={logo} style={{ height: '100px', width: 'auto' }}></img> */}
        <h1 className='my-3'>TNEI IPF Explorer</h1>
      </div>
      <Controller />

    </div >
  );
}
export default App;