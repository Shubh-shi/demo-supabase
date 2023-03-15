import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from "react-router-dom";

const supabase = createClient(
   "https://gccbvmysnmhwvmsevsbv.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjY2J2bXlzbm1od3Ztc2V2c2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4NjY2ODYsImV4cCI6MTk5NDQ0MjY4Nn0.EM8tHXYHV3qlJokfgyYUbLwnuxhtgCEeECaumuSguRE"
    )
function Login () {
    let navigate = useNavigate();
    supabase.auth.onAuthStateChange(async (event) => {
if(event !== "SIGNED_OUT"){
    navigate("/Success");
}else{
    navigate("/");

}
})

	return (
	  <>
	  <div className='App'>
    
      <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="dark"
    providers={['github']}
  />

  </div>
	  </>
	);
  }
  
  export default Login;