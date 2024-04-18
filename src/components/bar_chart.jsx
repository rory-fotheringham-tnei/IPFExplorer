import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';




export default function Display({ data, options, imageSrc }) {



    return (
        <div className='row'>
            <div className='col-7'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card border shadow-sm  " style={{ position: 'relative', width: "80vw", height: '90vh' }}>
                        <div className='card-header'><h4>Cost Graph</h4></div>
                        <div className='card-body'>
                            <Bar options={options} data={data} />
                        </div>
                    </div>
                </div >
            </div>

            <div className='col-5'>

                <div className='card outline shadow-sm'>
                    <div className='card-header'><h4>Single Line Diagram</h4></div>

                    <div className='card-body'>

                        {imageSrc !== 'no image' ? (
                            <img className='img-fluid' src={require('../' + imageSrc)}></img>
                        ) :
                            (
                                <p>{imageSrc}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};