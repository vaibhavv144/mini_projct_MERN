import React from 'react'
import AdminMenu from '../../component/La/AdminMenu'
import Layout from '../../component/La/Layout'

const Users = () => {
  return (
    <Layout>
       <div className='conatiner-flui m-3 p-3'> 
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/></div>
            <div className='col-md-9'>
                <h1>Users</h1>
            </div>
            </div> 
    </div>
 

</Layout>
  )
}

export default Users



