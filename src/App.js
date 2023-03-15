import React, { useEffect, useState } from "react";
import {
	Routes,
	Route,
	Navigate,
  } from "react-router-dom";
import Login from "./pages/login";
import Success from "./pages/susses";

function App () {

	return (
	  <>
	  
		<Routes>
		  <Route path='/' element={<Login />} />
		  <Route path='/Success' element={<Success />} />

		</Routes>
	  </>
	);
  }
  
  export default App;
  