// import { Button } from '@/components/ui/button';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

function App() {
  return (
    <div className="bg-black text-white h-[100dvh] w-full grid grid-rows-2">
      <div>
        <ResizablePanelGroup direction="horizontal" className="h-96">
          <ResizablePanel>One</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Two</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Three</ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div>
        <iframe
          title="output"
          sandbox="alllow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
