import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

function App(props) {
  //console.log(props);

  // Modal open state
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskList, setTaskList] = useState([]);


  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal1(false);
  }

  useEffect(() => {
    let arr = localStorage.getItem("taskList")
   
    if(arr){
        let obj = JSON.parse(arr)
        setTaskList(obj)
    }
  }, [])


  const deleteTask = () => {
    let val = document.querySelector('input[name="rate"]:checked').value;
    let arr = localStorage.getItem("taskList")
    if(arr){
        let obj = JSON.parse(arr);
        for (let i = 0; i < obj.length; i++){
          if (val === obj[i]["Name"]){
            obj.splice(i, 1);
          }
        }
        let tempList = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }
  }

  const handleSave = () => {
    let taskObj = {};
    taskObj["Name"] = taskName;
    saveTask(taskObj);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name === "taskName"){
      setTaskName(value);
    }

  }
  
  // Toggle for Modal
  const toggle1 = () => setModal1(!modal1);
  const toggle2 = () => setModal2(!modal2);

  return (
    <div className='App'>

      <div className='header text-center'>
        <h1>ToDomatic</h1>
        <Button color="primary" onClick={toggle1}>Create a new task</Button>
          <Modal isOpen={modal1}
              toggle={toggle1}>
              <ModalBody>
                  <form> 
                    <div className='form-group'>
                      <label>Task Name</label>
                      <input type="text" className='form-control' value={taskName} onChange={handleChange} name="taskName"/>
                    </div>
                  </form>
              </ModalBody>
              <ModalFooter>
                <Button className='btnn' color="primary" onClick={handleSave}>Add to list </Button>
            </ModalFooter>
          </Modal>
        <Button className='bn' onClick={toggle2}>Delete a task</Button>
        <Modal isOpen={modal2}
              toggle={toggle2}>
              <ModalBody>
                  <form> 
                    <div className='form-group'>
                      <h4>Current Tasks</h4>
                      {taskList && taskList.map( (obj) => {
                        return (
                          <div class="form-check">
                          <input class="form-check-input" type="radio" name='rate' value={obj.Name} id={obj.Name} />
                          <label>
                            {obj.Name}
                          </label>
                        </div>
                        )})}
                    </div>
                  </form>
              </ModalBody>
              <ModalFooter>
                <Button className="btnn" color="primary" onClick={deleteTask}>Delete task </Button>
            </ModalFooter>
          </Modal>
      </div>

      <div className='text-center'>
        {taskList && taskList.map((obj) => <li className='list list-group-item'>{obj.Name}</li> )}
      </div>

    </div>
  );
}

export default App;
