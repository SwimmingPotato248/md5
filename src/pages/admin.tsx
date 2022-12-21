import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Message from "../components/message";
import User from "../components/user";

const Admin: NextPage = () => {
    const {data: users} = trpc.user.getAll.useQuery();

    return (

        <>
            <section className="bg-ct-blue-600 min-h-screen py-12">
                <div>
                    {users?.length === 0 ? (
                        <Message>There are no user at the moment</Message>
                    ) : (
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 px-6">
                            {users?.map((user: any) => (
                                <User user={user} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Admin;

