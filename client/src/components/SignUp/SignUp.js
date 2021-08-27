import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { addUserQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
import jwt from 'jsonwebtoken';


const SignUp = (props) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    type: "guest",
    cheifKey: "",
  });

  useEffect(() => {
    
  }, [])

  const { username, email, password, type, cheifKey } = inputValues;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "cheif" && cheifKey !== "123456789") {
      return swal("OoOps!", " The Cheif key is not correct.", "error");
    }
    
    try {
      // let result =
      await props.addUserQuery({
        variables: {
          username,
          email,
          password,
          type,
          cheifKey,
        },
      });
      

      const payload = {
        user: {
          email,
          type
        },
      };

      jwt.sign(
        payload,
        "waterMellon",
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
            localStorage.setItem("token", token)
        },
      );      
      // if (result.data.addUser.type === "cheif") {
      //   props.history.push("/dashboard");
      // } else {
      //   props.history.push("/");
      // }
    } catch (error) {
      swal("OoOps!", " Please fill all the fields correctly.", "error");
      setInputValues({
        username: "",
        email: "",
        password: "",
        type: "guest",
        cheifKey: "",
      });
    }
  };

  return (
    <div className="page-main">
      <div className="bg-layer" style={{ paddingTop: 20 + "px" }}>
        <h1 style={{ paddingBottom: 15 + "px" }}>Matbikhi</h1>
        <div className="header-main">
          <div className="main-icon">
            <img
              src="https://www9.0zz0.com/2020/11/28/19/473729025.png"
              alt="Done"
            />
          </div>
          <div className="header-left-bottom">
            <form>
              <div className="icon1">
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  name="username"
                  placeholder="User Name"
                  required
                  value={username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="icon1">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={handleOnChange}
                />
              </div>
              <div className="icon1">
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={handleOnChange}
                />
              </div>
              <div className="icon1">
                <FontAwesomeIcon icon={faUserFriends} />
                <select name="type" value={type} onChange={handleOnChange}>
                  <option value="guest">Guest</option>
                  <option value="cheif">Cheif</option>
                </select>
              </div>
              {type === "cheif" ? (
                <div className="icon1">
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type="password"
                    name="cheifKey"
                    placeholder="Cheif Key"
                    required
                    value={cheifKey}
                    onChange={handleOnChange}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <div className="bottom" onClick={handleSubmit}>
                <button className="btn">Sign Up</button>
              </div>
              <p className="forgot-password" style={{ marginBottom: 0 }}>
                Already registered? <a href="/login">login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default graphql(addUserQuery, { name: "addUserQuery" })(SignUp);
