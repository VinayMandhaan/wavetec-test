import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Home = () => {  
  const [data, setData] = useState
  ([
    {
      id:1,
      title:'Mobile',
      status:false,
      priority:1
    },
    {
      id:2,
      title:'Work',
      status:false,
      priority:3
    },
    {
      id:5,
      title:'Video',
      status:false,
      priority:2
    },
    {
      id:3,
      title:'Task',
      status:false,
      priority:3
    },
    {
      id:4,
      title:'Web',
      status:false,
      priority:1
    },
  ])
  const [filteredList, setFilteredList] = useState(data)
  const checkPriority = (val) => { 
    var priorityText
    if(val === 1){
      return priorityText = 'High'
    } else if(val === 2){
      return priorityText = 'Medium'
    } else {
      return priorityText = 'Low'
    }
  }

  const onChangeValue = (id) => {
    const newData = [...data]
    newData.map(s => {
      if(s.id === id){
        console.log(s,'HEHE')
        s.status = !s.status
      }
    })
  setFilteredList(newData)

  }

  const searchTask = (e) => {
    console.log(e.target.value)
    var value = e.target.value
    const filteredTasks = data.filter(val => val.title.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filteredTasks,'HEHEH')
    setFilteredList(filteredTasks)
  }

  const swapTopElements = (a,b) => {
    console.log(a,b,'SWAPAPP')
    console.log('SWAP CALLED')
    var tempData = [...data]
    var temp = tempData[a]
    tempData[a] = tempData[b]
    tempData[b] = temp
    setFilteredList(tempData)
  }
  return (
    <div style={{margin:40}}>
      <input type='text' onChange={(e)=>searchTask(e)}/>
      {/* {
        filteredList.map((val, i) => (
          <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <p>{val.id}</p>
            <h2>{val.title}</h2>
            <input type={"checkbox"} checked={val.status} onChange={()=>onChangeValue(val.id)} />
            <p>{checkPriority(val.priority)}</p>
            <p onClick={()=> i-1 >= 0 && swapTopElements(i,i-1)}>Top</p>
            <p>Bottom</p>
          </div>
        ))
      } */}
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Modified Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredList.map((val) => (
            <TableRow
              key={val.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {val.title}
              </TableCell>
              <TableCell align="right">
              <input type={"checkbox"} checked={val.status} onChange={()=>onChangeValue(val.id)} />
              </TableCell>

              <TableCell align="right">{checkPriority(val.priority)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home;
