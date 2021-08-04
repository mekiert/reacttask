import React, {ReactElement, useState} from 'react';
import GithubUserSearchBar from "./components/github-user-search-bar/GithubUserSearchBar";
import GithubInfoService, {UsersSearchResult} from "./services/GithubInfoService";
import UserDetailsView from "./components/user-details-view/UserDetailsView";

export default function App(): ReactElement {
    const [usernameForDetails, changeUserForDetails] = useState<string | null>(null);
    const [usersSearchResult, updateUsersSearchResult] = useState<UsersSearchResult | null>(null);

    const findUsers = (username: string) => {
        changeUserForDetails(null);
        updateUsersSearchResult(null);
        if(username) {
            GithubInfoService.findUsersByUsernameSearch(username)
                .then(result => updateUsersSearchResult(result));
        }
    }

    return (
        <div>
            <GithubUserSearchBar onSearch={findUsers}/>

            {usernameForDetails && <UserDetailsView username={usernameForDetails}/>}
            {!usernameForDetails &&
            <div>
                {usersSearchResult?.items?.map(elem => {
                    return <div key={elem.login} onClick={() => changeUserForDetails(elem.login)}>{elem.login}</div>
                })}
            </div>}
        </div>
    );
}
