import './App.css';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";

function App() {

  const [isCompleteScreen, setCompleteScreen] = useState(false);
  const [allAssignments, setAssignments] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [newAssignment, setNewAssignment] = useState("");
  const [completedAssignments, setCompletedAssignments] = useState([]);

  const handleAddAssignment = () => {
    let newAssignmentItem = {
      class: newClass,
      assignment: newAssignment
    }

    let updatedAssignmentsArray = [...allAssignments];
    updatedAssignmentsArray.push(newAssignmentItem);

    setAssignments(updatedAssignmentsArray);
    
    localStorage.setItem('assignmentList', JSON.stringify(updatedAssignmentsArray))
  }

  const handleDelete = (index) => {
    let updatedAssignments = [...allAssignments];
    updatedAssignments.splice(index, 1);

    localStorage.setItem('assignmentList', JSON.stringify(updatedAssignments));
    setAssignments(updatedAssignments);
  }

  const handleComplete = (index) => {
    let filteredAssignments = {
      ...allAssignments[index]
    }

    let updatedCompleteArray = [...completedAssignments];
    updatedCompleteArray.push(filteredAssignments);
    setCompletedAssignments(updatedCompleteArray);
    handleDelete(index);
    localStorage.setItem('completedAssignments', JSON.stringify(updatedCompleteArray));
  }

  const handleCompletedAssignmentsDelete = (index) => {
    let updatedAssignments = [...completedAssignments];
    updatedAssignments.splice(index, 1);

    localStorage.setItem('completedAssignments', JSON.stringify(updatedAssignments));
    setCompletedAssignments(updatedAssignments);
  }

  useEffect(() => {
    let savedAssignments = JSON.parse(localStorage.getItem('assignmentList'));
    let completedAssignments = JSON.parse(localStorage.getItem('completedAssignments'));

    if (savedAssignments) {
      setAssignments(savedAssignments);
    }

    if (completedAssignments) {
      setCompletedAssignments(completedAssignments);
    }
    
  }, [])

  return (
    <div className="App">
      <h1>
        GMU Assignment Tracker
      </h1>

      <br/>

      <h2>
        How to use this Application:
      </h2>

      <h3>
        1. Fill in the Class field with what class you will be adding the assignment for
      </h3>

      <h3>
        2. Fill in the Assignment field with what the assignment will be that you want to track
      </h3>

      <h3>
        3. Stay on top of your assignments and ace your classes!
      </h3>

      <br/>

        <div className='assignment-wrapper'>
          <div className='assignment-input'>
            <div className='assignment-input-item'>
              <label>Class</label>
              <input type="text" value={newClass} onChange={(e) => setNewClass(e.target.value)} placeholder="What class is this for?" />
            </div>
            <div className='assignment-input-item'>
              <label>Assignment</label>
              <input type="text" value={newAssignment} onChange={(e) => setNewAssignment(e.target.value)} placeholder="What's the assignment?" />
            </div>
            <div className='assignment-input-item'>
              <button type='button' onClick={handleAddAssignment} className='primary-button'>Add</button>
            </div>
          </div>

          <div className='button-area'>
            <button className={`secondary-button ${isCompleteScreen===false && 'active'}`} onClick={() => setCompleteScreen(false)}>In Progress</button>
            <button className={`secondary-button ${isCompleteScreen===true && 'active'}`} onClick={() => setCompleteScreen(true)}>Completed</button>
          </div>

          <div className='assignment-list'>
            
            {isCompleteScreen === false && allAssignments.map((item, index) => (
              <div className='assignment-list-item' key={index}>
                <div>
                  <h3>{item.class}</h3>
                  <p>{item.assignment}</p>

                </div>
                <div>
                  <AiOutlineDelete
                    onClick={() => handleDelete(index)}
                    title="Delete?"
                    className="icon"
                  />
                  <FcCheckmark
                    onClick={() => handleComplete(index)}
                    title="Completed?"
                    className=" check-icon"
                  />
                </div>
              </div>
            ))}

            {isCompleteScreen === true && completedAssignments.map((item, index) => (
              <div className='assignment-list-item' key={index}>
                <div>
                  <h3>{item.class}</h3>
                  <p>{item.assignment}</p>

                </div>
                <div>
                  <AiOutlineDelete
                    onClick={() => handleCompletedAssignmentsDelete(index)}
                    title="Delete?"
                    className="icon"
                  />
                </div>
              </div>
            ))}
            </div>
        </div>
    </div>
  );
}

export default App;
