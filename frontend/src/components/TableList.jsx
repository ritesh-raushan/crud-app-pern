import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function TableList({ handleOpen, searchQuery }) {

    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clients');
                setTableData(response.data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const filteredData = tableData.filter(client => {
        return (
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.job.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover:bg-base-300">
                        {/* row 1 */}
                        {filteredData.map((client) => (
                            <tr key={client.id} onClick={() => handleOpen('edit', client)}>
                                <th>{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button className={`btn rounded-full w-20 ${client.isActive ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                                        {client.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOpen('edit', client)} className="btn btn-accent">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}