import React from "react";
const validateEmail = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "Muthu",
      emailId: "@gmail.com",
      terms: true,
      errors: {
        fullName: "",
        emailId: "",
        terms: "",
      },
    };
  }

  //bind all to handleChange to common function:

  // onChange({(event)=>{this.setState{fullName:this.state.value}}})
  // name should be same to value;
  handleChange = ({ target: { name, value, type, checked } }) => {
    // console.log(name, value, checked);
    if (type === "checkbox") value = checked; // terms are checked are not.
    //copy of errors :
    const errors = this.state.errors;

    switch (name) {
      case "fullName": {
        if (value.length <= 5) {
          errors.fullName = "should be atleast 6 chars..";
        } else {
          errors.fullName = "";
        }
        break;
      }
      case "emailId": {
        if (value.length < 7) {
          errors.emailId = "should be min 7 chars...";
        } else if (!validateEmail.test(value)) {
          errors.emailId = "invalid email id";
        } else {
          errors.emailId = "";
        }

        break;
      }
      case "terms": {
        if (!value) {
          errors.terms = "term should be accepted";
        } else {
          errors.terms = "";
        }
        break;
      }
    }
    console.log(errors);

    this.setState({ [name]: value, errors });
    // console.log(name, value, type);
  };
  //submit

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <>
        <h1> Basic Form validation using React </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Full Name :</label>
            <input
              name="fullName"
              type="text"
              onChange={this.handleChange}
              value={this.state.fullName}
            ></input>
            <span>{this.state.errors.fullName}</span>
          </div>
          <div>
            <label>E-mail :</label>
            <input
              name="emailId"
              type="email"
              onChange={this.handleChange}
              value={this.state.emailId}
            />
            <span>{this.state.errors.emailId}</span>
          </div>
          <br />

          <div>
            <input
              name="terms"
              type="checkbox"
              checked={this.state.terms}
              onChange={this.handleChange}
            />

            <label> Terms&Conditions</label>
            <span>{this.state.errors.terms}</span>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    );
  }
}

export default App;
