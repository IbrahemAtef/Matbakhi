import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { loginQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
import jwt from 'jsonwebtoken'

const Login = (props) => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValues;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result =  await props.loginQuery({
        variables: {
          email,
          password,
        },
      });
      
      const { type } = result.data.login;

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
      if (type === "cheif") {
        props.history.push("/dashboard");
      } else {
        props.history.push("/");
      }
    } catch (error) {
      swal("OoOps!", " Invalid email or password.", "error");
      setInputValues({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="page-main">
      <div className="bg-layer">
        <h1>Matbikhi</h1>
        <div
          className="header-main"
          style={{
            paddingTop: 3 + "em",
            paddingBottom: 3 + "em",
            paddingRight: 2 + "em",
            paddingLeft: 2 + "em",
          }}
        >
          <div className="main-icon">
            <img
              src="https://www9.0zz0.com/2020/11/28/19/473729025.png"
              alt="Done"
            />
          </div>
          <div className="header-left-bottom">
            <form>
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
              <div className="bottom" onClick={handleSubmit}>
                <button className="btn">Login</button>
              </div>
              <p className="forgot-password">
                Don't have an account? <a href="../sign-up">SignUp</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default graphql(loginQuery, { name: "loginQuery" })(Login);
