import React, {ReactElement} from "react";
import styles from "./RepoLink.module.scss";
import {RepoInfo} from "../../services/GithubInfoService";

export default function RepoLink(props: {repoInfo: RepoInfo}): ReactElement {
    return (
        <div className={styles.wrapper}>
            <div>{props.repoInfo.name}</div>
            <a href={props.repoInfo.html_url} target="_blank" rel="noopener noreferrer">{">"}</a>
        </div>
    );
}