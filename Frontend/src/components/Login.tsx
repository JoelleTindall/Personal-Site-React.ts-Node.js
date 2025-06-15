import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // state variables for user and pass
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // state variable for error messages
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  // handle submit event for the form
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    fetch("/api/generateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();

        const token = data.token;
        localStorage.setItem("token", token);  

        navigate("/admin");
      })
      .catch((error) => {
        console.error(error);
        setError("Error logging in.");
      });
  };

  return (
    <div className="containerbox">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label className="forminput" htmlFor="username">
            Username:
          </label>
        </div>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
