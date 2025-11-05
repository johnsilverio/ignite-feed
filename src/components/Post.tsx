import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useState, type ChangeEvent, type FormEvent, type InvalidEvent } from "react";

import { Avatar } from "./Avatar.tsx";
import { Comment } from "./Comment.tsx";
import type { Author, Content } from "../App.tsx";

import styles from "./Post.module.css";

interface Comment {
	id: string;
	text: string;
	userName: string;
	applauseCount: number;
	src: string;
}

interface PostProps {
	author: Author;
	publishedAt: Date;
	content: Array<Content>;
}

export function Post({ author, publishedAt, content }: PostProps) {
	// Mostrar os comentários existentes
	const [comments, setComments] = useState<Comment[]>([
		{
			id: crypto.randomUUID(),
			text: "Muito bom, parabéns!! 👏👏",
			userName: "Jean Carlo",
			applauseCount: 38,
			src: "https://github.com/jeancarlo217.png",
		},
	]);

	// Inserir novos comentários
	const [newCommentText, setNewCommentText] = useState<string>("");

	const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		e.target.setCustomValidity("");
		setNewCommentText(e.target.value);
	};

	const handleNewCommentInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
		e.target.setCustomValidity("Esse campo é obrigatório");
	};

	const handleCreateNewComment = (e: FormEvent) => {
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

	const deleteComment = (commentIdToDelete: string) => {
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

	const isNewCommentEmpty = newCommentText.length === 0;

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
					} else if (line.type === "hashtag") {
						return (
							<a key={crypto.randomUUID()} href="#">{line.content} </a>
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
					onInvalid={handleNewCommentInvalid}
					required
				/>

				<footer>
					<button type="submit" disabled={isNewCommentEmpty}>
						Publicar
					</button>
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
