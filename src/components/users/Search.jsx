import React, { useContext, useState } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";


function Search(){

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState("");
    
    function handleChange(event){
        setText(event.target.value);
    }

    function onSubmit(event){
        event.preventDefault();
        if(text === ""){
            alertContext.setAlert("Please Enter Something","danger");
        }else{
            githubContext.searchUsers(text)
            setText("");
        }
    }

    return(
        <div>
            <form  onSubmit={onSubmit} className="d-grid gap-2">
                <input type="text" value={text} onChange={handleChange} placeholder="Search Users......" className="form-control form-control-sm"/>
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            <div className="d-grid gap-2">
                {githubContext.users.length > 0 && <button className="btn btn1" onClick={githubContext.clearUsers} type="button">Clear</button> }
            </div>
        </div>
    );

}



export default Search;