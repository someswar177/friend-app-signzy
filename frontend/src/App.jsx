import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FriendRequestsPage from "./pages/FriendRequestsPage";
import NotFoundPage from "./pages/NotFoundPage";

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/friend-requests" element={<PrivateRoute><FriendRequestsPage /></PrivateRoute>} />            
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;
