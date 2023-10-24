import { formatedPublishedAt } from "../lib/dates";
import styles from "./PostHeader.module.scss";

export default function PostHeader({
  title,
  date,
  updated,
}: {
  title: string;
  date: string;
  updated: string;
}) {
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