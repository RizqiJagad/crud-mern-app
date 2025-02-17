import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns is-centered">
            <div className="column is-half">
                <table className="table is-striped is-fullwidth mt-6">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>
                                        <Link to={`/edit/${user._id}`} 
                                            className="button is-small is-info">
                                            Edit
                                        </Link>
                                        <button 
                                        onClick={() => deleteUser(user._id)} className="button is-small is-danger ml-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="has-text-centered">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table> 
                <div className="is-flex is-justify-content-center is-align-items-center">
                    <Link to="add" className="button is-success mt-2">
                        Add New
                    </Link>
                </div> 
            </div>
        </div>
    );
};

export default UserList;
