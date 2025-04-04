import React from "react";
import {useDispatch} from "react-redux";
import {addBook , FetchAllBooks} from "../store/slices/bookSlice";
import {toggleAddBookPopup} from "../store/slices/popUpSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const {message , loading } = useSelector(state => state.book);

  const [title , setTitle] = useState("");
  const [author , setAuthor] = useState("");
   const [price , setPrice] = useState("");
  const [quantity , setQuantity] = useState("");
  const [description , setDescription] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("author", author);
    formdata.append("price", price);
    formdata.append("quantity", quantity);
    formdata.append("description", description);
    dispatch(addBook(formdata));
    
    
  };
  
  return <>
    <div className="fixed inset-0 bg-balck bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3 2xl:w-1/3">
      <div className ="p-6" >
          <h3 className="text-xl-font-bold mb-4">
            Record Book
          </h3>
          <form onSubmit = {handleAddBook}>
          <div className = "mb-4">
            <label className ="block text-gray-900 font-medium">Book Title</label>
            <input
             type ="text"
              value={title}
               onChange={(e)=> setTitle(e.target.value)} 
               placeholder ="Book Title"
               className = "w-full px-4 py-2 border-black rounded-md "
               required
               />

          </div>
          <div className = "mb-4">
            <label className ="block text-gray-900 font-medium">Book Author</label>
             <input
             type ="text"
              value={author}
               onChange={(e)=> setAuthor(e.target.value)} 
               placeholder ="Book Author"
               className = "w-full px-4 py-2 border-black rounded-md "
               required
               />

          </div>
          <div className = "mb-4">
            <label className ="block text-gray-900 font-medium">Book price (price for borrowing) </label>
            <input
             type ="num"
              value={price}
               onChange={(e)=> setPrice(e.target.value)} 
               placeholder ="Book Price"
               className = "w-full px-4 py-2 border-black rounded-md "
               required
               />

          </div>
          <div className = "mb-4">
            <label className ="block text-gray-900 font-medium"> Quantity</label>
            <input
             type ="number"
              value={quantity}
               onChange={(e)=> setQunatity(e.target.value)} 
               placeholder ="Book Quantity"
               className = "w-full px-4 py-2 border-black rounded-md "
               required
               />

          </div>
          <div className = "mb-4">
            <label className ="block text-gray-900 font-medium">Book Description</label>

            <textarea 
            value ={description}
            onChange={(e)=> setDescription(e.target.value)}
            placeholder ="Book Description"
            rows={4}
            className ="w-full px-4 py-2 border  border-black rounded-md"
            />
           

          </div>
          <div className="flex-justify-end space-x-4">
            <button
             className ="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              type ="button"
               onClick={() => { dispatch(toggleAddBookPopup());
            }}
            >
            Close
            </button>
            <button type "submit" className ="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Add
            </button>
          </div>

          </form>

          }
      </div>
  </>;
};

export default AddBookPopup;
