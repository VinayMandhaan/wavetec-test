import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getTasks, updateTask } from '../../utils/api';
import moment from 'moment'
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const Home = () => {
  const [data, setData] = useState()
  const [filteredList, setFilteredList] = useState()
  const [taskName, setTaskName] = useState()
  const [searchItem, setSearchItem] = useState()

  const checkPriority = (val) => {
    var priorityText
    if (val === 1) {
      return priorityText = 'High'
    } else if (val === 2) {
      return priorityText = 'Medium'
    } else {
      return priorityText = 'Low'
    }
  }

  const onChangeValue = (id) => {
    const newData = [...data]
    newData.map(s => {
      if (s._id === id) {
        s.status = !s.status
      }
    })
    setFilteredList(newData)
    updateTaskData(id)
  }

  const searchTask = (e) => {
    var value = e.target.value
    const filteredTasks = data.filter(val => val.task.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredList(filteredTasks)
    localStorage.setItem('search', value)
  }

  const searchUserTask = () => {
    const filteredTasks = data.filter(val => val.task.toLowerCase().includes(searchItem.toLowerCase()))
    setFilteredList(filteredTasks)
  }

  const swapElements = (a, b) => {
    var tempData = [...filteredList]
    var temp = tempData[a]
    tempData[a] = tempData[b]
    tempData[b] = temp
    setFilteredList(tempData)
  }

  const getTaskData = async () => {
    const res = await getTasks()
    var searchValue = localStorage.getItem('search')
    setSearchItem(searchValue)
    if (res.tasks && searchValue) {
      console.log('SEARCH')
      var newData = res.tasks.filter(val => val.task.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredList(newData)
      setData(res.tasks)
    } else if(res.tasks) {
      localStorage.setItem('item', res.tasks)
      setFilteredList(res.tasks)
      setData(res.tasks)
    } else {
      var newArr = localStorage.getItem('item')
      setFilteredList(newArr)
      setData(newArr)
    }
  }

  const updateTaskData = async (id) => {
    const res = await updateTask(id)
    console.log(res, 'UPDATE')
  }

  const sortData = async (type) => {
    const newData = [...filteredList]
    switch (type) {
      case 'Modified':
        newData.sort(function (a, b) {
          var c = new Date(a.modified_date).getMinutes();
          var d = new Date(b.modified_date).getMinutes();
          return d - c;
        });
      case 'Task':
        newData.sort((a, b) => a.task.localeCompare(b.task))
      case 'Due':
        newData.sort(function (a, b) {
          var c = new Date(a.due_date).getSeconds();
          var d = new Date(b.due_date).getSeconds();
          return d - c
        });
      case 'Priority':
        newData.sort(function(a,b){return a.priority - b.priority})
      case 'Created':
        newData.sort(function (a, b) {
          var c = new Date(a.date).getSeconds();
          var d = new Date(b.date).getSeconds();
          return d - c
        });
    }
    console.log(newData, 'TEST')
    setFilteredList(newData)
  }

  useEffect(() => {
    getTaskData()
  }, [])

  useEffect(() => {

  },[])
  return (
    <div style={{ margin: 40 }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', margin:20}}>
        <input style={{width:'20%', padding:10, borderRadius:15}} value={searchItem} type='text' placeholder='Search' onChange={(e) => {searchTask(e); setSearchItem(e.target.value)}} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sortData('Task')}>Title</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Created Date</TableCell>
              <TableCell onClick={() => sortData('Modified')} align="right">Modified Date</TableCell>
              <TableCell align="right">Reorder</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right">Due Date</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList && filteredList.map((val, i) => (
              <TableRow
                key={val.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <EditText defaultValue={val.task} onChange={(e)=>setTaskName(e.target.value)} onSave={(e)=>updateTask(val._id,e.value)} />
                </TableCell>
                <TableCell align="right">
                  <input type={"checkbox"} checked={val.status} onChange={() => onChangeValue(val._id)} />
                </TableCell>
                <TableCell align="right">{checkPriority(val.priority)}</TableCell>
                <TableCell align="right">{moment(val.date).format('ll')}</TableCell>
                <TableCell align="right">{val.modified_date ? moment(val.modified_date).format('LLL') : '-'}</TableCell>
                <TableCell align="right">
                  <UpOutlined onClick={() => i - 1 >= 0 && swapElements(i, i - 1)} style={{ marginRight: 20 }} />
                  <DownOutlined onClick={() => { !i + 1 >= filteredList.length && swapElements(i, i + 1); console.log(data.length) }} />
                </TableCell>
                <TableCell align="right">
                  <DeleteOutlined style={{ color: 'red' }} />
                </TableCell>
                <TableCell align="right">{val.due_date ? moment(val.due_date).format('LLL') : '-'}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home;
