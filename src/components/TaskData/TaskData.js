import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { addTask, deleteTask, getTasks, updateTask } from '../../utils/api';
import moment from 'moment'
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { Modal, Button, Input, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom'



const TaskData = ({ filteredList, setTaskName, onChangeValue, checkPriority, swapElements, moveDown, getTaskData }) => {
    return (
        <>
            {filteredList && filteredList.map((val, i) => (
                <TableRow
                    key={val.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        <EditText defaultValue={val.task} onChange={(e) => setTaskName(e.target.value)} onSave={(e) => updateTask(val._id, e.value)} />
                    </TableCell>
                    <TableCell align="right">
                        <input type={"checkbox"} checked={val.status} onChange={() => onChangeValue(val._id)} />
                    </TableCell>
                    <TableCell align="right">{checkPriority(val.priority)}</TableCell>
                    <TableCell align="right">{moment(val.date).format('ll')}</TableCell>
                    <TableCell align="right">{val.modified_date ? moment(val.modified_date).format('LLL') : '-'}</TableCell>
                    <TableCell align="right">
                        <UpOutlined onClick={() => i - 1 >= 0 && swapElements(i, i - 1)} style={{ marginRight: 20 }} />
                        <DownOutlined onClick={() => { i + 1 >= filteredList.length ? moveDown() : swapElements(i, i + 1); console.log(i + 1) }} />
                    </TableCell>
                    <TableCell align="right">
                        <DeleteOutlined onClick={() => { deleteTask(val._id); getTaskData() }} style={{ color: 'red' }} />
                    </TableCell>
                    <TableCell align="right">{val.due_date ? moment(val.due_date).format('LLL') : '-'}</TableCell>

                </TableRow>
            ))}        
        </>

    )
}

export default TaskData