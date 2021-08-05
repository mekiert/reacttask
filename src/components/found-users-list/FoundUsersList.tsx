import React, {ReactElement, useEffect, useState} from "react";
import styles from './FoundUsersList.module.scss'
import GithubInfoService, {UserDetails, UsersSearchResult} from "../../services/GithubInfoService";
import {ReactComponent as LinkArrow} from "../../resources/LinkArrow.svg";
import i18n from "../../i18n/i18n";

type Props = {
    usersSearchResult: UsersSearchResult | null,
    onRedirectToUserDetails: (username: string) => void
}

const getUserDescription = (login: string, name: string | null) => {
    if(name) {
        return name + " - " + login;
    }
    return login;
}

export default function FoundUsersList(props: Props): ReactElement {
    const [usersDetails, setUserDetails] = useState<UserDetails[] | null>(null);

    useEffect(() => {
        if(props.usersSearchResult && props.usersSearchResult.items) {
            const promises = props.usersSearchResult.items.map(item => {
                return GithubInfoService.getUserDetails(item.login);
            })
            Promise.all(promises).then((values) => setUserDetails(values));
        }
    }, [props.usersSearchResult]);

    if(!props.usersSearchResult) {
        return <div>{i18n.loading}</div>;
    }

    const redirectToUserDetailsFun = (login: string) => () => props.onRedirectToUserDetails(login);

    const renderListElement = (user: UserDetails) => {
        return (
            <div key={user.login} className={styles.wrapper}>
                <div>{getUserDescription(user.login, user.name)}</div>
                <button className={styles.linkButton} title={i18n.detailsOfUser + user.login}
                        onClick={redirectToUserDetailsFun(user.login)}><LinkArrow/></button>
            </div>
        );
    }

    return <>{usersDetails?.map(elem => renderListElement(elem))}</>;
}