import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";

//export const UserContext = createContext({});
export const UserContext = createContext<User | null>(null);

interface User {
  email: string;
  id: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state
  let emptyuser: User = { email: "", id: "" };

  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    // Get the cookie value
    let retryCount = 0; // initialize the retry count
    let maxRetries = 10; // set the maximum number of retries
    let delay: number = 1000; // set the delay in milliseconds

    // define a delay function that returns a promise
    function wait(delay: number) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    // define a fetch function that retries until status 200 or 401
    async function fetchWithRetry(url: string, options: any) {
      try {
        // make the fetch request
        let response = await fetch(url, options);

        // check the status code
        if (response.status == 200) {
          console.log("Authorized");
          let j: any = await response.json();
          setUser({ email: j.email, id: j.id });
          setAuthorized(true);
          return response; // return the response
        } else if (response.status == 401) {
          console.log("Unauthorized");
          return response; // return the response
        } else {
          // throw an error to trigger the catch block
          throw new Error("" + response.status);
        }
      } catch (error) {
        // increment the retry count
        retryCount++;
        // check if the retry limit is reached
        if (retryCount > maxRetries) {
          // stop retrying and rethrow the error
          throw error;
        } else {
          // wait for some time and retry
          await wait(delay);
          return fetchWithRetry(url, options);
        }
      }
    }

    // call the fetch function with retry logic
    fetchWithRetry("/pingauth", {
      method: "GET",
    })
      .catch((error) => {
        // handle the final error
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false); // set loading to false when the fetch is done
      });
  }, []);

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  } else {
    if (authorized && !loading) {
      return (
        <>
          <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
        </>
      );
    } else {
      return (
        <>
          <Navigate to="/login" />
        </>
      );
    }
  }
}

export function AuthorizedUser(props: { value: string }) {
  // Consume the username from the UserContext
  const user: any = React.useContext(UserContext);
  console.log(user);
  // Display the username in a h1 tag
  if (props.value == "email") return <>{user.email}</>;
  else if (props.value == "id") return <>{user.id}</>;
  else return <></>;
}

export default AuthorizeView;
