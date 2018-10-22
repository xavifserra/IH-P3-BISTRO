import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon'

export default class AppBarMenu extends Component {
  render() {
    return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <div className="navbar-burger burger" data-target="navbar-main">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbar-main" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="https://bulma.io/">
            Home
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="https://bulma.io/documentation/overview/start/">
              find bar
            </a>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
              <div className="box">
                <span class="icon"><i className="fa fa-search"></i></span>
                <input type="search" id="search" placeholder="Search..." />
              </div>
              </p>
              <p className="control">
                    <i className="material-icons">search</i>
                    <i className="fas fa-sign-out-alt"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
  }
}
