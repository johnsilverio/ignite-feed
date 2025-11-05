import { Avatar } from "./Avatar.tsx";
import { PencilLineIcon } from "@phosphor-icons/react";
import styles from "./Sidebar.module.css";

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<img
				className={styles.cover}
				src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=500"
			/>

			<div className={styles.profile}>
				<Avatar
					hasBorder
					src={"https://avatars.githubusercontent.com/u/71113138?v=4"}
				/>

				<strong>John Silverio</strong>
				<span>Web Developer</span>
			</div>

			<footer>
				<a className={styles.editarButton} href="#">
					<PencilLineIcon size={20} />
					Editar seu perfil
				</a>
			</footer>
		</aside>
	);
}
