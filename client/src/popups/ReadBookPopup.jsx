import React from 'react'
import { toggleReadBookPopup } from '../store/slices/popUpSlice';

<<<<<<< HEAD
const ReadBookPopup = () => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-balck bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3 2xl:w-1/3">
       <div className=" flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
        <h2 className = "text-white text-lg font-bold"  >
          View book info
        </h2>>
        <h2 className = "text-white text-lg font-bold" onClick={() => dispatchEvent(toggleReadBookPopup)} >
          <button className='' >
            &times
          </button>
          </div>
        <div className="p-6">
        <div className="mb-4">
        <label className="block text-gray-700 font-semibold ">
        Book Title
        </label>
        <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
        { book && book.title}
        </p>
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 font-semibold ">
        Author
        </label>
        <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
        { book && book.author}
        </p>
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 font-semibold ">
        Description
        </label>
        <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
        { book && book.description}
        </p>
        </div>
        </div>
        < div className ="flex justify-end px-4 bg-gray-100 rounded-b-lg">
          <button className =" px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 "
           type ="button"
            onClick={() => dispatch(toggleReadBookPopup())}
              ></button>
            
          
            Close
          </button>
        </div>

      </div>
=======
const ReadBookPopup = (bookId) => {
  return (
    <div>
      <h3>Read Book</h3>
      <p>Book ID: {book._id}</p>
>>>>>>> 5665696b8c9e68b1288f3d49c1c3d7ed7b9f3a36
    </div>
  )
}

export default ReadBookPopup ;
