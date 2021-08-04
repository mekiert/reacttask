import React, {ReactElement} from "react";
import styles from './GithubUserSearchBar.module.scss'
import i18n from '../../i18n/i18n'

type Props = {
    onSearch: (userName: string) => void
}

export default function GithubUserSearchBar(props: Props): ReactElement {
    return (
        <div className={styles.searchField}>
            <input/>
            <button onClick={() => props.onSearch('abc')}>{i18n.search}</button>
        </div>
    )
}