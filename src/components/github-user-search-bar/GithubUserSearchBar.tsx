import React, {ReactElement, useState} from "react";
import styles from './GithubUserSearchBar.module.scss'
import i18n from '../../i18n/i18n'
import {ReactComponent as SearchIcon} from "../../resources/SearchIcon.svg";

type Props = {
    onSearch: (userName: string) => void
}

export default function GithubUserSearchBar(props: Props): ReactElement {
    const [usernameToFind, changeUsername] = useState('');

    const onUsernameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeUsername(event.target.value);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchFieldWrapper}>
                <SearchIcon className={styles.searchFieldIcon}/>
                <input className={styles.searchField} placeholder={i18n.searchGithubUsers}
                       value={usernameToFind} onInput={onUsernameUpdate}/>
            </div>
            <button className={styles.searchButton}
                    onClick={() => props.onSearch(usernameToFind)}>{i18n.search}</button>
        </div>
    )
}