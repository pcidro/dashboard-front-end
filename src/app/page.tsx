import HeaderMenu from "@/components/resumo/headerMenu";
import Header from "../components/header";
import SideNav from "../components/sideNav";
import PageResumo from "./resumo/page";

export default function Page() {
  return (
    <div className="container">
      <HeaderMenu />
      <SideNav />
      <main>
        <Header />
        <PageResumo />
      </main>
    </div>
  );
}
