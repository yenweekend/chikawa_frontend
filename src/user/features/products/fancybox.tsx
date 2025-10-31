import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function FancyBoxWrapper(props) {
  const delegate = props.delegate || "[data-fancybox]";
  useEffect(() => {
    const opts = props.options || {};

    Fancybox.bind(delegate, opts);

    return () => {
      Fancybox.close();
    };
  }, [delegate, props.options]);

  return <>{props.children}</>;
}

export default FancyBoxWrapper;
