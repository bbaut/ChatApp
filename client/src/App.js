import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthLayout from './layouts/AuthLayout';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login.jsx';
import Register from './pages/Register';
import ProtectedRoute from './layouts/ProtectedRoute';
import Dashboard from './pages/Dashboard';
// import Contacts from './pages/Contacts';
import {AuthProvider} from './context/AuthProvider';
// import AddContact from './pages/AddContact';
import store from './redux/store';
// import Requests from './pages/Requests';
// import Chat from './pages/Chat';
// import Group from './pages/Groups';


const theme = createTheme({
  palette: {
    primary: {
      main: "#131324",
    },
    secondary: {
      main: "#00000076",
    },
    mode: "light",
  },
});


function App() {

  return (
    <ThemeProvider theme={theme}>
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
            {/* <Route path="contacts" element={<Contacts/>}/>
            <Route path="addcontact" element={<AddContact/>}/>
            <Route path="requests" element={<Requests/>}/>
            <Route path="chats" element={<Chat/>}>
              <Route path="chat/:chatId" element={<Chat/>}/>
            </Route>
            <Route path="groups" element={<Group/>}>
              <Route path="group/:chatId" element={<Chat/>}/>
            </Route> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </Provider>
    </ThemeProvider>
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
