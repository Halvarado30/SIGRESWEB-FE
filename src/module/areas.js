import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
const baseUrl = "http://839cb0c8.ngrok.io";

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listArea: []
    };
  }

  componentDidMount() {
    this.loadArea();
  }

  loadArea() {
    const url = baseUrl + "/area/list";
    axios
      .get(url)
      .then(res => {
        const data = res.data;
        this.setState({ listArea: data });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div class="form-group col-md-6">
        <label for="inputState">Areas: </label>

        <select id="inputState" class="form-control">
          {this.loadFillData()}
        </select>
      </div>
    );
  }

  loadFillData() {
    return this.state.listArea.map(data => {
      return <option key={data.id}>{data.Area}</option>;
    });
  }
}

export default EditComponent;
