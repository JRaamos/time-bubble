
import React from 'react'; 

import { CoreState } from './CoreContext' 
import { AuthState } from './AuthContext' 

export default function AppContext({ children }) {  

  return (   
        <CoreState>
          <AuthState>  
              { children } 
          </AuthState>
        </CoreState> 
  );
}