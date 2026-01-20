import { React, useState, useEffect } from "react";
import AnimatedLink from './AnimatedLinks'
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.svg"
import { NavLink } from 'react-router-dom';

// destinations for the navbar links
const navLinks = [
  { title: "Home", href: "/"},
  { title: "Code", href: "/"},
  { title: "Documentation", href: "/docs"},
];

const Navbar = () => {
    // toggle to open Menu
    const [open, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // scroll locking
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }, [open]);

    //menu animation
    const menuVars = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0],
            },
        },
        exit: {
            scaleY: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };
    const containerVars = {
        initial: {
            transition: {
                staggerChildren: 0.09,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.09,
                staggerDirection: 1,
            },
        },
    };

    return (
    <header className="z-50 font-mono">
      <nav className="w-full flex justify-between items-center py-8 lg:py-4 px-2">
        <div className="flex items-center gap-[1ch]">
          <div className="w-5 h-5 bg-transparent rounded-full" />
          <span className="text-sm font-semibold tracking-widest">
            <a href="#">
              <img src={logo} alt="logo" className="h-8 w-auto"/>
            </a>
          </span>
        </div>
        <div className="lg:flex hidden gap-12 text-md text-zinc-400">
            <NavLink to="/" className="text-black font-mono hover:text-orange-500"><AnimatedLink title={"Home"} /></NavLink>
            <NavLink to="/code" className="text-black font-mono hover:text-orange-500"><AnimatedLink title={"Code"} /></NavLink>
            <NavLink to="/docs" className="text-black font-mono hover:text-orange-500"><AnimatedLink title={"Documentation"} /></NavLink>
            <a href="https://github.com/Niredxl/retro-web" target="_blank" rel="noopener norefferrer"
              className="text-black font-mono hover:text-orange-500" 
            ><AnimatedLink title={"Github Repo"} /></a>
          
        </div>
        <div
          className="cursor-pointer lg:hidden text-md text-black"
          onClick={toggleMenu}
        >
          Menu
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-[#EB8714] text-black p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <h1 className="text-lg text-black">Retro Web</h1>
                <p
                  className="cursor-pointer text-md text-black"
                  onClick={toggleMenu}
                >
                  Close
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4 "
              >
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden">
                      <MobileNavLink
                        key={index}
                        title={link.title}
                        href={link.href}
                        toggleMenu={toggleMenu}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
            <div className="flex justify-center">
                <a href="https://github.com/Niredxl/retro-web" target="_blank" rel="noopener norefferrer"
              className=" text-black font-mono hover:text-orange-500 text-1xl" 
              ><AnimatedLink title={"Github Repo"} /></a>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
export default Navbar;

const mobileLinkVars = {
    initial: {
        y: "30vh",
        transition: {
            duration: 0.5,
            ease: [0.37, 0, 0.63, 1],
        },
    },
    open: {
        y: 0,
        transition: {
            ease: [0, 0.55, 0.45, 1],
            duration: 0.7,
        },
    },
};

const MobileNavLink = ({ title, href, toggleMenu }) => {
    return (
        <motion.div
        variants={mobileLinkVars}
        className="text-5xl uppercase text-black font-mono">
          <NavLink 
          to={href}
          onClick={toggleMenu}
          >{title}</NavLink>
            
        </motion.div>
    );
};