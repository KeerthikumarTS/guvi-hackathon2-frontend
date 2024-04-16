import React, { useEffect, useState , useContext } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Table from 'react-bootstrap/Table';
import { ProductContext } from '../context/Context';
import axios from 'axios';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,

} from 'chart.js';



ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,

);


const Doughnutchart = () => {

  const [user, setUser] = useState();
  const {url , products} = useContext(ProductContext);
  const totalProducts = products && products.length;
  const totalUser = user && user.length;



  // furniture product count
  function FurnitureCount() {
    let count = 0;
    products && products.map(i => i.type === 'furniture' ? count++ : '')
    return count
  }

  // gardening product count
  function GardeningCount() {
    let count = 0;
    products && products.map(i => i.type === 'gardening' ? count++ : '')
    return count
  }

  // electronics product count
  function ElectronicsCount() {

    let count = 0;
    products && products.map(i => i.type === 'electronics' ? count++ : '')
    return count
  }

  // media product count
  function MediaCount() {
    let count = 0;
    products && products.map(i => i.type === 'media' ? count++ : '')
    return count
  }

  const furniture_percentage = Math.round((FurnitureCount() / totalProducts) * 100);
  const gardening_percentage = Math.round((GardeningCount() / totalProducts) * 100);
  const electronic_percentage = Math.round((ElectronicsCount() / totalProducts) * 100);
  const media_percentage = Math.round((MediaCount() / totalProducts) * 100);




  const chartData = {
    labels: ["Electronics", "Furniture", "Gardening", "Media"],
    data: [electronic_percentage, furniture_percentage, gardening_percentage, media_percentage]
  };


  const data = {
    labels: chartData.labels,
    datasets: [{
      label: 'product %',
      data: chartData.data,
      backgroundColor: ['blue', 'red', 'green', 'brown'],
      borderColor: ['black', 'black', 'black', 'black']
    }]
  }


  const options = {

    hoverBorderWidth: 5,
    plugins: {
      legend: {
        display: true
      }
    }

  }

  useEffect(() => {

    axios.get(`${url}/users`).then(res => setUser(res.data.user))

  }, [])




  return (
    <div>
      <h2 className='m-2'>PRODUCTS DETAIL</h2>
      <div style={{display:'flex', flexDirection:'row', margin:'80px 0'}}>
      <div className='chart-container' >
        <Doughnut data={data} options={options} > </Doughnut>
      </div>
        <div className='chart-detail mt-3'>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Products</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Electronics</td>
          <td style={{ color: "blue" }}>{ElectronicsCount()}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Furniture</td>
          <td style={{ color: "red" }}>{FurnitureCount()}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Gardening</td>
          <td style={{ color: "green" }}>{GardeningCount()}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Media</td>
          <td style={{ color: "brown" }}>{MediaCount()}</td>
        </tr>
      </tbody>
    </Table>
        </div>
      </div>

      <h5 style={{ margin: "5px" }}>Total Number of Users : <span style={{ color: "red" }}> {totalUser} </span> </h5>

    </div>

  )
}



export default Doughnutchart