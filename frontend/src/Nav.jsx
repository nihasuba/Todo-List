import React from 'react'

const Nav = () => {
  return (
    <div>
        <nav className="navbar navbar-light bg-light px-5 py-3 shadow-sm">
        <span className="navbar-brand mb-0 h1 todo-logo"><a href="/" className='text-decoration-none text-dark font-bold'>ToDo</a></span>
        <a href="/login" className="btn btn-dark btn-lg">Login</a>
      </nav>
    </div>
  )
}

export default Nav