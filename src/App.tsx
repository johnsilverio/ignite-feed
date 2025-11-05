import { Header } from "./components/Header.tsx";
import { Post } from "./components/Post.tsx";
import { Sidebar } from "./components/Sidebar.tsx";

import styles from "./App.module.css";
import "./global.css";

export interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

export interface Content {
  type: 'paragraph' | 'link' | 'hashtag';
  content: string;
}

export interface Post {
  id: string;
  author: Author;
  content: Content[];
  publishedAt: Date;
}

const posts: Post[] = [
  {
    id: '1',
    author: {
      avatarUrl: "https://github.com/german.png",
      name: "German Cano",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "👉 jane.design/doctorcare" },
      { type: "hashtag", content: "#novoprojeto" },
      { type: "hashtag", content: "#nl" },
      { type: "hashtag", content: "#rocketseat" }, // Implementar na mesma linha...
    ],
    publishedAt: new Date("2025-05-15 20:00:00"),
  },
  {
    id: '2',
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator",
    },
    content: [
      { type: "paragraph", content: "E aí, devs! 🚀" },
      {
        type: "paragraph",
        content:
          "Finalmente terminei meu app de streaming de música! Foram 3 semanas intensas de código, mas valeu cada linha. Interface clean, player responsivo e integração com Spotify API 🎵",
      },
      {
        type: "paragraph",
        content:
          "As funcionalidades que mais me orgulho: busca em tempo real, playlists personalizadas e modo offline. Next.js + TypeScript salvaram minha vida nesse projeto!",
      },
      { type: "link", content: "🎧 musicflow.vercel.app" },
      { type: "hashtag", content: "#frontend" },
      { type: "hashtag", content: "#nextjs" },
      { type: "hashtag", content: "#typescript" },
      { type: "hashtag", content: "#musicapp" },
    ],
    publishedAt: new Date("2025-11-01 23:12:00"),
  },
];

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>

        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                publishedAt={post.publishedAt}
                content={post.content}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
