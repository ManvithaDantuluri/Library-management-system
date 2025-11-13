import React, { useEffect, useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import '../styles/pages.css'
import { getAllUsers, deleteUser } from '../services/userService'
import { AuthContext } from '../context/AuthContext'

export default function Users(){
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])

  useEffect(()=>{ getAllUsers().then(r=>setUsers(r.data)).catch(()=>{}) },[])

  if(!user?.roles?.includes('LIBRARIAN')) return (
    <div className="page-container"><Sidebar/><div className="main-area"><Topbar/><div className="page-content"><h1>Unauthorized</h1></div></div></div>
  )

  const remove = async (id) => { if(!confirm('Delete user?')) return; await deleteUser(id); setUsers(prev=>prev.filter(u=>u.id!==id)) }

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <div className="page-content">
          <h1>Users</h1>
          <div className="card">
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Roles</th><th></th></tr></thead>
              <tbody>
                {users.map(u=>(
                  <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{(u.roles||[]).join(', ')}</td>
                    <td><button className="btn" onClick={()=>remove(u.id)}>Delete</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
