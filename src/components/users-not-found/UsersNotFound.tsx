import React, {ReactElement} from "react";
import i18n from "../../i18n/i18n";
import styles from "./UsersNotFound.module.scss"

const notFoundImageUrl = "https://assets.website-files.com/5e8ae8528a0cee2cce869a1f/601e9a073ee698765abdbfc6_cole-no-messages.svg";

type Props = {
    username: string
}

export default React.memo(function UsersNotFound(props: Props): ReactElement {
    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <b>{i18n.cannotFindUser}</b>
                <b>{props.username}</b>
            </div>
            <img src={notFoundImageUrl} alt={undefined} role="presentation" className={styles.notFoundImage}/>
        </div>
    );
})