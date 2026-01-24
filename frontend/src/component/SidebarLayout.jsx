import React, {useState } from 'react';
import classNames from "classnames";
import { IoMdMenu } from "react-icons/io";

import Sidebar from './Sidebar';
import SideBarNav from './SideBarNav';

const Layout = (props) => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <div className={classNames({
            "md:grid min-h-screen": true,
            "md:grid-cols-sidebar": !collapsed,
            "md:grid-cols-sidebar-collapsed": collapsed,
            "transition-[grid-template-columns] duration-300 ease-in ease-out": true,
            
        })}>
            {/* sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={() => setSidebarCollapsed((prev) => !prev)} shown={showSidebar} />
                <div>
                    <SideBarNav onMenuButtonClick={() => setShowSidebar((prev) => !prev)} />
                    {props.children}
                </div>
            {/* content */}
            <div className=""> </div>
        </div>
    )
}
export default Layout;