import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { Formik } from 'formik';

const Register: NextPage = () => {
    const { mutate } = trpc.user.register.useMutation();

    const handleRegister = (values) => {
        mutate(values)

    }
    return (

        <div className="text-center">

            <Formik
                initialValues={{ username: '', password: '', display_name: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    }
                    return errors;
                }}
                onSubmit={handleRegister}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-12">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                    Username
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input onBlur={handleBlur} onChange={handleChange} name="username" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="khai.ngo" />
                                <p className="text-red-500 text-xs italic">{errors.username && touched.username && errors.username}</p>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-12">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                    Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input onBlur={handleBlur} onChange={handleChange} name="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
                                <p className="text-red-500 text-xs italic">{errors.password && touched.password && errors.password}</p>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-12">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                    Display Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input onBlur={handleBlur} onChange={handleChange} name="display_name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Ngo Van Khai" />
                                <p className="text-red-500 text-xs italic">{errors.display_name && touched.display_name && errors.display_name}</p>
                            </div>
                        </div>

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>


        </div>
    );
};

export default Register;

