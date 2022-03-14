import { CSSProperties, useEffect, useState } from "react";
import "./App.css";

const getJSON = (url: string) => fetch(url).then((r) => r.json());

const styles: Record<string, CSSProperties> = {
  code: {
    color: "red",
    fontWeight: 500,
  },
  emphasis: {
    fontStyle: "italic",
    fontWeight: 400,
  },
};

export function App() {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const [favorites, extracted] = await Promise.all([
          getJSON("/api/bookmarks"),
          getJSON("/api/extract?url=https://rogalabs.com"),
        ]);

        setBookmarks(favorites.concat(extracted));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <pre className="info">Carregando metadados...</pre>
      </div>
    );
  }

  return (
    <div className="App">
      <h3>
        Metadados carregados do banco local <small style={styles.code}>json-server</small>{" "}
        <small style={styles.emphasis}>(/api/bookmarks)</small> e do endpoint{" "}
        <small style={styles.code}>/api/extract</small>
      </h3>
      <pre className="info">{JSON.stringify(bookmarks, null, 2)}</pre>
    </div>
  );
}
