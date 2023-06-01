import React from 'react';
import { Link } from 'react-router-dom';

const Form = ({
    student,
    handleSubmit,
    handleOnChange,
    isLoading = false,
}) => {
    return ( 
        <div>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-sm btn-outline-primary mb-3' to='/students'>Go Back</Link>
            </div>
            <div className="form-floating mb-3">
                <input onChange={(event) => handleOnChange('name', event)} required value={student?.name} type="text" className="form-control" placeholder="Student name" />
                <label>Student name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={(event) => handleOnChange('age', event)} required value={student?.age} type="number" className="form-control" placeholder="Age" />
                <label>Student Age</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={(event) => handleOnChange('schoolName', event)} required value={student?.schoolName} type="text" className="form-control" placeholder="School name" />
                <label>School name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={(event) => handleOnChange('joined_at', event)} required value={student?.joined_at} type="date" className="form-control" placeholder="Joined Date" />
                <label>Joined Date</label>
            </div>
            {isLoading 
            ? <button className="btn btn-primary w-100" type="button" disabled>
                    <span className="spinner-border me-2 spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
              </button> 
            : <button onClick={handleSubmit} className="btn btn-outline-primary w-100">Save</button>}
        </div>    
    );
}
 
export default Form;