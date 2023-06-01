import React from 'react';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route,
} from 'react-router-dom';
import Login from '../Login';
import Dashboard from '../Dashboard';
import { AuthLayout, MainLayout } from '../../components/layout';
import { 
    StudentLayout, 
    StudentList,
    StudentEdit, 
    StudentAdd,
} from '../Students';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route element={<Login />} path='/login' />
                </Route>
                <Route element={<MainLayout />}>
                    <Route element={<Dashboard />} path='/' />
                    <Route path='/students' element={<StudentLayout />}>
                        <Route index element={<StudentList />} />
                        <Route path="add" element={<StudentAdd />} />
                        <Route path="edit/:id" element={<StudentEdit />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;