import React, { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from "react-router-dom";
import { object } from "prop-types";
import '../App.css';
const supabase = createClient(
   "https://gccbvmysnmhwvmsevsbv.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjY2J2bXlzbm1od3Ztc2V2c2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4NjY2ODYsImV4cCI6MTk5NDQ0MjY4Nn0.EM8tHXYHV3qlJokfgyYUbLwnuxhtgCEeECaumuSguRE"
    )
function Success () {
const [nuser ,setNUser]=useState({});
let navigate = useNavigate();
useEffect (()=> {
async function getUserData () {

    await supabase.auth.getUser().then((value) => {
        if(value.data?.user){
            console.log(value.data.user);
            setNUser(value.data.user)
        }

    })
}
getUserData();
fetchUsers();
}, [])
async function singOutUser () {
    const {error}  = await supabase.auth.signOut();
    navigate("/");
}
const [users,setUsers]=useState([])

  const [user,setUser]=useState({
    name:'',age:''
  })

  const [user2,setUser2]=useState({
    id:'',name:'',age:''
  })



  console.log(user2)



  

  async function fetchUsers(){
    const {data} = await supabase
      .from('newusers')
      .select('*')
      setUsers(data)



  }

  function handleChange(event){
    
    setUser(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  function handleChange2(event){
    
    setUser2(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function createUser () {
   const {error }= await supabase
    .from('newusers')
    .insert({ name: user.name, age: user.age })
   
  fetchUsers()    


  }

  async function deleteUser(userId){

    const { data, error } = await supabase
      .from('newusers')
      .delete()
      .eq('id', userId)

    fetchUsers()
    
    
    if (error){
      console.log(error)
    }

    if (data){
      console.log(data)
    }




  }

   function displayUser(userId){

    users.map((user)=>{

        if(user.id==userId){
          setUser2({ id:user.id,name:user.name,age:user.age})
        }
      



    })

   }


   async function updateUser(userId){

    const { data, error } = await supabase
      .from('newusers')
      .update({ id:user2.id,name:user2.name,age:user2.age})
      .eq('id', userId)

      fetchUsers()



      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }


   }

	return (
<div className="App">
	  { Object.keys(nuser).length !==0 ? 
      <>
      	<h2>Success</h2>
    <button onClick={()=>singOutUser()}>Logout</button>
    <div>

{/* FORM 1 */}
<form onSubmit={createUser}>
  <input 
    type="text"
    placeholder="Name"
    name='name'
    onChange={handleChange}
  
  />
  <input 
    type="number"
    placeholder="Age"
    name='age'
    onChange={handleChange}
  
  />
  <button type='submit'>Create</button>

</form>

<form onSubmit={()=>updateUser(user2.id)}>
        <input 
          type="text"
          name='name'
          onChange={handleChange2}
          defaultValue={user2.name}
        
        />
        <input 
          type="number"
          name='age'
          onChange={handleChange2}
          defaultValue={user2.age}

        
        />
        <button type='submit'>Save Changes</button>

      </form>





<table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Age</th>
      <th>Actions</th>

    </tr>
  </thead>

  <tbody>
    {users.map((user)=>
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>
          <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
          <button onClick={()=>{displayUser(user.id)}}>Edit</button>
        
        </td>

      </tr>
    )}
  </tbody>
</table>
</div>
      </>
      :
      <>
      <h2>User is not Logged in</h2>
   <button onClick={()=>{  navigate("/")}}>Go Back</button>
  </>
    }

</div>
	
	);
  }
  
  export default Success;