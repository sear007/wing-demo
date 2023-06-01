import React from "react";
import { 
    useDispatch, 
    useSelector,
} from "react-redux";
import { 
    requestDeleteStudent, 
    requestSearchStudents, 
    requestStudents,
} from "../acitons";
import { useNavigate } from "react-router-dom";
import { formatDate } from './../../../helpers';
import { db } from "../../../config/firebaseConfig";

const List = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.students.students);

    const handleSearching = (event) => {
        const value = event.target.value;
        dispatch(requestSearchStudents(value));
    };

    React.useEffect(() => {
        const unsubscribe = db.collection('students').onSnapshot((snapshot) => {
            dispatch(requestStudents());
        });
        return () => unsubscribe();
    }, []);
    

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h3 className="mb-0">List of students</h3>
                <div>
                    <div className="input-group">
                        <input onChange={handleSearching} type="text" placeholder="Search" className="form-control" />
                        <button onClick={() => navigate(`/students/add`)} className="btn btn-outline-secondary" type="button">
                            Add New
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <table className="table table-striped table-sm m-0">
                    <thead className="table-light">
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">School name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Joined Date</th>
                            <th scope="col">Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, key) => (
                            <tr key={item.id}>
                                <th className="text-center" scope="row">{key + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.schoolName}</td>
                                <td>{item.age}</td>
                                <td>{formatDate(item.joined_at)}</td>
                                <td style={{width: '5%'}}>
                                    <div className="btn-group">
                                        <button onClick={() => navigate(`/students/edit/${item.id}`)} className="btn btn-secondary btn-sm">View</button>
                                        <button onClick={() => dispatch(requestDeleteStudent(item.id))} className="btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;