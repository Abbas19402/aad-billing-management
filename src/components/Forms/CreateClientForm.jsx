import React, { useState } from 'react'
import useRequest from '../../hooks/useRequest'

const CreateClientForm = ({ setActiveTab, update }) => {
    const request = useRequest();
    const date = new Date();

    const [error , setError] = useState({
        status: false,
        message: ""
    });

    const createClient = async(e) => {
        e.preventDefault();
        let form = new FormData(e.currentTarget);
        let values = {};

        for(var pair of form.entries()) {
            values[pair[0]] = pair[1];
        }
        const clientPayload = {
            associatedWith: JSON.parse(localStorage.getItem('user')).id,
            name: values.name,
            email: values.email,
            address: values.address,
            totalAmount: 0
        };

        const res = await request.client.create(clientPayload);
        if(res == {} || typeof res == 'undefined') {
            setError({
                status: true,
                message: res.message
            })
        } else if(res) {
            setActiveTab('allClients')
            update()
            e.target.reset()
        }
    }
    return (
        <div className='w-full h-screen p-4'>
            <form onSubmit={createClient} className='flex flex-col gap-y-2 justify-start items-start'>
                <div className='w-64'>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="name"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6 px-1.5 font-medium"
                        />
                    </div>
                </div>
                <div className='w-64'>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6 px-1.5 font-medium"
                        />
                    </div>
                </div>

                <div className='w-64'>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Address
                    </label>
                    <div className="mt-2">
                        <input
                            id="address"
                            name="address"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6 px-1.5 font-medium"
                        />
                    </div>
                </div>

                {error.status ? <span className="text-base font-medium text-red-600">
                    {error.message}    
                </span> : <span></span>}
                <button
                    type="submit"
                    className=" my-3 flex w-64 justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Create Client
                </button>
            </form>
        </div>
    )
}

export default CreateClientForm