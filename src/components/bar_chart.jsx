import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';




export default function Display({ data, options }) {



    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card border shadow-sm  " style={{ position: 'relative', width: "80vw", height: '90vh' }}>
                <div className='card-body'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div >
    );
};