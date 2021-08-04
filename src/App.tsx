import React, {ReactElement} from 'react';
import GithubUserSearchBar from "./components/github-user-search-bar/GithubUserSearchBar";

export default function App(): ReactElement {
    const findUsers = (username: string) => {
        console.log(username);
    }

    return (
        <div>
            <GithubUserSearchBar onSearch={findUsers}/>
        </div>
    );
}
