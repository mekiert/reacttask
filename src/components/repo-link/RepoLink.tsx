import React, {ReactElement} from "react";
import styles from "./RepoLink.module.scss";
import {RepoInfo} from "../../services/GithubInfoService";
import {ReactComponent as BooksIcon} from "../../resources/BooksIcon.svg";
import {ReactComponent as RepoLinkArrow} from "../../resources/RepoLinkArrow.svg";

export default function RepoLink(props: {repoInfo: RepoInfo}): ReactElement {
    return (
        <div className={styles.wrapper}>
            <div className={styles.nameWrapper}>
                <BooksIcon className={styles.repoIcon}/>
                <div>{props.repoInfo.name}</div>
            </div>
            <a href={props.repoInfo.html_url} target="_blank" rel="noopener noreferrer"><RepoLinkArrow/></a>
        </div>
    );
}