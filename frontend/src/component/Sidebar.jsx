import classNames from "classnames";
import { React } from 'react';
import { Link } from 'react-router-dom'
import sidebarData from "../data/sidebarData.json";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const Sidebar = ({ collapsed, shown, setCollapsed }) => {
    const Icon = collapsed ? GoSidebarCollapse : GoSidebarExpand;

    const renderHierachy = (nodes) => {
        return nodes.map((node, index) => {
            // Folder / Category
            if (node.type === 'category') {
                if (collapsed) return null;

                return (
                    // FIXED: Changed flex=col to flex-col
                    <li key={index} className="flex flex-col mb-4">
                        <div className="px-4 py-1 text-xs uppercase text-zinc-300 font-bold tracking-wider mt-2">
                            {node.label}
                        </div>
                        {/* ADDED: border-l-2 and adjusted margins to create a visual cascade line */}
                        <ul className="flex flex-col gap-1 border-l-2 border-zinc-600 ml-5 pl-2 mt-1">
                            {renderHierachy(node.children)}
                        </ul>
                    </li>
                );
            }

            // Standard Link
            const linkPath = node.path ? `/docs${node.path}` : "#";
            return (
                <li
                    key={index}
                    className={classNames({
                        "text-zinc-50 hover:bg-secondary flex": true,
                        "transition-colors duration-300": true,
                        "rounded-md py-1.5 px-2 mx-1 gap-4": !collapsed, 
                        "rounded-full p-2 mx-3 w-10 h-10 justify-center": collapsed,
                    })}>
                    <Link to={linkPath} className="flex gap-2 items-center w-full">
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0 md:hidden"></div>
                        <span className="truncate text-sm">
                            {!collapsed ? node.label : node.label.substring(0, 2)}
                        </span>
                    </Link>
                </li>
            );
        })
    }

    return (
        <div className={classNames({
            "bg-primary font-mono tracking-wide text-zinc-50 z-20 shadow-[8px_8px_0px_#C0C0C0BF] h-full": true,
            "transition-all duration-300 ease-in ease-out": true,
            "fixed md:static md:translate-x-0": true,
            "w-[300px]": !collapsed,
            "w-[300px] md:w-16": collapsed,
            "-translate-x-full md:translate-x-0": !shown,
        })}>

            <div className={classNames({
                "flex flex-col justify-between h-full": true,
            })}>
                <div className={classNames({
                    "flex items-center border-b border-b-zinc-700/50": true,
                    "p-4 justify-between": !collapsed,
                    "py-4 justify-center": collapsed,

                })}>
                    {!collapsed && <span className="whitespace-nowrap font-bold">RetroWeb Docs</span>}
                    <button className={classNames({
                        "hidden md:grid place-content-center": true,
                        "hover:bg-zinc-700/50 transition-colors": true,
                        "w-10 h-10 rounded-full": true,
                    })}
                        onClick={() => setCollapsed(!collapsed)} >
                        <Icon className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-grow overflow-y-auto custom-scrollbar p-2">
                    <ul
                        className={classNames({
                            "my-2 flex flex-col gap-1 items-stretch": true,
                        })}>
                        {renderHierachy(sidebarData)}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;