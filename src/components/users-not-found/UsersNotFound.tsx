import React, {ReactElement} from "react";
import i18n from "../../i18n/i18n";
import styles from "./UsersNotFound.module.scss"

const notFoundImageUrl = "https://bit.ly/3ioQEx7";

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