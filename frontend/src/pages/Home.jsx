import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserCircle, Search, LogOut } from "lucide-react";
import axios from 'axios';
const HomePage = () => {
  // // Use navigate hook for redirection
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '' });
  const [notifications] = useState([
    { id: 1, text: "New message from Sarah", time: "2 min ago" },
    { id: 2, text: "Meeting reminder: Team sync", time: "1 hour ago" }
  ]);

  const quickActions = [
    
    { 
      icon: <LogOut size={20} color="red" />, // Red icon
      label: "Logout",
      labelClass: "text-red-500" // Custom class for red label
    }
  ];
 
  const fetchUserData = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/details/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            setUser({
                username: response.data.name,
                email: response.data.email
            });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('jwtToken');
            navigate('/');
        }
    }
};

// Update your useEffect to use this new function
useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        fetchUserData(token);
    }
}, [navigate]);
  

  // Handle logout functionality
  async function handleLogout() {
    // Get the token (if needed for other purposes before logout)
    const token = localStorage.getItem('jwtToken');

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/logout/');

        if (response.status === 200) {
            // Remove the token from localStorage after a successful logout
            localStorage.removeItem('jwtToken');
            
            // Optionally, you can also remove any other session data
            // localStorage.removeItem('anotherKey');

            // Handle success (e.g., show message, redirect to login)
            navigate('/');
            // Optionally redirect to the login page
            
        } else {
            // Handle error
            alert(response.data.error || 'An error occurred during logout');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('An unexpected error occurred');
    }
}


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">

            <h1 className="text-2xl font-bold text-gray-800">onlyNotes</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Profile</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserCircle className="h-10 w-10 text-blue-600" />
                    </div>
                    <div>
                    <h3 className="font-semibold">{user.username || 'Loading...'}</h3>
                    <p className="text-sm text-gray-500">{user.email || 'Loading...'}</p>
                    </div>
                  </div>
                  <nav className="space-y-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start gap-3"
                        onClick={action.label === 'Logout' ? handleLogout : undefined} // Attach the handleLogout to the Logout button
                      >
                        {action.icon}
                        <span className={action.labelClass}>{action.label}</span>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
       
      </main>
    </div>
  );
};

export default HomePage;
