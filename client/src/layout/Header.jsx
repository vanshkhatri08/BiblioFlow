import React from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [currentTime,setCurrentTime] = usestate("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric"};
      setCurrentDate(now.toLocaleDateString("en-US", options));
  };
  updateDateTime();

  const interval = setInterval(updateDateTime, 1000);

  return  () => clearInterval(intervalId);
  }, []);

  return <>
  <header className="absolute top-0 bg-white w-full py-4  px-6 left-0 shadow-md flex justify-between items-center ">
    {/* Left side */}
    <div className="flex items-center gap-2">
      <img src={userIcon} alt="userIcon" className="w-8 h-8" />
      <div className="flex flex-col">
        <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
          {user && user.name}
          </span>
        <span className="text-sm font-medium sm:text-lg sm:font-medium">
          {user && user.role}
          </span>
        {/* <span>Vansh Khatri</span> */}
        {/* <span>Admin</span> */}
      </div>
    </div>
    {/* Right side */}
    <div className=" hidden md:flex items-center gap-2">
      <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
        <span>{currentTime}</span>
        <span>{currentDate}</span>
      </div>
      <span className="bg-black h-14 w-[2px]"/>
      <img src={settingIcon} 
       alt="settingIcon"
       className="w-8 h-8" 
       onClick={() => dispatch(toggleSettingPopup())}
        />
      </div>
    
    </header></>;
};

export default Header;
