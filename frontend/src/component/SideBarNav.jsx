import  React  from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import classNames from "classnames";



const SideBarNav = (props) => {
    return(
        <nav
        className={classNames({
            "bg-white/87 text-zinc-500": true,
            "flex items-center": true,
            "w-screen md:w-full sticky md:relative z-10 px-4  h-[100px] top-0": true, 
        })}>
            <div className="font-bold text-lg"></div>
            <div className="flex-grow"></div>
            <button className="md:hidden" onClick={props.onMenuButtonClick}>
                <GiHamburgerMenu className=" h-6 w-6" />
            </button>
        </nav>
    );
};

export default SideBarNav;