import { Link } from "@tanstack/router";
import { Header1 } from "../components/Header.component";

function Home() {
  return (
    <div>
      <Header1>Home</Header1>

      <div className="flex justify-center my-6">
        <ul className="flex flex-col gap-3">
          <li>
            <Link to="/posts">01. Post Feed</Link>
          </li>
          <li>
            <Link to="/hook-form">02. React Hook Forms</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
