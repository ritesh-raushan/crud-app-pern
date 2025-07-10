export default function TableList({ handleOpen }) {

    const clients = [
        {id: 1, name: "John Doe", email: "john.doe@gmail.com", job: "Developer", rate: 100, isActive: true},
        {id: 2, name: "Jane Smith", email: "jane.smith@gmail.com", job: "Designer", rate: 120, isActive: false},
        {id: 3, name: "Alice Johnson", email: "alice.johnson@gmail.com", job: "Manager", rate: 150, isActive: true},
        {id: 4, name: "Bob Brown", email: "bob.brown@gmail.com", job: "Developer", rate: 100, isActive: true}
    ]

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
                        {clients.map((client) => (
                            <tr>
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
                                    <button onClick={() => handleOpen('edit')} className="btn btn-accent">Update</button>
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