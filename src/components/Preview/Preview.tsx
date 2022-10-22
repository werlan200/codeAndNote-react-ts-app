import React, { useEffect, useRef } from "react";
import s from "./Preview.module.scss";

interface PreviewProps {
  code: string;
  error: string;
}

const iframeHtml = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;
const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcdoc = iframeHtml;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 30);
  }, [code]);

  return (
    <div className={s.wrapper}>
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={iframeHtml}
      />
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
};

export default Preview;
