// import React, {useState} from 'react';
// import axios from "axios";
// import { API_BASE_URL } from "../../constants/apiConstants";
// import { useHistory } from "react-router-dom";
// import AuthContext from "../../navigation/AuthContext";

// export default function RegistrationForm(props) {
//     const history = useHistory();

//     const [state , setState] = useState({
//         email : "",
//         password : "",
//         confirmPassword: "",
//         successMessage: null
//     });

//     const handleChange = (e) => {
//         const {id , value} = e.target   
//         setState(prevState => ({
//             ...prevState,
//             [id] : value
//         }));
//     };

//     const sendDetailsToServer = (updateAuth) => {
//         if (state.username.length && state.email.length && state.password.length) {
//           const payload = {
//             email: state.email,
//             password: state.password,
//           };
    
//           axios
//             .post(
//               API_BASE_URL +
//                 "/users/" +
//                 state.username +
//                 "/" +
//                 state.email +
//                 "/" +
//                 state.password,
//               payload
//             )
//             .then(function (response) {
//               if (response.status === 200) {
//                 setState((prevState) => ({
//                   ...prevState,
//                   successMessage:
//                     "Registration successful. Redirecting to home page..",
//                 }));
//                 updateAuth(true, state.email, state.username);
//                 redirectToHome();
//               }
//             })
//             .catch(function (error) {
//               if (error.response.status === 400) {
//                 alert("Username or email already exists. Please try again");
//               } else if (error.response.status === 500) {
//                 alert("Email already exists. Please try again");
//               }
//             });
//         } else {
//           props.showError("Please enter valid username and password");
//         }
//       };

//     const handleSubmitClick = (e) => {
//         e.preventDefault();
//         if(state.password === state.confirmPassword) {
//             sendDetailsToServer()    
//         } else {
//             props.showError('Passwords do not match');
//         }
//     }

//   return(
//         <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
//             <form>
//                 <div className="form-group text-left">
//                 <label htmlFor="exampleInputEmail1">Email address</label>
//                 <input type="email" 
//                        className="form-control" 
//                        id="email" 
//                        aria-describedby="emailHelp" 
//                        placeholder="Enter email"
//                        value={state.email}
//                        onChange={handleChange}
//                 />
//                 <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                 </div>
//                 <div className="form-group text-left">
//                     <label htmlFor="exampleInputPassword1">Password</label>
//                     <input type="password" 
//                         className="form-control" 
//                         id="password" 
//                         placeholder="Password"
//                         value={state.password}
//                         onChange={handleChange} 
//                     />
//                 </div>
//                 <div className="form-group text-left">
//                     <label htmlFor="exampleInputPassword1">Confirm Password</label>
//                     <input type="password" 
//                         className="form-control" 
//                         id="confirmPassword" 
//                         placeholder="Confirm Password"
//                     />
//                 </div>
//                 <button 
//                     type="submit" 
//                     className="btn btn-primary"
//                     onClick={handleSubmitClick}
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//     )
// }