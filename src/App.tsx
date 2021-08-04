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
        GithubInfoService.findUsersByUsernameSearch(username)
            .then(result => updateUsersSearchResult(result));
    }

    const moveToDetails = (username: string) => {
        changeUserForDetails(username);
    }

    return (
        <div>
            <GithubUserSearchBar onSearch={findUsers}/>

            {usernameForDetails && <UserDetailsView username={usernameForDetails}/>}
            {!usernameForDetails &&
            <div>
                {usersSearchResult?.items?.map(elem => {
                    return <div key={elem.login} onClick={() => moveToDetails(elem.login)}>{elem.login}</div>
                })}
            </div>}
        </div>
    );
}
