import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestStudent, requestUpdateStudent } from "../acitons";
import { useParams } from "react-router-dom";
import { hanldeValidate } from "../helpers";
import Form from "./Form";
import Alerts from "./Alerts";

const Edit = () => {

    const dispatch = useDispatch();
    const data = useSelector(({ students }) => students);
    const [student, setStudent] = React.useState({  });
    const [errors, setErrors] = React.useState([]);
    const params = useParams();
    const studentId = params.id;

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
        dispatch(requestUpdateStudent({ ...data, id: studentId }));
        setStudent(data);
        setErrors([]);
    };

    React.useEffect(() => {
        dispatch(requestStudent(studentId));
    }, []);
    
    React.useEffect(() => {
        setStudent(data.student)
    }, [data.student]);

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
 
export default Edit;