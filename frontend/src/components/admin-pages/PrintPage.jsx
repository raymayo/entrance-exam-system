import React from "react";
import { useReactToPrint } from "react-to-print";
import PrintOutput from "./PrintOutput";
import Tooltip from "../admin-components/Tooltip";
import { Printer } from "lucide-react";

const PrintPage = ({ student }) => {
  const componentRef = React.useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "AwesomeFileName",
    // onAfterPrint: handleAfterPrint,
    // onBeforePrint: handleBeforePrint,
  });

  console.log(student);
  return (
    <div>
      <Tooltip text="Print" position="top">
        <button
          onClick={printFn}
          className="cursor-pointer rounded-md border border-zinc-300 p-2 shadow-2xs transition-all duration-200 hover:bg-zinc-100"
        >
          <Printer size={16} className="text-zinc-900" />
        </button>
      </Tooltip>

      <div className="hidden">
        <PrintOutput ref={componentRef} student={student} />
      </div>
    </div>
  );
};

export default PrintPage;
