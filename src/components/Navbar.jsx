import { FaDownload } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";


const NavBar = ({  onOpen, onSearch, exportToCsv }) => {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

  return (
        <>
            <div className="h-24 pt-8 text-center">
                <h1 className="font-bold text-3xl">HR Dashboard</h1>
            </div>
            <hr />
            <div className="mt-10 navbar bg-base-100 p-4">
            
            <div className="navbar-start" onClick={exportToCsv}>
                <a className="btn btn-ghost text-xl"><FaDownload /> Export</a>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                <input type="text" placeholder="Search" onChange={handleSearchChange} className="input input-bordered w-48 md:w-auto" />
                </div>
            </div>
            <div className="navbar-end">
                <a className="btn btn-add" onClick={onOpen}><FaPlus />Add Client</a>
            </div>
            </div>
        </>
  )
}

export default NavBar;