import "./Card.css";

const renderWithLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = text.split(regex);

    return parts.map((part, i) => {
        if (i % 3 === 1) {
            const url = parts[i + 1];
            if (url == "/") {
                return <a key={i} href={url} rel="noopener noreferrer">
                    {part}
                </a>
            }
            return (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            );
        }
        if (i % 3 === 2) return null;
        return <span key={i}>{part}</span>;
    });
};

function Card({ title, elements }: { title: string, elements: { name: string, content: string, subtitle?: string, link?: string }[] }) {
    return (
        <div className="card">
            <div className="card-header">
                <img
                    className="avatar"
                    src="/portrait/pierre.jpg"
                    alt="Pierre Quereuil"
                />

                <div>
                    <h3 className="name">{title}</h3>

                    <ul className="links">
                        <li><a href="https://github.com/dubitable">GitHub</a></li>
                        <li><a href="https://www.linkedin.com/in/pierre-quereuil">LinkedIn</a></li>
                        <li><a href="https://docs.google.com/document/d/1thTzOxcV5SnmgqW7FAgDT1RiQYXXj_mMpNp-K4RIKvE/edit?usp=sharing">Resume</a></li>
                    </ul>
                </div>
            </div>

            <ul className="elements">
                {elements.map(({ name, content, subtitle, link }, index) => {
                    return (<li key={index}>
                        <div className="element">
                            {link ? <a style={{cursor: "pointer"}} target="_blank" href={link}><strong>{name}</strong></a> : <strong>{name}</strong>}
                            
                            {subtitle && <p className="subtitle">{subtitle}</p>}
                            {content.split("\n").map((elem, index) => {
                                return (<p key={index}>{renderWithLinks(elem)}</p>)
                            })}
                        </div>
                    </li>)
                })}

            </ul>
        </div>
    );
}

export default Card;