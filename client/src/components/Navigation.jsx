export default function Navigation() {
  return (
    <nav className="navigation">
        <ul className="navigation links">
          <li>
            <a>
              <div className="navigation title">Travel Log</div>
            </a>
          </li>
          <div className="navigation icons">
            <a>
              <li className="navigation add">
                <span
                 
                  className="material icons md-light"
                >
                  add
                </span>
              </li>
            </a>
            <a>
              <li>
                <span
                  className="material icons"
                >
                  home
                </span>
              </li>
            </a>
            <a> 
              <li>
                <span className="material icons">dashboard</span>
              </li>
            </a>
            <li>
              <a>
                <span className="material icons">account_circle</span>
              </a>
            </li>
          </div>
        </ul>
    </nav>
  );
}
