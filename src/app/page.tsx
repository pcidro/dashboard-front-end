import Header from "../components/header";
import SideNav from "../components/sideNav";
import PageResumo from "./resumo/page";

export default function Page() {
  return (
    <div className="container">
      <SideNav />
      <main>
        <Header />
        <PageResumo />
      </main>
    </div>
  );
}
