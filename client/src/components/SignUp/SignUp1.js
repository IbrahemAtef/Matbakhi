import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

class SignUp extends React.Component {
  state = {
    userName: '',
    email: '',
    password: '',
    type: 'guest',
    cheifKey: '',
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { userName, email, password, type , cheifKey} = this.state;
    if (type === 'cheif' && cheifKey !== "123456789") {
      return swal("OoOps!", " The Cheif key is not correct.", "error");
    }
    try {
      let result = await (
        await axios.post('/api/users/createUser', {
          userName,
          email,
          password,
          type,
        })
      ).data;
      localStorage.setItem('token', result.token);
      if (type === 'cheif') {
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/');
      }
    } catch (error) {
      swal("OoOps!", " Please fill all the fields correctly.", "error");
      this.setState({
        userName: '',
        email: '',
        password: '',
        type: 'guest',
        cheifKey: ''
      })
    }
  }

  render() {
    return (
      <div className='page-main'>
        <div className='bg-layer' style={{paddingTop:20+ 'px'}}>
          <h1 style={{paddingBottom: 15 + 'px'}}>Matbikhi</h1>
          <div className='header-main'>
            <div className='main-icon'>
              <img
                src='https://www9.0zz0.com/2020/11/28/19/473729025.png'
                alt='Done'
              />
            </div>
            <div className='header-left-bottom'>
              <form>
                <div className='icon1'>
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type='text'
                    name='userName'
                    placeholder='User Name'
                    required
                    value={this.state.userName}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className='icon1'>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    required
                    value={this.state.email}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className='icon1'>
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className='icon1'>
                  <FontAwesomeIcon icon={faUserFriends} />
                  <select
                    name='type'
                    value={this.state.type}
                    onChange={this.handleChange.bind(this)}
                  >
                    <option value='guest'>Guest</option>
                    <option value='cheif'>Cheif</option>
                  </select>
                </div>
                {this.state.type === 'cheif' ? (
                  <div className='icon1'>
                    <FontAwesomeIcon icon={faLock} />
                    <input
                      type='password'
                      name='cheifKey'
                      placeholder='Cheif Key'
                      required
                      value={this.state.cheifKey}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                <div className='bottom' onClick={this.handleSubmit.bind(this)}>
                  <button className='btn'>Sign Up</button>
                </div>
                <p className="forgot-password" style={{marginBottom:0}}>Already registered? <a href="/login">login</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
