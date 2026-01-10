import { NavLink } from "react-router";

const NavbarLinks = ({ userData }) => {
    return (
        <>
            {/* ================= USER ROUTES ================= */}
            {userData?.role === "user" && (
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    <li className='text-lg'><NavLink to="/">Home</NavLink></li>
                    <li className='text-lg'><NavLink to="/public-lessons">Public Lessons</NavLink></li>
                    <li className='text-lg'><NavLink to="/dashboard/add-lesson">Add Lesson</NavLink></li>
                    <li className='text-lg'><NavLink to="/dashboard/my-lessons">My Lessons</NavLink></li>
                    <li className='text-lg'><NavLink to="/about">About</NavLink></li>
                    {/* Lessons Dropdown */}
                    <li className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            className="cursor-pointer text-lg px-2 py-1 rounded hover:bg-base-200 transition"
                        >
                            More
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-100 menu p-2 shadow bg-base-100 rounded-box w-56"
                        >
                            <li className='text-lg'><NavLink to="/support">Help & Support</NavLink></li>
                            <li className='text-lg'><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                            <li className='text-lg'><NavLink to="/contact">Contact</NavLink></li>
                            <li className='text-lg'><NavLink to="/terms">Terms</NavLink></li>
                        </ul>
                    </li>
                </div>
            )}

            {/* ================= ADMIN ROUTES ================= */}
            {userData?.role === "admin" && (
                <li className="dropdown dropdown-hover">
                    <div
                        tabIndex={0}
                        className="cursor-pointer text-lg px-2 py-1 rounded hover:bg-base-200 transition"
                    >
                        Admin Panel
                    </div>

                    <ul
                        tabIndex={0}
                        className="dropdown-content z-100 menu p-2 shadow bg-base-100 rounded-box w-60"
                    >
                        <li>
                            <NavLink to="/dashboard">Statistics</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-lessons">Manage Lessons</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-flagged-lessons">
                                Flagged Lessons
                            </NavLink>
                        </li>
                    </ul>
                </li>
            )}

            {/* ================= NOT LOGGED IN ================= */}
            {!userData && (
                <div className="flex flex-col lg:flex-row items-center justify-center">
                    <li className="text-lg">
                        <NavLink to="/">Home</NavLink>
                    </li>

                    <li className="text-lg">
                        <NavLink to="/public-lessons">Public Lessons</NavLink>
                    </li>
                    <li className='text-lg'><NavLink to="/about">About</NavLink></li>
                    <li className='text-lg'><NavLink to="/terms">Terms</NavLink></li>

                    <li className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            className="cursor-pointer text-lg px-2 py-1 rounded hover:bg-base-200 transition"
                        >
                            More
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-100 menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to="/support">Help & Support</NavLink>
                            </li>
                        </ul>
                    </li>
                </div>
            )}
        </>
    );
};

export default NavbarLinks;
