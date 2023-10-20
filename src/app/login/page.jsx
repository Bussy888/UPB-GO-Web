"use client"
import React from 'react';
import { useForm } from "react-hook-form";

const LoginPage = () =>{
    const { register, formState: { errors }, handleSubmit} = useForm();

    const onSubmit = (data) =>{
        const user ={
            user:data.email,
            password:data.password
        }
    }

    return(
        <>
        <div className='w-full h-screen bg-[#F2F2F2]'>
            <div className='flex flex-col bg-[#EAEAEA] border-2 border-black'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className=" text-2xl">Email</label>
                        <input
                            type="text"
                            className=" text-base border-2 border-black w-72 h-9 invalid:border-red-800"
                            placeholder="ejemplo123@upb.com"
                            {...register('email', {
                                required: true
                            })}/>
                        {errors.email?.type === 'required' && <h1 className=" text-base text-red-700">*Debe llenar este campo</h1>}

                </form>
                
            </div>
        </div>
        </>
    )
}

export default LoginPage;