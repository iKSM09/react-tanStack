import { Link } from "@tanstack/router";

const activeProps = { className: "text-cyan-200 underline" };

const Navigation = () => {
  return (
    <nav>
      <div className="flex justify-center gap-6 m-4 text-lg font-bold ">
        <Link to="/" activeProps={activeProps}>
          Home
        </Link>
        <Link to="/posts" activeProps={activeProps}>
          Post Feed
        </Link>
        <Link to="/hook-form" activeProps={activeProps}>
          Forms
        </Link>
      </div>
      <hr />
    </nav>
  );
};

export default Navigation;
