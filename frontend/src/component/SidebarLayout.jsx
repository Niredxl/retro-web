import React, {useState } from 'react';
import classNames from "classnames";
import { IoMdMenu } from "react-icons/io";

import Sidebar from './Sidebar';

const Layout = (props) => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    return (
        <div className={classNames({
            "grid min-h-screen": true,
            "grid-cols-sidebar": !collapsed,
            "grid-cols-sidebar-collapsed": collapsed,
            "transition-[grid-template-columns] duration-300 ease-in ease-out": true,
            
        })}>
            {/* sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={() => setSidebarCollapsed((prev) => !prev)} />
            {/* content */}
            <div className=""> {props.children}</div>
        </div>
    )
}
export default Layout;