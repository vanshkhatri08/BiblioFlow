import React from 'react'
import { useDispatch } from 'react-redux';
import { returnBook } from '../store/slices/borrowSlice';
import { toggleReturnBookPopup } from '../store/slices/popUpSlice';

const ReturnBookPopup = ({bookId, email}) => {
    const dispatch = useDispatch();
    const handleReturnBook = (e) => {
      e.preventDefault();
      dispatch(recordBook(email, bookId));
      dispatch(toggleReturnBookPopup());
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="w-full bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3 2xl:w-1/3">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">
          Return Book
        </h3>
        <form onSubmit={handleReturnBook}>
          <div className="mb-4">
            <label className="block text-gray-900 font-medium">User Email</label>
            <input
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Borrower's Email"
              className="w-full px-4 py-2 border border-black rounded-md"
              required
              disabled 
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              type="button"
              onClick={() => dispatch(toggleReturnBookPopup())}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Return
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ReturnBookPopup
