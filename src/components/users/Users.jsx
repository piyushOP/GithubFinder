import React, { useContext } from "react";
import UserItem from "./UserItems";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

function Users(){  

    const githubContext = useContext(GithubContext);

    const {loading, users} = githubContext;

    if(loading){
        return <Spinner />
    }else{
        return(
            
            <div className="row row-cols-4 justify-content-md-center" >
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }

}



export default Users;