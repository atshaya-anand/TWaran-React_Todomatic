import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function App(props) {
  //console.log(props);

  // Modal open state
  const [modal, setModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [taskList, setTaskList] = useState([]);

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    setTaskList(tempList);
    setModal(false);
  }

  const handleSave = () => {
    let taskObj = {};
    taskObj["Name"] = taskName;
    taskObj["Desc"] = description;
    saveTask(taskObj);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name == "taskName"){
      setTaskName(value);
    }else{
      setDescription(value);
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

                    <div className='form-group'>
                      <label>Description</label>
                      <textarea rows="5" className='form-control' value={description} onChange={handleChange} name="description"></textarea>
                    </div>
                  </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleSave}>Add to list </Button>
            </ModalFooter>
          </Modal>
      </div>

      <div className='todolistCards'>
        {taskList.map((obj) => <li> {obj.Name} </li>)}
      </div>

    </div>
  );
}

export default App;
