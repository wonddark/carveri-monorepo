import { ComponentExample } from "@/components/component-example";
import { Link } from "react-router";

export function App() {
  return (
    <>
      <ComponentExample />
      <Link to="/test">Go to test page</Link>
    </>
  );
}

export default App;
