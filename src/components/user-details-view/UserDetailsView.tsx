import React, {ReactElement, useEffect, useState} from "react";
import styles from './UserDetailsView.module.scss'
import i18n from "../../i18n/i18n";
import GithubInfoService, {RepoInfo, UserDetails} from "../../services/GithubInfoService";
import RepoLink from "../repo-link/RepoLink";

type Props = {
    username: string
}

export default function UserDetailsView(props: Props): ReactElement {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [bestRepos, setBestRepos] = useState<RepoInfo[] | null>(null);

    useEffect(() => {
        if(props.username) {
            GithubInfoService.getUserDetails(props.username)
                .then(newUserDetails => setUserDetails(newUserDetails));
            GithubInfoService.getUserBestRepos(props.username)
                .then(reposInfo => setBestRepos(reposInfo));
        }
    }, [props.username]);

    if(!userDetails) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.wrapper}>
            <section className={styles.imageAndNameWrapper}>
                {userDetails.avatar_url &&
                <img src={userDetails.avatar_url} alt={i18n.userImage} className={styles.userImage}/>}
                <strong>{userDetails.name ?? i18n.noName}</strong>
            </section>

            <section className={styles.detailsSection}>
                <b className={styles.sectionHeader}>{i18n.about}</b>
                <div className={styles.about}>{userDetails.bio ?? i18n.noAbout}</div>
            </section>

            <section className={styles.detailsSection}>
                <b className={styles.sectionHeader}>{i18n.topRepositories}</b>
                {!bestRepos && <div>{i18n.loading}</div>}
                {bestRepos && bestRepos.map(repo => <RepoLink key={repo.name} repoInfo={repo}/>)}
            </section>
        </div>
    )
}