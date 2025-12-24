import { useEffect } from "react";

// HOC simple para asignar el título de la página
export const withPageTitle = <P extends object>(
  title: string,
  Component: (props: P) => JSX.Element
) => {
  return function WithPageTitle(props: P) {
    useEffect(() => {
      document.title = title;
    }, []);
    return <Component {...props} />;
  };
};
