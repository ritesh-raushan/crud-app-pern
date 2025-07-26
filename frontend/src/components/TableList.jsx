import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function TableList({ handleOpen, searchQuery, refreshTrigger }) {

    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/clients');
            // Filter out any null/undefined entries and sort by ID
            const validData = response.data.filter(client => client && client.id).sort((a, b) => a.id - b.id);
            setTableData(validData);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (clientId) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await axios.delete(`http://localhost:8000/api/clients/${clientId}`);
                // Refresh the data after successful deletion
                fetchData();
            } catch (err) {
                console.error('Error deleting client:', err);
                setError(err.message);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);

    const filteredData = tableData.filter(client => {
        // First check if client exists and has required properties
        if (!client || !client.name || !client.email || !client.job) {
            return false;
        }
        
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
                    <tbody>
                        {/* row 1 */}
                        {filteredData.map((client) => (
                            <tr key={client.id} className="hover:bg-base-300">
                                <th>{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button className={`btn rounded-full w-20 ${(client.isactive || client.isActive) ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                                        {(client.isactive || client.isActive) ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOpen('edit', client)} className="btn btn-accent">Update</button>
                                </td>
                                <td>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(client.id);
                                        }} 
                                        className="btn btn-error">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}