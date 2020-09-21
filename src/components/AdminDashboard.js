import React, { useEffect, useState } from 'react';
import { Card, Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import toast from 'toastr';
import { navigate } from "hookrouter";
import jwt from 'jsonwebtoken';

toast.options = {
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
}

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(!localStorage.jwtToken) {
      toast.error('You have to signin or signup to access that page')
      return navigate('/')
    }
   const isAdmin = jwt.decode(localStorage.jwtToken)
    if(isAdmin.role !== 'Admin') {
      toast.error('Only an admin can access that page')
      return navigate('/')
    }
    
    const fetchProfile = async () => {
      const response = 
        await axios.get(`https://user-system-backend.herokuapp.com/api/v1/users?token=${localStorage.jwtToken}`);
        setUsers(response.data.data);
    };
    fetchProfile() ;
  }, []);

  const fetchProfile = async () => {
    const response = 
      await axios.get(`https://user-system-backend.herokuapp.com/api/v1/users?token=${localStorage.jwtToken}`);
      setUsers(response.data.data);
  };


  const handleChangeRole = async (id, role) => {
    const updateRole = role === 'User' ? 'Admin' : 'User';
    await axios.put(`https://user-system-backend.herokuapp.com/api/v1/update-role/${id}?token=${localStorage.jwtToken}`, {role: updateRole});
    toast.success('Role updated');
    await fetchProfile();
    }

    const handleSuspendAccount = async (id, accountStatus) => {
      const status = accountStatus === 'Active' ? 'Suspended' : 'Active';
      await axios.put(`https://user-system-backend.herokuapp.com/api/v1/suspend-account/${id}?token=${localStorage.jwtToken}`, { accountStatus: status });
      toast.success('Account  Suspended');
      await fetchProfile();
      }
  
  return(
  <>
        <Card.Header style={{ 
        textAlign: 'center',
          fontSize: '30px', 
          border: '1px solid #F8F8F8',
          marginBottom: '50px'
          }}>
          Admin Dashboard</Card.Header>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Card
            text="'white"
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header style={{ textAlign: 'center' }}>Total Account: {users.length}</Card.Header>
          </Card>

          <Card
            text="'white"
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header style={{ textAlign: 'center' }}>Total Users:  {users.filter(user => user.role !== 'Admin').length}  
            </Card.Header>
          </Card>
          <Card
            text="'white"
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header style={{ textAlign: 'center' }}>Total Admins: {users.filter(user => user.role === 'Admin').length}</Card.Header>
          </Card>
        </div>

      <Table hover striped size="sm" 
            style={{ border: '6px solid #ECECEC', width: '50% !important'}}>
      <thead style={{whiteSpace: 'nowrap', fontSize: '15px'}}>
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone No</th>
          <th>Address</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Role</th>
          <th>Account Status</th>
          <th>Date Joined</th>      
          <th>Action</th>
        </tr>
      </thead>
      <tbody style={{fontSize: '15px'}}>
        {
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
              <td>{user.accountStatus}</td>
              <td>{user.createdAt.split("T")[0]}</td>
              <td>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleChangeRole(user.id, user.role)}>{ user.role === 'Admin' ? 'Downgrade to a User' 
                          : 'Upgrade to an Admin'
                    }</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSuspendAccount(user.id, user.accountStatus)}>{user.accountStatus === 'Suspended' ? 'Activate' : 'Suspend'} account</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </td>

            </tr>
          ))
        }
      </tbody>
    </Table>
  </>
  )
};

export default AdminDashboard;