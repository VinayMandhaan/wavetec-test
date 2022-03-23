import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {
  
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
    <div>
      <input type='text' onChange={(e)=>searchTask(e)}/>
      {
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
      }
    </div>
  )
}

export default App;
