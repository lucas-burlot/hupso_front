import { useState } from 'react';
import { ApiCancelBooking } from '../services/bookingsAPI';

interface Book {
    id: number;
    status: string;
}

interface RentalPopupProps {
    booking: Book;
    reloadRentals: () => void;
}

function CancelRentalPopup({ booking, reloadRentals } : RentalPopupProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');

    const handleConfirmCancel = async () => {
        const bookings = await ApiCancelBooking(booking.id);
        if(bookings.status === 200) {
            setDialogOpen(false);
            reloadRentals();
        } else {
            const errorData = await bookings.json();
            setError(errorData.message);
        }
    };

    const handleCancelButton = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            {booking.status === 'active' && (
                <button onClick={() => setDialogOpen(true)} className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Annuler</button>
             )}
             
            {dialogOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

                    {/* Dialog */}
                    <dialog open className="fixed inset-0 z-50 flex">
                        <div className="p-8">
                            <h2 className="text-lg font-bold mb-5">Annulation de la réservation d'un livre</h2>
                            <p className="text-basetext-sm mb-5">Êtes-vous sûr de vouloir annuler la réservation de ce livre ?</p>
                            <p className="text-red-500 text-sm mb-5">{error}</p>
                            <div className="mt-4 flex justify-start">
                                <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 mr-2" onClick={handleConfirmCancel}>Confirmer</button>
                                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={handleCancelButton}>Annuler</button>
                            </div>
                        </div>
                    </dialog>
                </>
            )}
        </div>
    );
}

export default CancelRentalPopup;
