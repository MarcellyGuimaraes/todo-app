import Head from 'next/head'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-center bg-cyan-900 p-4">
            <Head><title>Todo App</title></Head>
            <h1 className="text-2xl font-bold text-white">My Todo App</h1>
        </nav>
    )
}

export default Navbar