import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useState } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

export function Post({ author, publishedAt, content }) {
	// Mostrar os comentários existentes
	const [comments, setComments] = useState([
		{
			id: crypto.randomUUID(),
			text: "Muito bom Devon, parabéns!! 👏👏",
			userName: "Jean Carlo",
			applauseCount: 34,
			src: "https://github.com/antonyg.png",
		},
	]);

	// Inserir novos comentários
	const [newCommentText, setNewCommentText] = useState("");

	const handleNewCommentChange = (e) => {
		setNewCommentText(e.target.value);
	};

	const handleCreateNewComment = (e) => {
		e.preventDefault();
		// Imutabilidade -> ele vai inserir novos comentários referenciando os que já existem.
		const newComment = {
			id: crypto.randomUUID(),
			text: newCommentText,
			userName: "John Silverio",
			applauseCount: 0,
			src: "https://github.com/johnsilverio.png",
		};
		setComments([...comments, newComment]);
		setNewCommentText("");
	};

	const deleteComment = (commentIdToDelete) => {
		const commentsWithoutDeletedOne = comments.filter((comment) => {
			return comment.id !== commentIdToDelete;
		});
		setComments(commentsWithoutDeletedOne); // Imutabilidade
	};

	const publishedDateFormatted = format(
		publishedAt,
		"d 'de' LLLL 'às' HH:mm'h'",
		{
			locale: ptBR,
		}
	);

	const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});

	return (
		<article className={styles.post}>
			{/* Cabeçalho */}
			<header>
				<div className={styles.author}>
					<Avatar hasBorder src={author.avatarUrl} />
					<div className={styles.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>

				<time
					title={publishedDateFormatted}
					dateTime={publishedAt.toISOString()}
				>
					{publishedDateRelativeToNow}
				</time>
			</header>

			{/* Conteúdo */}
			<div className={styles.content}>
				{content.map((line) => {
					if (line.type === "paragraph") {
						return <p key={crypto.randomUUID()}>{line.content}</p>;
					} else if (line.type === "link") {
						return (
							<p key={crypto.randomUUID()}>
								<a href="#">{line.content}</a>
							</p>
						);
					}
				})}
			</div>

			{/* Form de Comentário*/}
			<form onSubmit={handleCreateNewComment} className={styles.commentForm}>
				<strong>Deixe seu feedback</strong>

				<textarea
					onChange={handleNewCommentChange}
					name="comment"
					value={newCommentText}
					placeholder="Deixe um comentário!"
				/>

				<footer>
					<button type="submit">Publicar</button>
				</footer>
			</form>

			{/*Comentários*/}
			<div className={styles.commentList}>
				{comments.map((comment) => {
					return (
						<Comment
							key={comment.id}
							userName={comment.userName} 
							applauseCount={comment.applauseCount} 
							commentText={comment.text} 
							src={comment.src} 
							onDeleteComment={deleteComment}
							commentId={comment.id} 
						/>
					);
				})}
			</div>
		</article>
	);
}
