import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [id, setId] = useState<string>("");
  const [username, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "Please enter a value in";

    if (!id || id === "") {
      isProceed = false;
      errorMessage += " Username";
    }
    if (!username || username === "") {
      isProceed = false;
      errorMessage += " Username";
    }
    if (!password || password === "") {
      isProceed = false;
      errorMessage += " Password";
    }
    if (!email || email === "") {
      isProceed = false;
      errorMessage += " Email";
    }

    if (!isProceed) {
      toast.warning(errorMessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isProceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isProceed;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let regObj = { id, username, password, email, phone, role };
    if (isValidate()) {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      ID <span className="errmsg">*</span>
                    </label>
                    <input
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      User Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone<span className="errmsg">*</span></label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Role <span className="errmsg">*</span>
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control"
                    >
                      <option value="1">User</option>
                      <option value="2">Staff</option>
                      <option value="3">Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>{" "}
              |
              <Link to={"/login"} className="btn btn-danger">
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
