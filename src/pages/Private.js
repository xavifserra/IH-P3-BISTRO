import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import Map from '../components/Map/Map';
import ListPlaces from '../components/ListPlaces/ListPlaces';
class Private extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        {/* <div class='col12 pad4 contain fill-navy dark clip'>
        <div class='center quiet'>Map Canvas</div>
        <div class='pin-right pad2'>
          <a href='#step-4' class='button'>Trigger</a>
        </div>
        <div id='step-4' class='col4 pad2 fill-darken1 pin-left offcanvas-left animate'>
          <a href='#' class='fill-darken2 pad1 icon close'></a>

            <div class='col10 margin1 keyline-all round space-bottom'>
              <div class='pad1y pad2x keyline-bottom'>Explore the ship</div>
              <div class='pad1y pad2x keyline-bottom'>Eat my gross space lunch</div>
              <div class='pad1y pad2x keyline-bottom'>Play gravity ball</div>
              <div class='pad1y pad2x keyline-bottom'>Send out a space prank to friends</div>
              <div class='pad1y pad2x'>Finsh this todo list</div>
            </div>

            <fieldset class='margin3 col6 pill clearfix'>
              <input type='text' class='col8' placeholder='List item name'/>
              <a href='#' class='button col4 icon plus submit'>Add item</a>
            </fieldset>
        </div>
      </div> */}
        <Map/>
        <ListPlaces/>
      </div>
    )
  }
}

export default withAuth()(Private);
