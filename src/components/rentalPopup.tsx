import { useState } from 'react';
import { ApiCreateBooking } from '../services/bookingsAPI';

interface RentalPopupProps {
    book_id: number;
    is_reserved: boolean;
    updateIsReserved: () => void;
}

function RentalPopup({ book_id, is_reserved, updateIsReserved } : RentalPopupProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');

    const handleConfirmReservation = async () => {
        if(startDate === '' || endDate === '') {
            setError('Veuillez remplir les dates de début et de fin');
            return;
        }

        const rental = await ApiCreateBooking(book_id, startDate, endDate);

        if (rental.ok) {
            updateIsReserved();
            setDialogOpen(false);
        } else {
            alert('Erreur lors de la réservation');
        }

    };

    const handleCancel = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <button disabled={is_reserved} onClick={() => setDialogOpen(true)} className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400">
                { is_reserved ? 'Déjà réservé' : 'Louer'}
            </button>
            {dialogOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

                    {/* Dialog */}
                    <dialog open className="fixed inset-0 z-50 flex">
                        <div className="p-8">
                            <h2 className="text-lg font-bold mb-5">Sélectionner les dates pour la réservation</h2>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Date de début :</label>
                            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Date de fin :</label>
                            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <p className="text-red-500 text-sm mb-5">{error}</p>
                            <div className="mt-4 flex justify-end">
                                <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 mr-2" onClick={handleConfirmReservation}>Réserver</button>
                                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={handleCancel}>Annuler</button>
                            </div>
                        </div>
                    </dialog>
                </>
            )}
        </div>
    );
}

export default RentalPopup;
