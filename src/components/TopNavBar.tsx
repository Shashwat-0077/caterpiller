import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                className="text-xl font-bold text-gray-900 dark:text-white"
                            >
                                Cocoon.
                            </a>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <a
                                href="#"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                About
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Services
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <a
                            href="#"
                            className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                        >
                            Sign In
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
