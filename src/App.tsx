import React, {ReactElement, useState} from 'react';
import GithubUserSearchBar from "./components/github-user-search-bar/GithubUserSearchBar";
import GithubInfoService, {UsersSearchResult} from "./services/GithubInfoService";
import UserDetailsView from "./components/user-details-view/UserDetailsView";
import UsersNotFound from "./components/users-not-found/UsersNotFound";

export default function App(): ReactElement {
    const [searchedUsername, changeSearchedUsername] = useState('');
    const [usernameForDetails, changeUserForDetails] = useState<string | null>(null);
    const [usersSearchResult, updateUsersSearchResult] = useState<UsersSearchResult | null>(null);

    const findUsers = (username: string) => {
        changeSearchedUsername(username);
        changeUserForDetails(null);
        updateUsersSearchResult(null);
        if(username) {
            GithubInfoService.findUsersByUsernameSearch(username)
                .then(result => updateUsersSearchResult(result));
        }
    }

    const renderFoundUsers = (): ReactElement => {
        if(usersSearchResult?.items?.length == 0) {
            return <UsersNotFound username={searchedUsername}/>
        }
        return <React.Fragment>
            {usersSearchResult?.items?.map(elem => {
                return <div key={elem.login} onClick={() => changeUserForDetails(elem.login)}>{elem.login}</div>
            })}
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <GithubUserSearchBar onSearch={findUsers}/>
            {usernameForDetails && <UserDetailsView username={usernameForDetails}/>}
            {!usernameForDetails && renderFoundUsers()}
        </React.Fragment>
    );
}
