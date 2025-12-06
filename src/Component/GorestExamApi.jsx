import axios from "axios";
import React, { Component } from "react";

export class GorestExamApi extends Component {
  constructor() {
    super();
    this.state = {
      obj: {},
      blankObj: {},
      userData: [],
    };
  }
  auth = {
    headers: {
      Authorization:
        "Bearer e9d029ce111f4a155f37635f67ebe03e2e0cf2edf69326699ed9cac8a6fc09af",
    },
  };

  inpChange = (e) => {
    this.state.obj[e.target.name] = e.target.value;
    this.state.blankObj[e.target.name] = "";
    this.setState({ ...this.state });
  };

  getUserData = () => {
    axios.get("https://gorest.co.in/public/v2/users", this.auth).then((res) => {
      this.setState({ userData: [...res.data] });
      console.log(res);
    });
  };
  componentDidMount() {
    this.getUserData();
  }
  btnSumit = () => {
    if (this.state.obj.id) {
      axios
        .patch(
          `https://gorest.co.in/public/v2/users/${this.state.obj.id}`,
          this.state.obj,
          this.auth
        )
        .then((res) => {
          this.getUserData();
        });
    } else {
      this.state.userData.push(this.state.obj);
      axios
        .post("https://gorest.co.in/public/v2/users", this.state.obj, this.auth)
        .then((res) => {
          this.getUserData();
        });
    }
    this.state.obj = { ...this.state.blankObj };
    this.setState({ ...this.state });
  };

  btnEdit = (id) => {
    let Edit = this.state.userData.find((x) => x.id == id);
    this.setState({ obj: { ...Edit } });
  };
  btnDelete = (id) => {
    if (window.confirm("Are You Sure You Want To Delete")) {
      axios
        .delete(`https://gorest.co.in/public/v2/users/${id}`, this.auth)
        .then((res) => {
          this.getUserData();
        });
    }
  };
  render() {
    // console.log(this.state.obj)
    return (
      <>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <div>GorestExamApi</div>

        <form>
          <div>
            Name:
            <input
              type="text"
              name="name"
              onChange={this.inpChange}
              value={this.state.obj.name ?? ""}
            />
          </div>{" "}
          <div>
            Email:
            <input
              type="email"
              name="email"
              onChange={this.inpChange}
              value={this.state.obj.email ?? ""}
            />
          </div>{" "}
          <div>
            Gender:
            <input
              type="radio"
              name="gender"
              onChange={this.inpChange}
              value="male"
              checked={this.state.obj.gender == "male"}
            />
            Male
            <input
              type="radio"
              name="gender"
              onChange={this.inpChange}
              value="female"
              checked={this.state.obj.gender == "female"}
            />
            Female
          </div>{" "}
          <div>
            Status:
            <input
              type="radio"
              name="status"
              onChange={this.inpChange}
              value="active"
              checked={this.state.obj.status == "active"}
            />
            Active
            <input
              type="radio"
              name="status"
              onChange={this.inpChange}
              value="inactive"
              checked={this.state.obj.status == "inactive"}
            />
            Inactive
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.btnSumit}
          >
            Submit
          </button>
        </form>

        <table className="table-fixed">
          <caption class="caption-bottom">table</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userData?.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.gender}</td>
                  <td>{x.status}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={() => {
                        this.btnEdit(x.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        this.btnDelete(x.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default GorestExamApi;
