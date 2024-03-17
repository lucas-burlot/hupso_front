import Navbar from "../components/navbar"
import BookCard from "../components/bookCard"
import isUserConnected from "../middlewares/auth";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { ApiGetBooks } from "../services/booksAPI";
import { ApiGetBookings } from '../services/bookingsAPI';

function Home(){
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    isUserConnected();

    useEffect(() => {
        getBooks();
    }, []);

    const getBookings = async (bookData: any) => {
        setLoading(true);
        const bookings = await ApiGetBookings();
        if(bookings.status === 200){
            const bookingsData = await bookings.json();
            const currentDate = new Date().toLocaleDateString('fr-FR');
            const booksWithReservationStatus = bookData.map((book: any) => {
                // Check if the book is reserved with the current date and if the status is active
                const isReserved = bookingsData.some((booking: any) => {
                    const startDate = new Date(booking.startDate).toLocaleDateString('fr-FR')
                    const endDate = new Date(booking.endDate).toLocaleDateString('fr-FR')
                    return booking.book.id === book.id && booking.status === 'active' && startDate <= currentDate && endDate > currentDate;
                });
                return {
                    ...book,
                    isReserved,
                };
            });

            // filter by status
            if(status === 'reserved'){
                setBooks(booksWithReservationStatus.filter((book: any) => book.isReserved));
            } else if (status === 'disponible'){
                setBooks(booksWithReservationStatus.filter((book: any) => book.isReserved === false));
            } else {
                setBooks(booksWithReservationStatus);
            }

            setLoading(false);
        }
    };

    // Update the isReserved status of the books
    const updateIsReserved = () => {
        getBookings(books);
    }

    const getBooks = async () => {
        setBooks([]);
        setLoading(true);
        const books = await ApiGetBooks(title, category, date);

        if(books.status === 200){
            let booksData = await books.json();
            getBookings(booksData);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <h1 className="text-3xl font-bold text-orange-500 my-5 flex justify-center">Liste des livres</h1>
            <div className="flex flex-wrap justify-center mb-5">
                <div className="flex items-center mb-3 mr-0 sm:mr-3">
                    <label className="mr-1">Filtrer par titre :</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="flex items-center mb-3 mr-0 sm:mr-3">
                    <label className="mr-1">Filtrer par année :</label>
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="flex items-center mb-3 mr-0 sm:mr-3">
                    <label className="mr-1">Filtrer par catégorie :</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Toutes les catégories</option>
                    <option value="romance">Romance</option>
                    <option value="drame">Drame</option>
                    <option value="fiction">Fiction</option>
                    </select>
                </div>
                <div className="flex items-center mb-3 mr-0 sm:mr-3">
                    <label className="mr-1">Filtrer par status :</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Toutes les status</option>
                    <option value="disponible">Disponible</option>
                    <option value="reserved">Réservé</option>
                    </select>
                </div>
                <div className="flex items-center mb-3 mr-0 sm:mr-3">
                <button onClick={getBooks} className="bg-orange-500 text-white px-5 py-2 rounded-md ml-3">Filtrer</button>
                </div>
            </div>
            <div className="flex flex-wrap items-center">
                    
                { books.map((book, index) => (
                        <BookCard key={index} book={book} updateIsReserved={updateIsReserved} />
                    ))}
                </div>

                {/* Show a message if no book is found */}
                {!loading && books.length === 0 && (
                    <div className="flex justify-center items-center h-96">
                        <h1 className="text-2xl font-bold text-gray-500">Aucun livre trouvé</h1>
                    </div>
                    )
                }
                
                {loading && (<Loader />)}


            </div>
    )
}

export default Home