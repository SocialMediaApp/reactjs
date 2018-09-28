import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../store/auth';
import { getAvatarUrl } from '../services/avatar';

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
    this.state = {
      name: '',
      avatarUrl: '',
      width: 0,
      scale: 1,
    };
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

  componentDidMount () {
    this.getAvatar();
  }

  componentDidUpdate (prevProps) {
    if (this.props.user.uid !== prevProps.user.uid) {
      this.getAvatar();
    }
  }

  getAvatar = () => {
    if (this.props.user.uid) {
      getAvatarUrl(this.props.user.uid).then(url => {
        this.setState({avatarUrl: url});
      });
    }
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

  zoom = (e) => {
    console.log(e)
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                value={this.state.name}
                onChange={this.changeName}/>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <AvatarEditor
              image={this.state.avatarUrl}
              width={350}
              height={350}
              scale={this.state.scale}
              onWheel={this.zoom}
              border={0}/>
              <button
                style={{width: "350px", margin: ".5rem 0"}}
                className="button is-primary">
                Upload Avatar
              </button>
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