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
import jwt from "jsonwebtoken";
import swal from "sweetalert";
// import bcrypt from "bcryptjs";
import { getUserByEmail, addRecipeQuery } from "../../queries/queries";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import axios from "axios";

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
                    <label>${
                      $($(this).siblings()[1]).children().length + 1
                    }.</label>
                    <input type="text" >
                    </p>`);
        });
        $(".spinner-border").hide();
      });
    }
    //////////////////////////////////////////////////////////////////////
    if (!props.getUserByEmail.loading) {
      const { getUserByEmail } = props.getUserByEmail;
      setInputValues({...inputValues,
        cheif: getUserByEmail,
        recipes:  getUserByEmail.recipes,
        newUserName:  getUserByEmail.username,
        picture:  getUserByEmail.picture || picture,
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      });
    }
      
  }, [props.getUserByEmail.loading]);

  const addNewRecipe = async (e) => {
    e.preventDefault();
    var ingredients = [];
    $(".ingredients > .steps > p > input").each((index, input) => {
      let text = $(input).val();
      ingredients.push(text);
    });
    var steps = [];
    $(".preparation_steps > .steps > p > input").each((index, input) => {
      let text = $(input).val();
      steps.push(text);
    });
    try {
      if (ingredients.join("").length === 0 || steps.join("").length === 0) {
        await swal(
          "OoOps!",
          "Make sure to add the ingredients and preparation steps.",
          "error"
        );
        return;
      }
      let result = await props.addRecipeQuery({
        variables: {
          title,
          description,
          image,
          type,
          ingredients,
          steps,
          cheifID: cheif.id,
        },
        // refetchQueries: [
        //   { query: getUserByEmail }
        // ],
      });
      await swal("Good job!", "Recipe added.", "success");
      setInputValues({
        title: "",
        description: "",
        image: "",
        picture: personal,
        type: "",
      })
    } catch (error) {
      await swal("OoOps!", "Failed to add recipe.", "error");
    }
  };

  const uploadImage = async (e) => {
    $(".spinner-border").show();
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", "snkyxvjw");
    try {
      var image = await (
        await axios.post(
          "https://api.cloudinary.com/v1_1/dbeuaqex2/image/upload",
          formData
        )
      ).data.url;
      await swal("Good job!", "The image has uploaded.", "success");
      setInputValues({ ...inputValues, image } );
      await $(".spinner-border").hide();
    } catch (error) {
      swal("OoOps!", "The image didn't upload, try again.", "error");
    }
  };

  // const editUser = async (key, valueOne, valueTwo, valueThree) => {
  //   try {
  //     var o = {};
  //     if (key === 'password') {
  //       const isMatchOldPassword = await bcrypt.compare(valueTwo,cheif.password);
  //       if (isMatchOldPassword) {
  //         if (valueTwo === valueOne) {
  //           throw new Error("The new password is the same of the old one");
  //         } else if (valueOne !== valueThree) {
  //           throw new Error("Please make sure the new password and the the confirm of it are the same");
  //         }
  //       } else {
  //         throw new Error("The old password doesn't match");
  //       }
  //     }
  //     o[key] = valueOne;
  //     // var msg = await (await axios.patch(`/api/users/editUser/${this.state.cheif._id}`, o)).data;
  //     await swal('Good job!', msg, 'success');
  //     await this.getUser();
  //   } catch (error) {
  //     await swal('OoOps!', 'Failed to update User ' + error, 'error');
  //   }
  // }

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
                    <input type="file" name="file" onChange={uploadImage} />
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
            <button onClick={addNewRecipe}>Save new recipe</button>
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
                    <input type="file" name="file" onChange={uploadImage} />
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

export default compose(
  graphql(getUserByEmail, {
    name: "getUserByEmail",
    options: (props) => {
      return {
        variables: {
          email: props.location.state.state.email,
        },
      };
    },
  }),
  graphql(addRecipeQuery, { name: "addRecipeQuery" })
)(Dashboard);
