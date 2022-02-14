import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

function App(props) {
  //console.log(props);

  // Modal open state
  const [modal, setModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskList, setTaskList] = useState([]);


  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  }

  useEffect(() => {
    let arr = localStorage.getItem("taskList")
   
    if(arr){
        let obj = JSON.parse(arr)
        setTaskList(obj)
    }

  }, [])


  const deleteTask = (name) => {
    alert(name);
    /*let tempList = taskList;
    tempList.forEach(function(){
      
    });
    localStorage.setItem("taskList", JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()*/
  }

  const handleSave = () => {
    let taskObj = {};
    taskObj["Name"] = taskName;
    saveTask(taskObj);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name == "taskName"){
      setTaskName(value);
    }

  }
  
  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div className='App'>

      <div className='header text-center'>
        <h1>ToDomatic</h1>
        <Button color="primary" onClick={toggle}>Create a new task</Button>
          <Modal isOpen={modal}
              toggle={toggle}>
              <ModalBody>
                  <form> 
                    <div className='form-group'>
                      <label>Task Name</label>
                      <input type="text" className='form-control' value={taskName} onChange={handleChange} name="taskName"/>
                    </div>
                  </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleSave}>Add to list </Button>
            </ModalFooter>
          </Modal>
        <Button className='bn'>Delete a task</Button>
      </div>

      <div className='text-center'>
        {taskList && taskList.map((obj) => <li className='list list-group-item'>{obj.Name}</li> )}
      </div>

    </div>
  );
}

export default App;
