import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import {AuthProvider} from "./context/AuthProvider"

function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUser());
  // },[dispatch])
  // const user = useSelector((state) => state);
  // console.log(user)


  return (
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

