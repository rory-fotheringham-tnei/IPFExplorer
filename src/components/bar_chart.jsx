import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';




export default function Display({ data, options, imageSrc }) {

    const bestImg = '132V-1 PLAT-HVDC.png'

    return (
        <div style={{ height: '100vh' }}>
            <div className='row'>
                <div className='col-7'>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="card border shadow-sm " style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                            <div className='card-header'><h4>Cost Graph</h4></div>
                            <div className='card-body'>
                                <Bar options={options} data={data} />
                            </div>
                        </div>
                    </div >
                </div>

                <div className='col-5'>

                    <div className='card outline shadow-sm' >
                        <div className='card-header'><h4>Single Line Diagram - Your Selection</h4></div>

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
                    <div className='card outline shadow-sm mt-3'>
                        <div className='card-header'><h4>Single Line Diagram - Most Cost Effective</h4></div>

                        <div className='card-body'>

                            {imageSrc !== 'no image' ? (
                                <img className='img-fluid' src={require('../' + bestImg)}></img>
                            ) :
                                (
                                    <p>{imageSrc}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};