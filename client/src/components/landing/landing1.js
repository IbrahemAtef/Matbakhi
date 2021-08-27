import React from 'react';

class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div className='landing'>
        {/* Start Header */}
        <div className='header'>
          <div className='overlay'>
            <div className='container table'>
              <div className='navbar'>
                <span className='main-color wl'>Matbikhi</span>
              </div>
              <div className='table-row'>
                <div className='intro text-center'>
                  <h1 className='upper'>
                    Welcome to <span className='main-color wl'>Matbikhi</span>
                  </h1>
                  <p className='capital'>
                    Educational platform that connects the teachers with the
                    students, <br />
                    it provides an interface that provides the required academic
                    content in one place.
                  </p>
                  <div className='buttons'>
                    <a className='upper' href='/login'>
                      Login
                    </a>
                    <a className='upper' href='/sign-up'>
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header */}
      </div>
    );
  }
}

export default Landing;
