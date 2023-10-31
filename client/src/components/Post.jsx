export default function Post () {
    return (
        <article className="post-card">
            <div className="post-header">
                <img className="post-header-image" src="https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D" alt="Header Image" />
                <p className="post-header-text">Card Header Text</p>
            </div>
            <div>
            <img className="post-image" src="https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D" alt="Post Image" />
            </div>
            <div>
                <button>Test button</button>
                <button>Test button</button>
                <button>Test button</button>
            </div>
        </article>
    )
}