import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebaseConfig";

const Dashboard = () => {
    const [countStudents, setCountStudents] = React.useState(0);
    const handleCountStudents = async () => {
        try {
          const studentsCollectionRef = collection(db, "students");
          const querySnapshot = await getDocs(studentsCollectionRef);
          const count = querySnapshot.size;
          setCountStudents(count);
        } catch (error) {
          console.log("Error counting students:", error);
        }
    };
    React.useEffect(() => {
        const unsubscribe = db.collection('students').onSnapshot( async () => {
            handleCountStudents();
        });
        return () => unsubscribe();
    }, []);
    
    return ( 
        <div className="row">
            <div className="col-md-4">
                <div className="card bg-secondary text-white">
                    <div className="card-header">
                        <h5 className="mb-0 text-center">Total number of students</h5>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center p-0">
                        <h1 className="p-3">{countStudents}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;