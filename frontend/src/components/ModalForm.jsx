import React, { useState } from 'react';
import { use } from 'react';
import { useEffect } from 'react';

export default function ModalForm({ isOpen, onClose, mode, onSubmit, clientData }) {

    const[rate, setRate] = useState('');
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[job, setJob] = useState('');
    const[status, setStatus] = useState(false);

    // Handle the change of status
    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Active');
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                name,
                email,
                job,
                rate: Number(rate),
                isactive: status
            };
            await onSubmit(formData);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    useEffect(() => {
        if (mode === 'edit' && clientData) {
            setName(clientData.name);
            setEmail(clientData.email);
            setJob(clientData.job);
            setRate(clientData.rate);
            setStatus(clientData.isactive);
        } else {
            setName('');
            setEmail('');
            setJob('');
            setRate('');
            setStatus(false);
        }
    }, [mode, clientData]);

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                    <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Client Details'}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col">  
                        {/* Removed method="dialog" and moved close button outside form */}
                        
                        <label className="input input-bordered flex items-center gap-2 mb-4 w-full">
                            Name
                            <input type="text" placeholder="Name" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-4 w-full">
                            Email
                            <input type="text" placeholder="Email" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-4 w-full">
                            Job
                            <input type="text" placeholder="Job" className="grow" value={job} onChange={(e) => setJob(e.target.value)} />
                        </label>

                        <div className="flex mb-4 justify-between gap-2">
                            <label className="input input-bordered flex items-center gap-2">
                            Rate
                            <input type="number" placeholder="Rate" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} />
                        </label>
                        <select value={status ? 'Active' : 'Inactive'} onChange={handleStatusChange} className="select select-bordered w-full max-w-xs">
                            <option>Inactive</option>
                            <option>Active</option>
                        </select>
                        </div>

                        <button type="submit" className="btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Client'}</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}