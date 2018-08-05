import React, { Component } from 'react';

export class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>SMA</strong> by <a href="https://jgthms.com">Tim Waite</a>.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterComponent;