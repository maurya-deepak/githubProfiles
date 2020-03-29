import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUsers, faBook } from "@fortawesome/free-solid-svg-icons";


class Profile extends Component {

  render() {
    const profile = this.props.profile;
    return (
      <div className="profile-section">
        <div className="image-with-name">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="profile" />
          ) : null}
          {profile.name ? <p>{profile.name}</p> : null}
        </div>
        <div className="other-details">
          {profile.username ? (
            <div className="icon-row">
              <FontAwesomeIcon icon={faGithub} />
              <p>{profile.username}</p>
            </div>
          ) : null}
          {profile.followers ? (
            <div className="icon-row">
              <FontAwesomeIcon icon={faUsers} />
              <p>{profile.followers} followers</p>
            </div>
          ) : null}
          {profile.following ? (
            <div className="icon-row">
              <FontAwesomeIcon icon={faUsers} />
              <p>{profile.following} following</p>
            </div>
          ) : null}
          {profile.public_repos ? (
            <div className="icon-row">
              <FontAwesomeIcon icon={faBook} />
              <p>{this.props.repos} repos</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Profile;