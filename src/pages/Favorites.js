import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, Label } from 'formik'
import * as Yup from 'yup'
class Favorites extends Component {
  render() {
    return (
      <div>
        Favorites

          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Submit</button>
          <Link className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" to="/private">Cancel</Link>
        {/* </Form> */}
      </div>
    );
  }
}

export default Favorites;
