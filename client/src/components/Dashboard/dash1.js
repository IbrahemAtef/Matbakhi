import React from 'react';
import personal from '../../imgs/personal.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

class Dashboard extends React.Component {
  state = {};

  componentDidMount() {
    // jquery
    $(function () {
      $('.nav_btn').on('click', function () {
        $('.mobile_nav_items').toggleClass('active');
      });
      $('.sidebar > span').on('click', function (e) {
        let classN = $(e.currentTarget).attr('data-section');
        $(e.currentTarget).addClass('active').siblings().removeClass('active');
        $(classN).show().siblings().hide();
      });
      $('.btn').on('click', function () {
        $($(this).siblings()[1]).append(`<p>
        <label>${$($(this).siblings()[1]).children().length + 1}.</label>
        <input type="text" >
        </p>`);
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {}

  render() {
    return (
      <div>
        <input type='checkbox' id='check' />
        {/* <!--header area start--> */}
        <header>
          <label htmlFor='check'>
            <FontAwesomeIcon icon={faBars} id='sidebar_btn' />
          </label>
          <div className='left_area'>
            <div className='img-logo'>
              <img
                src='https://www.graphicsprings.com/filestorage/stencils/c96ff13ef8e250d256b66881d5b767be.png?width=500&height=500'
                alt='logo'
              />
            </div>
            <h3>Matbakhi</h3>
          </div>
          <div className='right_area'>
            <span
              className='logout_btn'
              onClick={() => {
                localStorage.removeItem('token');
                this.props.history.push('/');
              }}
            >
              Logout <FontAwesomeIcon icon={faSignOutAlt} />{' '}
            </span>
          </div>
        </header>
        {/* start sidebar */}
        <div className='sidebar'>
          <div className='profile_info'>
            <img src={personal} className='profile_image' alt='' />
            <h4>Ahmed</h4>
          </div>
          <span data-section='.add-recipe' className='active'>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Add Recipe</span>
          </span>
          {/* <span  data-section='.edit-recipe'>
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit Recipe</span>
          </span> */}
          <span data-section='.show-recipes'>
            <FontAwesomeIcon icon={faEye} />
            <span>Show Recipe</span>
          </span>
          <span data-section='.profile'>
            <FontAwesomeIcon icon={faUserCircle} />
            <span>Profile</span>
          </span>
        </div>
        {/* start content */}
        <div className='content'>
          {/* add recipe */}
          <div className='add-recipe'>
            <h2>Add a new recipe</h2>
            <div className='recipe'>
              <div className='left'>
                <div className='ingredients'>
                  <h3>Add Recipe Ingredients</h3>
                  <div className='steps'>
                    <p>
                      <label>1. </label>
                      <input type='text' />
                    </p>
                    <p>
                      <label>2. </label>
                      <input type='text' />
                    </p>
                    <p>
                      <label>3. </label>
                      <input type='text' />
                    </p>
                  </div>
                  <button className='btn'>
                    More Ingredients <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <div className='add_img'>
                  <h3>Choose Recipe image:</h3>
                  <p>
                    <label>
                      <input type='file' name='file' />
                      <FontAwesomeIcon icon={faImage} />{' '}
                      <span className='add-photos'>Add Photo</span>
                    </label>
                  </p>
                </div>
                <div className='choice'>
                  <div className='choice-head'>
                    <label>Video Type</label>
                  </div>
                  <select className='custom-select' name='type'>
                    <option value>Choose...</option>
                    <option value='grills'>Grills</option>
                    <option value='pastries'>Pastries</option>
                    <option value='sea-food'>Sea Food</option>
                    <option value='soups'>Soups</option>
                    <option value='sweets'>Sweets</option>
                  </select>
                </div>
              </div>
              <div className='right'>
                <div className='preparation_steps'>
                  <h3>Add Recipe preparation steps:</h3>
                  <div className='steps'>
                    <p>
                      <label>1.</label>
                      <input type='text' />
                    </p>
                    <p>
                      <label>2.</label>
                      <input type='text' />
                    </p>
                    <p>
                      <label>3.</label>
                      <input type='text' />
                    </p>
                  </div>
                  <button className='btn'>
                    More steps <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <div className='add_desc'>
                  <h3>Description: </h3>
                  <textarea></textarea>
                </div>
              </div>
              <div className='clear_fix'></div>
              <button>Save new recipe</button>
            </div>
          </div>

          {/* <div className='edit-recipe'>edit</div> */}
          <div className='show-recipes'>
            <h2>Show Recipes</h2>
            <div className='recipe'>
              <div className='post-block'>
                <div className='post-img-div'>
                  <img src='https://townhub.kwst.net/images/all/1.jpg' alt="img" />
                </div>
                <div className='post-descri-div'>
                  <h4>New Version for huawai</h4>
                  <p>40 Journal Square Plaza, NJ, USA</p>
                </div>
                <div className='post-edit-delete'>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='edit-icon'
                    title="Edit recipe"
                    // onClick={() => {
                    //   this.handleEdit(post.id);
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='delete-icon'
                    title="Delete recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className='show-icon'
                    title="Show recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                </div>
              </div>
              <div className='post-block'>
                <div className='post-img-div'>
                  <img src='https://townhub.kwst.net/images/all/1.jpg' alt="img" />
                </div>
                <div className='post-descri-div'>
                  <h4>New Version for huawai</h4>
                  <p>40 Journal Square Plaza, NJ, USA</p>
                </div>
                <div className='post-edit-delete'>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='edit-icon'
                    title="Edit recipe"
                    // onClick={() => {
                    //   this.handleEdit(post.id);
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='delete-icon'
                    title="Delete recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className='show-icon'
                    title="Show recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                </div>
              </div>
              <div className='post-block'>
                <div className='post-img-div'>
                  <img src='https://townhub.kwst.net/images/all/1.jpg' alt="img" />
                </div>
                <div className='post-descri-div'>
                  <h4>New Version for huawai</h4>
                  <p>40 Journal Square Plaza, NJ, USA</p>
                </div>
                <div className='post-edit-delete'>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='edit-icon'
                    title="Edit recipe"
                    // onClick={() => {
                    //   this.handleEdit(post.id);
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='delete-icon'
                    title="Delete recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className='show-icon'
                    title="Show recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                </div>
              </div>
              <div className='post-block'>
                <div className='post-img-div'>
                  <img src='https://townhub.kwst.net/images/all/1.jpg' alt="img" />
                </div>
                <div className='post-descri-div'>
                  <h4>New Version for huawai</h4>
                  <p>40 Journal Square Plaza, NJ, USA</p>
                </div>
                <div className='post-edit-delete'>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='edit-icon'
                    title="Edit recipe"
                    // onClick={() => {
                    //   this.handleEdit(post.id);
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='delete-icon'
                    title="Delete recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className='show-icon'
                    title="Show recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                </div>
              </div>
              <div className='post-block'>
                <div className='post-img-div'>
                  <img src='https://townhub.kwst.net/images/all/1.jpg' alt="img" />
                </div>
                <div className='post-descri-div'>
                  <h4>New Version for huawai</h4>
                  <p>40 Journal Square Plaza, NJ, USA</p>
                </div>
                <div className='post-edit-delete'>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='edit-icon'
                    title="Edit recipe"
                    // onClick={() => {
                    //   this.handleEdit(post.id);
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='delete-icon'
                    title="Delete recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                  <FontAwesomeIcon
                    icon={faEye}
                    className='show-icon'
                    title="Show recipe"
                    // onClick={() => {
                    //   $('.drop-delete').show();
                    // }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='profile'>profile</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
