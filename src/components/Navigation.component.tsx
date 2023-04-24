import { Link } from "@tanstack/router";

const Navigation = () => {
  return (
    <nav>
      <div className="m-4 text-lg font-bold flex justify-center gap-6 ">
        <Link to="/" activeProps={{ className: "text-cyan-200 underline" }}>
          Home
        </Link>
        <Link
          to="/posts"
          activeProps={{ className: "text-cyan-200 underline" }}
        >
          Post Feed
        </Link>
      </div>
      <hr />
    </nav>
  );
};

export default Navigation;
