import React, {ReactElement} from "react";
import styles from "./RepoLink.module.scss";
import {RepoInfo} from "../../services/GithubInfoService";
import {ReactComponent as BooksIcon} from "../../resources/BooksIcon.svg";
import {ReactComponent as RepoLinkArrow} from "../../resources/LinkArrow.svg";
import i18n from "../../i18n/i18n";

export default function RepoLink(props: {repoInfo: RepoInfo}): ReactElement {
    return (
        <div className={styles.wrapper}>
            <div className={styles.nameWrapper}>
                <BooksIcon className={styles.repoIcon} role="presentation"/>
                <div>{props.repoInfo.name}</div>
            </div>
            <a href={props.repoInfo.html_url} target="_blank" rel="noopener noreferrer"
                title={i18n.linkToRepository + props.repoInfo.name}><RepoLinkArrow/></a>
        </div>
    );
}