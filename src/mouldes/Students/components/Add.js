import React from "react";
import { hanldeValidate } from './../helpers';
import { useDispatch, useSelector } from "react-redux";
import { requestAddStudent } from "../acitons";
import Form from "./Form";
import Alerts from "./Alerts";

const initialize = { name: '', age: '', schoolName: '', joined_at: '' };

const Add = () => {
    
    const disapatch = useDispatch();
    const data = useSelector(({ students }) => students);
    const [errors, setErrors] = React.useState([]);
    const [student, setStudent] = React.useState(initialize);

    const handleOnChange = (field, event) => {
        const value = event.target.value;
        setStudent({ ...student, [field]: value });
    };

    const handleSubmit = (data) => {
        const errors = hanldeValidate(data);
        if (errors.length > 0) {
            setErrors(errors);
            return false;
        }
        disapatch(requestAddStudent(data));
        setStudent(initialize);
        setErrors([]);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <Form
                            isLoading={data.loading}
                            student={student}
                            erorrs={errors}
                            handleSubmit={() => handleSubmit(student)}
                            handleOnChange={handleOnChange} />
                        <Alerts 
                            notification={data.notification} 
                            errors={[...errors, data.error]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;