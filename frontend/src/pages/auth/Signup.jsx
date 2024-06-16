import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lodding, setlodding] = useState();

  return (
      <div>
          <section className="pl-[10rem] flex flex-wrap">
              <div className="mr-[4rem] mt-[5rem]">
                  <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
                  <form className="container w-[40rem]">
                      <div className="my-[2rem]">
                          <label htmlFor="name" className="text-sm font-medium block">
                              Name
                          </label>
                          <input type="text" id="name" className="border rounded w-full mt-1 p-2" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="my-[2rem]">
                          <label htmlFor="email" className="text-sm font-medium block">
                              Email address
                          </label>
                          <input type="email" id="email" className="border rounded w-full mt-1 p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="my-[2rem]">
                          <label htmlFor="password" className="text-sm font-medium block">
                              Password
                          </label>
                          <input type="password" id="password" className="border rounded w-full mt-1 p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <button type="submit" className="bg-pink-500 px-4 py-2 cursor-pointer rounded my-4">
                          {'Sign In'}
                      </button>
                      {lodding && <Loder />}
                  </form>
                  <div className="mt-4">
                      <p>
                          Already have account?{' '}
                          <Link to={'/login'} className="hover:underline text-pink-500">
                              Login
                          </Link>
                      </p>
                  </div>
              </div>
          </section>
      </div>
  );
}
