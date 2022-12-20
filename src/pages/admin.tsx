import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Admin: NextPage = () => {
    
    
    return (

        <>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Author</th>
                        <th className="px-4 py-2">Views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Intro to CSS</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">858</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="border px-4 py-2">A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                        <td className="border px-4 py-2">Adam</td>
                        <td className="border px-4 py-2">112</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Intro to JavaScript</td>
                        <td className="border px-4 py-2">Chris</td>
                        <td className="border px-4 py-2">1,280</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Admin;

