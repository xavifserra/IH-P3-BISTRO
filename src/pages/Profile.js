import React, { Component } from 'react';

class Profile extends Component {
test =()=>{
  alert('test')
}

  render() {
    return (
      <div>
          Profile


<button id="add-to-favorites"
   class="mdc-icon-button"
   aria-label="Add to favorites"
   aria-hidden="true"
   aria-pressed="false"
   onClick={this.test}>
   <i className="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
   <i className="material-icons mdc-icon-button__icon">favorite_border</i>

</button>
<button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
  <i class="material-icons">add</i>
</button>
<button>

</button>

      </div>
    );
  }
}

export default Profile;
