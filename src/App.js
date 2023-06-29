import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Pagination';


function App() {
  const [employeeData, setEmployeeData] = useState([]);
const employee = () => {
  fetch("https://hub.dummyapis.com/employee")
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
