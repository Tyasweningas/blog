import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home-page';
import Login from './pages/login-page';
import Register from './pages/register-page';
import PostDetail from './pages/read-post-page';
import CreatePost from './pages/create-post-page';
import EditPost from './pages/edit-post-page';
import Profile from './pages/profile-page';
import PrivateRoute from './components/protected-route';

function Root() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Root;
