import React, { useEffect, Fragment, useContext } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/githubContext";


function User( { match } ){

    const githubContext = useContext(GithubContext);

    const { getUser, loading, user, repos, getUserRepos } = githubContext;

    useEffect(() => {   //ComponenetDidMount Alternative when we use functional comp.
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []); // [] is used here because useEffect is continously requesting.


    const {name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable} = user;

        
    if(loading){
        return <Spinner />
    }else{
        return(
            <Fragment>
            <Link to="/" className="btn btn-light" >Back To Search</Link>
                Hireable: {""}
                {hireable ? (<i className="fas fa-check text-success" />) : (<i className="fas fa-times-circle text-danger" />) }
                    
                   
                <div className="card grid-2">
                    <div className="all-centre">
                        <img 
                            src={avatar_url} 
                            className="round-img" 
                            alt="" 
                            style={{width: "150px"}}
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>

                    <div>
                        {bio && 
                        <Fragment>
                            <h3>Bio:</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1">Visit GitHub Profile</a>
                        <ul>
                            <li>
                                {login && <> <strong>Username: </strong> {login} </>}
                            </li>
                            <li>
                                {company && <> <strong>Company: </strong> {company} </>}
                            </li>
                            <li>
                                {blog && <> <strong>Blog: </strong> {blog} </>}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="card text-centre">
                    <div className="badge badge-primary" style={{width: "200px"}}> Followers: {followers} </div>
                    <div className="badge badge-success" style={{width: "200px"}}> Following: {following} </div>
                    <div className="badge badge-light" style={{width: "200px"}}> Public Repos: {public_repos} </div>
                    <div className="badge badge-dark" style={{width: "200px"}}> Public Gists: {public_gists} </div>
                </div>

                <Repos repos={repos} />
            </Fragment>
        );
    }
    
}

export default User;