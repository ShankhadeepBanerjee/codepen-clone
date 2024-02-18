import { EditorPanel } from './components/editor';
import { CodeProvider } from './components/providers';
import Iframe from './components/Iframe';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui';

function App() {
  return (
    <CodeProvider>
      <div className=" h-[100vh] bg-black w-full">
        <ResizablePanelGroup direction="vertical" className=" grid grid-rows-2">
          <ResizablePanel>
            <EditorPanel />
          </ResizablePanel>
          <ResizableHandle className="h-2" />
          <ResizablePanel>
            <Iframe />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </CodeProvider>
  );
}

export default App;
