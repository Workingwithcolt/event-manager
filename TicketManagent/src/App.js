import { useContext, useState } from "react";
import { Auth, AuthContext } from "./Auth";
import Dashboard from "./Components/userProfile/Dashboard";
import { LoginPage } from "./Components/userProfile/LoginPage";
import { LoginWithEmail } from "./Components/userProfile/LoginWithEmail";
import { auth } from "./FirebaseHelpers/firebase-config";
import { SignUpWithEmail } from "./Components/userProfile/SignUpWithEmail";
import { useNavigate } from "react-router-dom";
import Button from "./Components/GenericComponents/Button";

function App() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true)

  return (
    <> <Auth dashboard={<Dashboard />} login={
      <div className="flex justify-center items-center h-96">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {
            toggle ?
              <LoginWithEmail />
              : <SignUpWithEmail />
          }
          <Button
            buttonName={toggle ? "Go To Register" : "Go To Login"}
            type="button"
            onPress={() => setToggle(!toggle)}
          />

        </div>
      </div>
    }></Auth></>
  );
}

export default App;
