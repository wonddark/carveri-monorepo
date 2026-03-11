import { Link } from "react-router";
import { Button } from "@/components/ui/button.tsx";

const VINS = [
  "1FMCU9GX0DUA27119",
  "JA4J4VA86RZ079851",
  "2HKRS6H76RH219194",
  "2HGFC2F81MH516378",
];

function Home() {
  return (
    <ul className="flex flex-col gap-3">
      {VINS.map((item) => (
        <li key={item}>
          <Link to={`/reports/${item}`}>
            <Button variant="ghost">{item}</Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Home;
