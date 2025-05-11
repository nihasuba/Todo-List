import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Indexx = () => {
  return (
    <div className="indexx-wrapper min-vh-100 d-flex flex-column">
      
      {/* <nav className="navbar navbar-light bg-light px-5 py-3 shadow-sm">
        <span className="navbar-brand mb-0 h1 todo-logo"><a href="/" className='text-decoration-none text-dark font-bold'>ToDo</a></span>
        <a href="/login" className="btn btn-dark btn-lg">Login</a>
      </nav> */}

      {/* Main Content */}
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1 text-center">
        <h2 className="mb-4">Quick and Easy To use, Anytime Anywhere</h2>
        <p className="mb-4 lead">
          Plan your Day Better, Get Your Life Organized. Taskmate lets you keep track of your tasks in one place.
        </p>
        <a href="/login" className="btn btn-primary btn-lg">Let's Get Started</a>
      </div>
    </div>
  );
};

export default Indexx;
