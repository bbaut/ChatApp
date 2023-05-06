import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import {AuthProvider} from "./context/AuthProvider"
import AddContact from "./pages/AddContact";
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <Provider  store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout/>}>
              <Route index element ={<Login/>} />
              <Route path="register" element={<Register/>}/>
          </Route>
          <Route path="/dashboard" element={ <ProtectedRoute/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="contacts" element={<Contacts/>}/>
            <Route path="addcontact" element={<AddContact/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </Provider>
  );
}

export default App;



// function App() {

//   return (
//     <Provider  store={store}>
//     <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/register" element={<Register/>}/>
//           <Route path="/dashboard" element={ <Dashboard/>}>
//             <Route path="contacts" element={<Contacts/>}/>
//             <Route path="addcontact" element={<AddContact/>}/>
//           </Route>
//         </Routes>
//     </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;
