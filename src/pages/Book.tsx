import Navbar from "../components/navbar"
import isUserConnected from "../middlewares/auth";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import couverture from '../assets/livre.jpg';
import { ApiGetBookById } from "../services/booksAPI";

interface BookType {
    author: string;
    title: string;
    publishedAt: string;
    category: string;
    description: string;
}

function Book(){
    const { id } = useParams();
    const [book, setBook]= useState<BookType | null>();
    const [loading, setLoading] = useState(false);

    isUserConnected();

    useEffect(() => {
        getBookById();
    }, []);

    const getBookById = async () => {
        setLoading(true);
        if(id === undefined) return;

        const book = await ApiGetBookById(id);
        if(book.status === 200){
            const data = await book.json();
            // format the date to a more readable format
            data.publishedAt = new Date(data.publishedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
            });
            setBook(data);
            setLoading(false);
        } else {
            window.location.href = '/';
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <h1 className="text-3xl font-bold text-orange-500 my-5 flex justify-center">Information du livre</h1>
            <div className="flex items-center justify-center pt-5 px-5">
                {book && (
                    <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                        <img
                            src={couverture}
                            alt="image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h6 className="mb-2 font-semibold uppercase text-orange-500">
                            { book?.author }
                        </h6>
                        <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                            { book?.title}
                        </h4>
                        <p className="mb-2 text-sm text-gray-700">
                            <span className="font-semibold">Date de publication :</span> { book?.publishedAt }
                        </p>
                        <p className="mb-4 text-sm text-gray-700">
                        <span className="font-semibold">Catégorie :</span> { book?.category }
                        </p>
                        <p className="mb-8 text-gray-900">
                            { book?.description}
                        </p>
                        <Link to="/">
                            <button className="flex items-center gap-2 rounded-lg py-3 px-1 text-xs font-bold uppercase text-orange-500 transition-all hover:bg-orange-400 hover:text-white" type="button">
                                Retourner à la liste des livres
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    ></path>
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                )}
            </div>
            {loading && (
                // skeleton card loader, img on the left, right card text like the card ij this code but in skeleton mode
            <div className="flex justify-center pt-5 px-5">
                    <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                            <div className="h-full w-full bg-gray-300"></div>
                        </div>
                        <div className="p-6">
                            <div className="mb-2 font-semibold uppercase text-orange-500 bg-gray-300 h-5 w-20"></div>
                            <div className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased bg-gray-300 h-5 w-40"></div>
                            <div className="mb-2 text-sm text-gray-700 bg-gray-300 h-5 w-40"></div>
                            <div className="mb-4 text-sm text-gray-700 bg-gray-300 h-5 w-40"></div>
                            <div className="mb-8 text-gray-900 bg-gray-300 h-5 w-60"></div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Book;