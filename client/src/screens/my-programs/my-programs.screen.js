import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = themes => ({

})

class MyPrograms extends Component {
  render() {
    return (
      <div class="col s12">
        <ul class="collection">
          <li ngFor="let p of programs; let ix = index" class="collection-item">
            <div>
              <span click="loadProgram(p)">Name: {p.name}</span>
              <div class="secondary-content" click="removeProgram(ix)">
                <i class="material-icons">delete</i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default MyPrograms;