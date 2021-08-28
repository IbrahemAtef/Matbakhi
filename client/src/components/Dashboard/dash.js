import personal from "../../imgs/personal.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faPlusCircle,
  faEdit,
  faEye,
  faUserCircle,
  faPlus,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { useState, useEffect } from "react";
import jwt from 'jsonwebtoken'
import swal from "sweetalert";
// import bcrypt from "bcryptjs";
import { getUserByEmail } from "../../queries/queries";
import { graphql, compose } from "react-apollo";

const Dashboard = (props) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
    image: "",
    picture: personal,
    type: "",
    cheif: "",
    recipes: "",
    newUserName: "",
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const {
    title,
    description,
    image,
    picture,
    type,
    cheif,
    recipes,
    newUserName,
    oldPassword,
    newPassword,
    newPasswordConfirm,
  } = inputValues;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            props.history.push("/");
        } else {
            ///////////////// jquery ///////////////
            $(function () {
                $(".nav_btn").on("click", function () {
                $(".mobile_nav_items").toggleClass("active");
                });
                $(".sidebar > span").on("click", function (e) {
                let classN = $(e.currentTarget).attr("data-section");
                $(e.currentTarget)
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
                $(classN).show().siblings().hide();
                });
                $(".btn").on("click", function () {
                $($(this).siblings()[1]).append(`<p>
                    <label>${$($(this).siblings()[1]).children().length + 1}.</label>
                    <input type="text" >
                    </p>`);
                });
                $(".spinner-border").hide();
            });
        }
        //////////////////////////////////////////////////////////////////////
        const {getUserByEmail} =props.getUserByEmail;
        setInputValues({
          cheif: getUserByEmail,
          recipes: getUserByEmail && getUserByEmail.recipes,
        })
    }, []);

    return (
    <div>
      <input type="checkbox" id="check" />
      {/* <!--header area start--> */}
      <header>
        <label htmlFor="check">
          <FontAwesomeIcon icon={faBars} id="sidebar_btn" />
        </label>
        <div className="left_area">
          <div className="img-logo">
            <img
              src="https://www.graphicsprings.com/filestorage/stencils/c96ff13ef8e250d256b66881d5b767be.png?width=500&height=500"
              alt="logo"
            />
          </div>
          <h3>Matbakhi</h3>
        </div>
        <div className="right_area">
          <span
            className="logout_btn"
            onClick={() => {
              localStorage.removeItem("token");
              props.history.push("/");
            }}
          >
            Logout <FontAwesomeIcon icon={faSignOutAlt} />{" "}
          </span>
        </div>
      </header>
      {/* start sidebar */}
      <div className="sidebar">
        <div className="profile_info">
          <img
            src={picture}
            className="profile_image"
            alt="cheid_img"
          />
          <h4>{cheif && cheif.userName}</h4>
        </div>
        <span data-section=".add-recipe" className="active">
          <FontAwesomeIcon icon={faPlusCircle} />
          <span>Add Recipe</span>
        </span>
        {/* <span  data-section='.edit-recipe'>
              <FontAwesomeIcon icon={faEdit} />
              <span>Edit Recipe</span>
            </span> */}
        <span data-section=".show-recipes">
          <FontAwesomeIcon icon={faEye} />
          <span>Show Recipe</span>
        </span>
        <span data-section=".profile">
          <FontAwesomeIcon icon={faUserCircle} />
          <span>Profile</span>
        </span>
      </div>
      {/* start content */}
      <div className="content">
        {/* add recipe */}
        <div className="add-recipe">
          <h2>Add a new recipe</h2>
          <div className="recipe">
            <div className="title">
              <h3>Title of the recipe:</h3>
              <input
                name="title"
                type="text"
                value={title}
                onChange={handleOnChange}
                style={{ width: 78 + "%", marginLeft: 25 + "px" }}
              />
            </div>
            <div className="left">
              <div className="ingredients">
                <h3>Add Recipe Ingredients</h3>
                <div className="steps">
                  <p>
                    <label>1. </label>
                    <input type="text" />
                  </p>
                  <p>
                    <label>2. </label>
                    <input type="text" />
                  </p>
                  <p>
                    <label>3. </label>
                    <input type="text" />
                  </p>
                </div>
                <button className="btn">
                  More Ingredients <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="add_img">
                <h3>Choose Recipe image:</h3>
                <div role="status" className="spinner-border">
                  <span className="sr-only">Loading...</span>
                </div>
                <p>
                  <label>
                    <input
                      type="file"
                      name="file"
                      // onChange={this.uploadImage.bind(this)} //////////////////////////////////////////////*/*/*/*/*////////
                    />
                    <FontAwesomeIcon icon={faImage} />{" "}
                    <span className="add-photos">Add Photo</span>
                  </label>
                </p>
              </div>
              <div className="choice">
                <div className="choice-head">
                  <label>Video Type</label>
                </div>
                <select
                  className="custom-select"
                  name="type"
                  value={type}
                  onChange={handleOnChange}
                >
                  <option value>Choose...</option>
                  <option value="grills">Grills</option>
                  <option value="pastries">Pastries</option>
                  <option value="sea-food">Sea Food</option>
                  <option value="soups">Soups</option>
                  <option value="sweets">Sweets</option>
                </select>
              </div>
            </div>
            <div className="right">
              <div className="preparation_steps">
                <h3>Add Recipe preparation steps:</h3>
                <div className="steps">
                  <p>
                    <label>1.</label>
                    <input type="text" />
                  </p>
                  <p>
                    <label>2.</label>
                    <input type="text" />
                  </p>
                  <p>
                    <label>3.</label>
                    <input type="text" />
                  </p>
                </div>
                <button className="btn">
                  More steps <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="add_desc">
                <h3>Description: </h3>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleOnChange}
                ></textarea>
              </div>
            </div>
            <div className="clear_fix"></div>
            <button 
            // onClick={handleSubmit}
            >
              Save new recipe
            </button>
          </div>
        </div>

        {/* <div className='edit-recipe'>edit</div> */}
        <div className="show-recipes">
          <h2>Show Recipes</h2>
          <div className="recipe">
            {recipes && recipes.length !== 0 ? (
              recipes.map((recipe, index) => {
                return (
                  <div className="post-block" key={index}>
                    <div className="post-img-div">
                      <img src={recipe.image} alt="img" />
                    </div>
                    <div className="post-descri-div">
                      <h4>{recipe.title}</h4>
                      <p>{recipe.description}</p>
                    </div>
                    <div className="post-show-delete">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="show-icon"
                        title="Show recipe"
                        // onClick={() => {
                        // }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="delete-icon"
                        title="Delete recipe"
                        onClick={() => {
                          // deleteRecipe(recipe._id);
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <h4>You didn't add any recipes yet</h4>
            )}
          </div>
        </div>
        <div className="profile">
          <h2>My Profile</h2>
          <div className="recipe">
            <div className="left">
              <div className="edit_signle">
                <p>
                  <span>Email:</span>
                  <input
                    id="disabled"
                    type="text"
                    disabled={true}
                    value={cheif && cheif.email}
                  />
                </p>
              </div>
              <div className="edit_signle">
                <p>
                  <span>UserName:</span>
                  <input
                    type="text"
                    name="newUserName"
                    onChange={handleOnChange}
                    value={cheif && newUserName}
                  />
                </p>
                <button
                  className="edit_btn"
                  onClick={() => {
                    // editUser("userName", newUserName);
                  }}
                >
                  Edit UserName
                </button>
              </div>
              <div className="add_img">
                <span>Personal image:</span>
                <div role="status" className="spinner-border">
                  <span className="sr-only">Loading...</span>
                </div>
                <p>
                  <label>
                    <input
                      type="file"
                      name="file"
                      // onChange={uploadImage}
                    />
                    <FontAwesomeIcon icon={faImage} />{" "}
                    <span className="add-photos">Add Photo</span>
                  </label>
                </p>
                <button
                  className="edit_btn"
                  onClick={() => {
                    // editUser("picture", image);
                  }}
                >
                  Edit personal image
                </button>
              </div>
            </div>
            <div className="right">
              <div className="edit_signle">
                <p>
                  <span>Change your password:</span>
                  <input
                    type="text"
                    name="oldPassword"
                    onChange={handleOnChange}
                    placeholder="Please Enter the old password"
                  />
                  <input
                    type="text"
                    name="newPassword"
                    onChange={handleOnChange}
                    placeholder="Please Enter the new password"
                  />
                  <input
                    type="text"
                    name="newPasswordConfirm"
                    onChange={handleOnChange}
                    placeholder="Please Renter the new password"
                  />
                </p>
                <button
                  className="edit_btn"
                  style={{
                    marginTop: 8 + "px",
                    width: 90 + "%",
                    fontSize: 16 + "px",
                  }}
                  // onClick={() => {
                  //   editUser(
                  //     "password",
                  //     newPassword,
                  //     oldPassword,
                  //     newPasswordConfirm
                  //   );
                  // }}
                >
                  Edit password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default graphql(getUserByEmail, {name: "getUserByEmail", options: (props)=>{
  return {
    variables: {
      email: props.history.location.state.state.email
    }
  }
}})(Dashboard);
