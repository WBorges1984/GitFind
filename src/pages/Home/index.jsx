import { useState } from "react";
import background from "../../assets/background.svg";
import { Header } from "../../components/Header";
import ItemList from "../../components/ItemList";
import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [repos, setRepos] = useState([]);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();
      setRepos(newRepos);

      // if (!newRepos) {
      //   setRepos(newRepos);
      // }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background App" />
        <div className="info">
          <div>
            <input
              name="usuario"
              placeholder="@username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile"
                  alt="Foto de Perfil"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : (
            ""
          )}

          {repos?.length > 0 ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo) => (
                <>
                  <ItemList
                    key={repo.id}
                    title={repo.name}
                    description={repo.description}
                    html_url={repo.html_url}
                  />
                </>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default App;
