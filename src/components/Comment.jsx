import { ThumbsUpIcon, TrashIcon } from "@phosphor-icons/react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";
import { useState } from "react";

export function Comment({
	src,
	commentText,
	applauseCount,
	userName,
	onDeleteComment,
	commentId,
}) {
	const [localApplauseCount, setApplauseCount] = useState(applauseCount);

	const handleDeleteComment = () => {
		onDeleteComment(commentId);
	};

	const handleApplauseComment = () => {
		setApplauseCount((state) => {
			return state + 1;
		});
	};

	return (
		<div className={styles.comment}>
			<Avatar hasBorder={false} src={src} />
			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>{userName}</strong>
							<time title="11 de Maio às 8:13" dateTime="2025-05-11 08:13:30">
								Cerca de 1h atrás
							</time>
						</div>
						<button onClick={handleDeleteComment} title="Deletar comentário">
							<TrashIcon size={24} />
						</button>
					</header>

					<p>{commentText}</p>
				</div>
				<footer>
					<button onClick={handleApplauseComment}>
						<ThumbsUpIcon />
						Aplaudir <span>{localApplauseCount}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
