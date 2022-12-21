import React, { FC, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

const User = ({ user }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const queryClient = useQueryClient();


    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    
    return (
        <>
            <div
                className="rounded-md shadow-md bg-white"
                onClick={() => toggleMenu()}
            >
                <div className="mx-2 mt-2 overflow-hidden rounded-md">
                    <img
                        src='https://picsum.photos/1000/1000'
                        // alt={user.title}
                        className="object-fill w-full h-full"
                    />
                </div>
                <div className="p-4">
                    <h5 className="font-semibold text-xl text-[#4d4d4d] mb-4">
                        {/* {user.title.length > 25
                            ? user.title.substring(0, 25) + "..."
                            : user.title} */}
                    </h5>
                    <div className="flex items-center mt-4">
                        {/* <p className="p-1 rounded-sm mr-4 bg-[#dad8d8]">{user.category}</p> */}
                        <p className="text-[#ffa238]">
                            {/* {format(parseISO(user.createdAt), "PPP")} */}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center px-4 pb-4">
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxal3Yjq_FW9T821i07KND9uFAnu59XY0ng0D0abc&s'
                                // alt={user.user.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <p className="ml-4 text-sm font-semibold">{user.username}</p>
                    </div>
                    <div className="relative">
                        <div
                            className="text-3xl text-[#4d4d4d] cursor-pointer p-3"
                            onClick={toggleMenu}
                        >
                            <i className="bx bx-dots-horizontal-rounded"></i>
                        </div>
                        <ul
                            className={twMerge(
                                `absolute bottom-5 -right-1 z-50 py-2 rounded-sm bg-white shadow-lg transition ease-out duration-300 invisible`,
                                `${openMenu ? "visible" : "invisible"}`
                            )}
                        >
                            <li
                                className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                                onClick={() => {
                                    toggleMenu();
                                }}
                            >
                                <i className="bx bx-edit-alt"></i> <span>Edit</span>
                            </li>
                            <li
                                className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                                
                            >
                                <i className="bx bx-trash"></i> <span>Delete</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <PostModal
                openPostModal={openPostModal}
                setOpenPostModal={setOpenPostModal}
            >
                <UpdatePost post={user} setOpenPostModal={setOpenPostModal} />
            </PostModal> */}
        </>
    );
};

export default User;
