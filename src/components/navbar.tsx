import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';


function Navbar() {
  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <nav className="font-sans flex flex-col sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-center w-full">
        <img className="md:pl-5 h-12 mx-auto sm:mx-0" src={logo} alt="Logo" />
        <div className="flex flex-col sm:flex-row">
            <Link to="/" className="md:mr-5 px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-white hover:bg-orange-400">Liste des livres</Link>
            <Link to="/reservations" className="md:mr-5 px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-white hover:bg-orange-400">Mes réservations</Link>
            <a onClick={handleLogout} className="md:mr-5 px-4 py-2 mt-2 text-sm font-semibold text-white bg-red-400 rounded-lg  md:mt-0 md:ml-4 hover:bg-red-500 cursor-pointer">Se déconnecter</a>
        </div>
    </nav>
  );
}

export default Navbar;