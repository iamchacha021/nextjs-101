'use client'

import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

export default function Search() {
    const [search, setsearch] = useState('')
    const router = useRouter()

    // Beware that the data type is a form event which must be imported. The form event has htmlformelement
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setsearch('')
        router.push(`/${search}/`)
    }
  return (
    <form className="w-50 flex justify-center md:justify-between" onSubmit={handleSubmit}>
        <input
            type="text"
            value={search}
            onChange={(e)=> setsearch(e.target.value)}
            className="bg-white p-2 w-80 text-xl rounded-xl"
            placeholder='Search'
        />
        <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">
            🚀
        </button>
    </form>
  )
}
