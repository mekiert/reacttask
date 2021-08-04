import React, {ReactElement, useState} from 'react';
import GithubUserSearchBar from "./components/github-user-search-bar/GithubUserSearchBar";
import GithubInfoService, {UsersSearchResult} from "./services/GithubInfoService";
import UserDetailsView from "./components/user-details-view/UserDetailsView";
import UsersNotFound from "./components/users-not-found/UsersNotFound";
import FoundUsersList from "./components/found-users-list/FoundUsersList";

export default function App(): ReactElement {
    const [searchedUsername, changeSearchedUsername] = useState('');
    const [usersSearchResult, updateUsersSearchResult] = useState<UsersSearchResult | null>(null);
    const [usernameForDetails, changeUserForDetails] = useState<string | null>(null);

    const findUsers = (username: string) => {
        changeSearchedUsername(username);
        changeUserForDetails(null);
        updateUsersSearchResult(null);
        if(username) {
            GithubInfoService.findUsersByUsernameSearch(username)
                .then(result => updateUsersSearchResult(result));
        }
    }

    const showUserDetails = (username: string) => {
        changeUserForDetails(username);
    }

    const renderFoundUsers = (): ReactElement | null => {
        if(!searchedUsername) {
            return null;
        }
        if(usersSearchResult?.items?.length == 0) {
            return <UsersNotFound username={searchedUsername}/>
        }
        return <FoundUsersList usersSearchResult={usersSearchResult} onRedirectToUserDetails={showUserDetails}/>
    }

    return (
        <React.Fragment>
            <GithubUserSearchBar onSearch={findUsers}/>
            {usernameForDetails && <UserDetailsView username={usernameForDetails}/>}
            {!usernameForDetails && renderFoundUsers()}
        </React.Fragment>
    );
}
