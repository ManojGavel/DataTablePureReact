import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';


function App() {
  const [employeeData, setEmployeeData] = useState([]);
const employee = () => {
  fetch("https://restcountries.com/v2/all")
    .then((respone) => respone.json())
    .then((data) => setEmployeeData(data));
};
useEffect(() => {
  employee();
}, []);
  return (
    <div className="App">
     <Table data={employeeData} itemsPerPage={3}/>
    </div>
  );
}

export default App;
