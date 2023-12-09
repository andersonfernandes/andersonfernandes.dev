import { formatedPublishedAt } from "../../lib/dates";
import styles from "./PostHeader.module.scss";

type Props = {
  title: string;
  date: string;
  updated: string;
};

export default function PostHeader({ title, date, updated }: Props) {
  return (
    <div className={styles["post-header"]}>
      <div className={styles.date}>
        {updated
          ? `Updated at ${formatedPublishedAt(updated)}`
          : `Created at ${formatedPublishedAt(date)}`}
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
