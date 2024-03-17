import Navbar from "../components/navbar"
import isUserConnected from "../middlewares/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { ApiGetBookingByUser } from "../services/bookingsAPI";
import CancelRentalPopup from "../components/cancelRentalPopup";

interface Rental {
    id: number;
    startDate: Date;
    endDate: Date;
    book: {
        id: number;
        author: string;
        title: string;
    };
    status: string;
}

function Home(){
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    isUserConnected();

    useEffect(() => {
        getMyRental();
    }, []);

    const getMyRental = async () => {
        setLoading(true);
        const rental = await ApiGetBookingByUser();
        if(rental.status === 200){
            const rentalData = await rental.json();
            setRentals(rentalData);
            setLoading(false);
        }
    };

    const reloadRentals = () => {
        getMyRental();
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <h1 className="text-3xl font-bold text-orange-500 my-5 flex justify-center pb-5">Mes réservations</h1>
            {rentals.length === 0 && (
                <div className="flex justify-center items-center h-96">
                        <h1 className="text-2xl font-bold text-gray-500">Aucune réservation trouvé</h1>
                    </div>
            )}

            {rentals.length > 0 && (
                <div className="flex flex-wrap justify-center">
                    <div className="shadow overflow-x-auto rounded border-b border-gray-200">
                        <table className="w-full bg-white">
                            <thead className="bg-orange-500 text-white">
                                <tr>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Auteur</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Titre</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date de début</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date de fin</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {rentals.map((rental: Rental) => (
                                    <tr key={rental.id}>
                                        <td className="border px-4 py-2">{rental.book.author}</td>
                                        <td className="border px-4 py-2">{rental.book.title}</td>
                                        <td className="border px-4 py-2">{new Date(rental.startDate).toLocaleDateString('fr-FR')}</td>
                                        <td className="border px-4 py-2">{new Date(rental.endDate).toLocaleDateString('fr-FR')}</td>
                                        <td className="border px-4 py-2">
                                            <span className={`py-1 px-3 rounded-full text-xs ${rental.status === 'active' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                {rental.status === 'active' ? 'Actif' : 'Annulée'}
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2 flex">
                                            <button onClick={() => navigate(`/book/${rental.book.id}`)} className="whitespace-nowrap px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 mr-3">Voir le livre</button>
                                            <CancelRentalPopup reloadRentals={reloadRentals} booking={rental} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {loading && (<Loader />)}
        </div>
    )
    
}

export default Home