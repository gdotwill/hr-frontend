import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const Table = ({  
    handleOpen, 
    setData, 
    searchTerm,
    data,
    clients
}) => {
 
    const filteredData = data.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await clients.delete(`/${id}`); 
            setData((prevData) => prevData.filter(client => client.id !== id)); 
        } catch (err) {
            console.log(err)
        }      
    };

    return (
        <>  
            <div className="overflow-x-auto mt-10">
                {
                   filteredData.length > 0 ? (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Job</th>
                                <th>Rate</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody className="hover">
                                {filteredData.map((client) => (
                                    <tr key={client.id}>
                                        <th>{client.id}</th>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.job}</td>
                                        <td>{client.rate}</td>
                                        <td>
                                            <p className={`${client.isactive ? `text-green-400` : `text-yellow-400`}`}>
                                                {client.isactive ? 'Active' : 'Inactive'}
                                            </p>
                                        </td>
                                        <td>
                                            <button onClick={() => handleOpen('edit', client)} className="btn btn-edit"><FaEdit size={18} /></button>
                                        </td>
                                        <td>
                                            <button className="btn btn-delete"  onClick={() => handleDelete(client.id)}><RiDeleteBinLine size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                   ) : (
                        <p className='text-center'>No data</p>
                   ) 
                }
                
            </div>
        </>
    )
}

export default Table;