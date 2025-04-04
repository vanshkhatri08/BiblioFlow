import React from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);
const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
      let numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
        (book) => book.status === false
      );
      let numberOfTotalReturnedBooks = userBorrowedBooks.filter(
        (book) => book.status === true
      );
      setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
      setTotalReturnedBooks(numberOfTotalReturnedBooks.length); 
  }, [userBorrowBooks]);
  
  const data = {
    labels: ["Total Borrowed Books", " Total Returned Books"],
    datasets: [
      {
        // label: "Total Books",
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOfset: 4,
      },
    ],
  };


  return <>
  <main className="relative flex-1 p-6 pt-28">
    <Header />
    <div className="flex flex-col-reverse xl:flex-row">
      {/* Left Side */}
      <div className="flex flex-[4] flex-col gap-7 lg:gap-7 lg :px-7 justify-between xl:min-h-[85.5vh]">
          <div className="flex flex-col gap-7 flex-[4]">
            <div className="flex flex-col lg:grid-flow-row gap-7 overflow-y-hidden">
              <div className="flex items-center gap-3 bg-white p-5 min-h-[12] overflow-hidden
              rounded-lg transition hover:shadow-inner duration-300">
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center
                rounded-lg">
                  <img src={bookIcon} alt="book-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Your Borrowed Books List</p>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 min-h-[12] overflow-hidden
              rounded-lg transition hover:shadow-inner duration-300">
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center
                rounded-lg">
                  <img src={returnIcon} alt="return-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Your Returned Books List</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-7"> 
            <div className="flex items-center gap-3 bg-white p-5 max-h-[12] overflow-hidden
              rounded-lg transition hover:shadow-inner duration-300">
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center
                rounded-lg">
                  <img src={browseIcon} alt="browse-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Let's Browse Books Inventory</p>
              </div>
              <img src={logo_with_title} alt="logo-with-title" className="  hidden lg:block w-auto justify-end"/>
            </div>
          </div>
          <div className="bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold
          relative  flex-[3] flex justify-center items-center rounded-2xl">
            <h4 className="Oveflow-y-hidden">
              "Embarking  on the journey of  reading  foaster personal growth,
              nuturing a path towards excellence and the  refinedment of
              character. "
              </h4>
            <p className="text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[78px]
             bottom-[10px]">
              ~ BiblioFlow Team
             </p>
          </div>
      </div>
      {/* Right Side */}
      <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between
      xl:gap-20 py-5">
        <div className="xl:flex-[4] flex items-end w-full content-center">
          <Pie 
          data={data} 
          options={{cutout: 0}} 
          className="mx-auto lg:mx-0 w-full h-auto"
          />
        </div>
        <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit  mr-5 xl:p-3 2xl:p-6 gap-5 h-fit
        xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
          <img src={logo} alt="logo" className="w-auto h-12 2xl:h-20" />
          <span className="w-[2px] bg-black h-full"></span>
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
              <span>Total Books Borrowed </span>
            </p>
            <p className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
              <span>Total Books Returned </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>


  </>;
};

export default UserDashboard;
