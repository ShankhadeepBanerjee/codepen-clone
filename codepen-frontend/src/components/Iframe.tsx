import { useCode } from './providers';

// type Props = {
//   srcDoc?: string;
// };

const Iframe = () => {
  const { srcDoc } = useCode();
  return (
    <iframe
      title="output"
      sandbox="allow-scripts" // Corrected the typo here
      width="100%"
      height="100%"
      srcDoc={srcDoc}
    />
  );
};

export default Iframe;
