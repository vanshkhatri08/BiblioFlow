import React ,{useEffect , useState} from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {toggleReturnBookPopup} from "../store/slices/popUpSlice";
import {toast} from "react-toastify";
import {fetchAllbooks , resetBookSlice} from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks , resetBookSLice } from "../store/slices/borrowSlice";
import returnBookPopup from  "../popups/ReturnBookPopup";
const Catalog = () => {
  const dispatch = useDispatch();
  const {returnBookPopup} = useSelector((state) => state.popUp);
  const {loading , error ,allBorrowedBook , message} = useSelector((state) => state.book);
    
  const [filter , setFilter] = useState("borrowed");

  const formatDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    const result = `${formattedDate} ${formattedTime}`;
    return result;
  };
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
   
    return ${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1 ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBook?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  }
  );
  
  const overdueBooks = allBorrowedBook?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  }
  );

  const booksToDisplay  = 
    filter === "borrowed" ? borrowedBooks : overdueBooks;
     const [email, setEmail] = useState("");
     const[borrowedBookId , setBorrowedBookId] = useState("");
     const openturnBookPopup = (email , bookId) => {
      setEmail(email);
      setBorrowedBookId(id);
      dispatch(toggleReturnBookPopup());
       
      useEffect(() => {
        if(message){
          toast.success(message);
          dispatch(fetchAllBorrowedBooks());
          dispatch(fetchAllbooks());
          dispatch(resetBorrowSlice());
          dispatch(resetBookSlice());
        }
        if(error){
          toast.error(error);
          dispatch(resetBorrowSlice());
        } 
      },[dispatch, loading, error]);



  return <>
  <main className="relative flex-1 p-6 pt-28">
    <Header />
      {/* SUB HEADER */}
       

      <header className="flex flex-col gap-3 sm:flex-row md:items-center">
        <button 
        className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg
          sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
            filter === "borrowed"
            ? "bg-black text-white border-black"
            : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setFilter("borrowed")}
          > 
          Borrowed Books
          </button>

          <button 
          className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg
            sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "overdue"
              ? "bg-black text-white border-black"
              : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("overdue")}
          >
             Overdue Borrowers
            </button>
        </header> 

        {
          bookToDisplay.length && bookToDisplay.length > 0 ? (
            <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Username</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Price</th>
                     <th className="px-4 py-2 text-left">Due Date</th>
                    <th className="px-4 py-2 text-left">Date & Time</th>
                    <th className="px-4 py-2 text-left">Return</th>
                  </tr>
                </thead>

               <tbody>
                {booksToDisplay.map((book, index) => (
                 <tr
                  key={index}
                  className={(index+ 1) % 2 === 0 ? "bg-gray-50" : "" }
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book?.user.name}</td>
                    <td className="px-4 py-2">{formatDate(book?.user.email}</td>
                    <td className="px-4 py-2">{formatDate(book.price)}</td>
                    <td className="px-4 py-2">
                      {formatDate(book.duedate)}
                      </td>
                      <td className="px-4 py-2">
                      {formatDateAndTime(book.createdDate)}
                      </td>
                    <td className="px-4 py-2">
                      book.returnDate ? ( FaSquareCheck className="w-6 h-6" /> ) : (
                      <PiKeyReturnBold className="w-6 h-6" onClick={() => openReturnBookPopup(book?.user.email , book.id)}/>

                    </td> 
                  </tr>
                ))}
                </tbody> 
              </table>
            </div>
          )  : (
            <h3 className="text-3xl mt-5 font-medium"
            >
               No {filter === "borrowed" ? "Borrowed" : "Overdue"} Books Found.
                </h3>
          )}
         </main>
         {returnBookPopup && <ReturnBookPopup />}
  </>;
};

export default Catalog;
