import "./styles.css";

export default function ItemList({ title, description, html_url }) {
  return (
    <div className="item-list">
      <strong>{title}</strong>
      <p>{description}</p>
      <a href={html_url} target="_blank" rel="noreferrer">
        <span>Veja o projeto</span>
      </a>
      <hr />
    </div>
  );
}
