import classNames from "classnames";
import {React} from 'react';
import { Link } from 'react-router-dom'
import { NavBarLinks} from "./NavBarLinks";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const Sidebar = ({ collapsed,shown, setCollapsed }) => {
    const Icon = collapsed ? GoSidebarCollapse : GoSidebarExpand;

    return (
        <div className={classNames({
            " bg-primary font-mono font-bold tracking-wide text-zinc-50 z-20 shadow-[8px_8px_0px_#C0C0C0BF] h-full": true,
            "transition-all duration-300 ease-in ease-out": true,
            "fixed md:static md:translate-x-0": true,
            "w-[300px]": !collapsed,
            "w-[300px] md:w-16" : collapsed,
            "-translate-x-full md:translate-x-0": !shown,
        })}>
            
            <div className={classNames({
                "flex flex-col justify-between": true,
            })}>
                <div className={classNames({
                    "flex items-center border-b border-b-primary": true,
                    "p-4 justify-between": !collapsed,
                    "py-4 justify-center": collapsed,
                    
                })}>
                    {!collapsed && <span className="whitespace-nowrap">RetroWeb Docs</span>}
                    <button className={classNames({
                        "hidden md:grid place-content-center": true,
                        "hover:bg-primary": true,
                        "w-10 h-10 rounded-full": true,
                    })}
                    onClick={() => setCollapsed(!collapsed)} >
                        <Icon className="w-5 h-5" />
                    </button>
                   
                </div>
                 <nav className="flex-grow ">
                        <ul
                        className={classNames({
                            "my-2 flex flex-col gap-2 items-strech": true,
                        })}>
                            {NavBarLinks.map((item, index) => {
                                return (
                                    <li
                                    key={index}
                                    className={classNames({
                                        "text-zinc-50 hover:bg-secondary flex" : true,
                                        "transition-colors duration-300": true,
                                        "rounded-md p-2 mx-3 gap-4" : !collapsed,
                                        "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                                    })}>
                                        <Link href={item.href} className="flex gap-2">
                                         <span>{!collapsed && item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
            </div>
        </div>
    );
};
export default Sidebar;
