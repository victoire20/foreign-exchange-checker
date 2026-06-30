import { Content } from "@/components/layout/Content";
import { ConvertWrapper } from "@/components/features/convert-wrapper/ConvertWrapper";
import Details from "@/components/features/details/main";

export default function Home() {
  return (
    <Content>
        <ConvertWrapper />
        <Details />
      <div className="bg-background">
        {/* Header => NavBar and LiveMarkers */}
        {/* Content => ConvertWrapper and Details */}
        <main className="">
          <h1 className="">Page</h1>
          {/* Les symboles se transformeront graphiquement sur votre écran */}
          <pre>
        <code>
          {`const compare = a !== b;
const arrow = () => { return a >= b };`}
        </code>
      </pre>
        </main>
      </div>
    </Content>
  );
}
