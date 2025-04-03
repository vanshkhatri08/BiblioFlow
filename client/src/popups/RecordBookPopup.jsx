import React from 'react'
<<<<<<< HEAD
import {useDispatch} from "react-redux"
import {reactBorrowBook} from "../store/slices/borrowSlice"
const RecordBookPopup = () => {
  const dispatch = usDispatch()
  const HandleRecordBook = (e)=>{
    e.preventDefault();
    dispatch(recordBorrowBook(email ,bookId));

  };
  return (
    <div className="fixed inset-0 bg-balck bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3 2xl:w-1/3">
      <div className ="p-6" >
          <h3 className="text-xl-font-bold mb-4">
            Record Book
          </h3>
          <form onSubmit = {handleRecordBook}>
          <div className = "mb-4">
            <label className ="block text-gray-900 font-medium">User Email</label>
            <input
             type ="email"
              value={email}
               onChange={(e)=> createSerializableStateInvariantMiddleware(e.ytarget.value)} 
               placeholder ="Borrower's Email"
               className = "w-full px-4 py-2 border-black rounded-md "
               />

          </div>
          <div className="flex-justify-end space-x-4">
            <button className ="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" type ="button" onClick={}>Close</button>
            <button>Record</button>
          </div>

          </form>

          }
      </div>
      </div>
=======

const RecordBookPopup = (bookId) => {
  return (
    <div>
      <h3>Record Book</h3>
      <p>Book ID: {bookId}</p>
>>>>>>> 5665696b8c9e68b1288f3d49c1c3d7ed7b9f3a36
    </div>
  )
}

export default RecordBookPopup
