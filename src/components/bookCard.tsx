import { useNavigate } from 'react-router-dom';
import couverture from '../assets/livre.jpg';
import RentalPopup from './rentalPopup';

interface Book {
    id: number;
    title: string;
    author: string;
    publishedAt: Date;
    category: string;
    description: string;
    isReserved: boolean;
};

interface BookCardProps {
    book: Book,
    updateIsReserved: () => void;
}


function BookCard({ book, updateIsReserved } : BookCardProps){
  // try to convert the date to a more readable format
  const navigate = useNavigate();

  const publishedAt = new Date(book.publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
  });


return (
    <div className="md:mx-10 mx-auto my-5 relative max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer">

      <img onClick={() => navigate(`/book/${book.id}`)} className="w-72 brightness-50" src={couverture} alt="Book Cover" />


      <div className="absolute bottom-0 w-full bg-white bg-opacity-90 p-4 rounded-b-lg rounded-t-3xl">
  
        <div className="mb-2">
          <div className="text-gray-900 font-bold text-lg">{ book.title }</div>
          <div className="text-gray-900 font-bold text-sm">{ book.author }</div>
          <div className="text-gray-600 font-bold text-sm">Date de publication : { publishedAt } </div>
        </div>
        <div className="mb-4">
            <span className="inline-block bg-orange-600 rounded-full px-2 py-1 text-xs font-semibold text-white mr-2">{ book.category }</span>
        </div>
        <div className="mb-3">
          <p title={ book.description } className="mt-2 text-gray-700 text-xs mb-4 overflow-ellipsis line-clamp-2">
              "{ book.description}"
          </p> 
        </div>
        <RentalPopup book_id={book.id} is_reserved={book.isReserved} updateIsReserved={updateIsReserved}/>
      </div>
    </div>
);

}

export default BookCard;