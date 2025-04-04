import React from 'react'
import {useDispatch} from "react-redux"
import {reactBorrowBook} from "../store/slices/borrowSlice"
import {toggleRecordBookPopup} from "../store/slices/popUpSlice"
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
               onChange={(e)=> setEmail(e.ytarget.value)} 
               placeholder ="Borrower's Email"
               className = "w-full px-4 py-2 border-black rounded-md "
               required
               />

          </div>
          <div className="flex-justify-end space-x-4">
            <button
             className ="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              type ="button"
               onClick={() => { dispatch(toggleRecordBookPopup());
            }}
            >
            Close
            </button>
            <button type "submit" className ="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Record</button>
          </div>

          </form>

          }
      </div>
      </div>


const RecordBookPopup = (bookId) => {
  return (
    <div>
      <h3>Record Book</h3>
      <p>Book ID: {bookId}</p>

    </div>
  )
}

export default RecordBookPopup
