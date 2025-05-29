import { Link, useMatches } from "@tanstack/react-router";

function Breadcrumbs() {
  const matches = useMatches();

  const breadcrumbItems = matches
    .filter(match => match.loaderData?.crumb)
    .map(({ pathname, loaderData }) => ({
      href: pathname,
      label: loaderData.crumb,
    }));

  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      {breadcrumbItems.map((item, index) => (
        <span key={`${item.href}-${item.label}`} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          <Link to={item.href}>
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export { Breadcrumbs };
