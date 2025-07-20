import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import PostList from './pages/PostList'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Navbar from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              } />
              <Route path="/signup" element={
                <PublicOnlyRoute>
                  <Signup />
                </PublicOnlyRoute>
              } />
              
              {/* Protected routes */}
              <Route path="/posts" element={
                <ProtectedRoute>
                  <PostList />
                </ProtectedRoute>
              } />
              <Route path="/posts/:postId" element={
                <ProtectedRoute>
                  <PostDetail />
                </ProtectedRoute>
              } />
              <Route path="/logout" element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              } />
              
              {/* Home has special handling - public but shows different content when logged in */}
              <Route path="/" element={<Home />} />
              
              {/* 404 page */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App