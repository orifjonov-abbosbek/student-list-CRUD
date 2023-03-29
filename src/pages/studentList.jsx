import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function StudentList() {
  const [students, setStudents] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    gender: "",
    faculty: "",
    isBudget: false,
    contractSum: "",
  });
  const [studentId, setStudentId] = React.useState(null)

  const [isBudget, setIsBudget] = React.useState(false);



  const API_PATH = "https://6421df3686992901b2be16b3.mockapi.io/studends";

  const getStudents = async () => {
    try {
      const res = await fetch(API_PATH);
      const data = await res.json();
      setStudents(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBudgetChange = (event) => {
    setIsBudget(event.target.value === "false");
  };

  const deleteStudent = async (studentId) => {
    console.log();
    try {
      const response = await fetch(
        `https://6421df3686992901b2be16b3.mockapi.io/studends/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(
          `Student with id ${studentId} has been deleted successfully`
        );
        getStudents();
      } else {
        console.log(
          `Error while deleting student with id ${studentId}: ${data.message}`
        );
      }
    } catch (error) {
      console.log(
        `Error while deleting student with id ${studentId}: ${error}`
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      faculty: formData.get("faculty"),
      isBudget: formData.get("isBudget"),
      contractSum: formData.get("contractSum"),
    };

    fetch(API_PATH, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => getStudents())
      .catch((error) => console.error(error));

    setModal(false);
  };




  React.useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <h2 className="student-list-title text-white mx-auto w-25 mt-3 border d-flex justify-content-center rounded p-2 bg-indigo">
            Student List
          </h2>
          <div className="row">
            <div className="col-12 my-5">
              <button
                className="btn btn-outline-success d-block"
                onClick={() => setModal(true)}
              >
                Add
              </button>
            </div>
            {students.map((student) => (
              <div className="col-4 mb-3" key={student.id}>
                <div className="card p-3">
                  <div className="card-header">
                    <h2 className="">{student.name}</h2>
                  </div>
                  <div className="card-body">
                    <h3>Age: {student.age}</h3>
                    <h3>Faculty: {student.faculty}</h3>
                    <h3>Contract: $ {student.contractSum}</h3>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-warning" >Edit</button>

                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => deleteStudent(student.id)}
                    >
                      
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>
            <h2 className="text-center">Add Students</h2>
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <input
                className="form-control mb-3"
                type="text"
                name="name"
                placeholder="Enter your firstname"
                required
              />
              <input
                className="form-control mb-3"
                type="number"
                name="age"
                placeholder="Enter your age"
                required
              />
              <select className="form-select mb-3" name="gender" required>
                <option value="">Choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                className="form-control mb-3"
                type="text"
                name="faculty"
                placeholder="Enter your faculty"
                required
              />

              <select
                className="form-select mb-3"
                name="isBudget"
                onChange={handleBudgetChange}
                required
              >
                <option value="">Are you a budget student?</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>

              {isBudget && (
                <input
                  className="form-control mb-3"
                  type="number"
                  name="contractSum"
                  placeholder="Enter the contract sum"
                  required
                />
              )}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success" type="submit">
                Save
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </section>
    </>
  );
}
