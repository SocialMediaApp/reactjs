import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../store/auth';

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}


function cloneDeep (obj) {
  return JSON.parse(JSON.stringify(obj));
}

export class ProfilePagePresenter extends Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user.name && !state.name) {
      return {
        ...state,
        name: props.user.name.slice(0),
      }
    }
    return state;
  }

  changeName = (e) => {
    this.setState({name: e.target.value});
  }

  save = () => {
    let user = cloneDeep(this.props.user)
    user.name = this.state.name;
    this.props.updateCurrentUser(user);
    // if (this.file.hasImage()) {
    //   this.file.generateBlob(blob => {
    //     storage.uploadAvatar(this.user.uid, blob)
    //   });
    // };
    // this.toastSuccess()
    // TODO: toasty
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          {/* <b-field label="Name">
            <b-input v-model="name"></b-input>
          </b-field>
          <b-field label="Avatar">
            <figure class="image">
              <croppa 
                v-model="file"
                canvas-color="whitesmoke"
                accept="image/*"
                :placeholder-font-size="12"
                :show-remove-button="false"
                :prevent-white-space="true">
              </croppa>
              <button 
                @click="file.chooseFile()" 
                class="button is-primary">
                Upload Avatar
              </button>
            </figure>
          </b-field> */}
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                value={this.state.name}
                onChange={this.changeName}/>
            </div>
          </div>
          <div className="level">
            <div className="level-left"></div>
            <div className="level-right">
              <button
                className="button is-info"
                onClick={this.save}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const ProfilePage = connect(
  mapStateToProps,
  { updateCurrentUser }
)(ProfilePagePresenter);