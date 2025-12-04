'use client';

import { AgGridReact } from 'ag-grid-react';
import { useEffect, useRef, useState } from 'react';
import {
  ModuleRegistry,
  AllCommunityModule,
  Theme,
  createGrid,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
  colorSchemeDark,
  colorSchemeDarkBlue,
  colorSchemeDarkWarm,
  colorSchemeLightCold,
  colorSchemeLightWarm,
  BodyScrollEvent,
  GridReadyEvent,
  ColDef,
} from 'ag-grid-community';

type LinkRendererProps = {
  value: string;
  data: { url?: string };
};

interface Job {
  title: string;
  category: string;
  location: string;
  posted: Number;
  url: string;
  postedStr: string;
  startStr: string;
  start: Number;
  description: string;
  experience: any;
  remote: Number;
}

export default function DataTable() {
  const [rowData, setRowData] = useState<Job[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [blur, isBlur] = useState<boolean>(false);
  const gridRef = useRef<any>(null);

  ModuleRegistry.registerModules([AllCommunityModule]);

  // 👇 How many rows to show before blur
  const VISIBLE_ROWS = 45;
  // TODO: use useRef()
  let gridApi: GridReadyEvent['api'];

  const onGridReady = (params: GridReadyEvent) => {
    gridApi = params.api;
  };
  // AG-Grid default row height = 25px
  const headerHeight = 40; // default ~38-40
  const rowHeight = 25;
  const visibleHeight = headerHeight + VISIBLE_ROWS * rowHeight;

  useEffect(() => {
    // Example: fetch from a local JSON file or API
    fetch('../../super_combined.json')
      .then((res) => res.json())
      .then((data) => {
        const cleaned = data.map(({ posted, start, ...rest }: Job) => rest);
        setRowData(cleaned);

        const LinkRenderer = ({ value, data }: LinkRendererProps) => {
          // value = title text
          // data.url = the URL field
          if (!value || !data?.url) return value;

          return (
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          );
        };

        const cols = Object.keys(cleaned[0] ?? {}).map((key) => ({
          ...(key != 'url' && {
            headerName: key,
            field: key,
            headerStyle: { color: 'white' },
            ...(key == 'title' && { cellRenderer: LinkRenderer }),
          }),
        }));

        setColumnDefs(cols);
      });
  }, []);

  const handleScroll = (event: BodyScrollEvent) => {
    if (event.direction !== 'vertical') return;

    // event.top is the scrollTop of the grid's body
    const scrollTop = event.top;

    // Example trigger: show blur if scrolled more than 200px
    isBlur(scrollTop > 1200);
    console.log(scrollTop);
  };

  return (
    <>
      <div
        className="relative"
        style={{
          width: '100%',
          maxHeight: visibleHeight,
          overflow: 'hidden',
        }}
      >
        {/* AG GRID */}
        <div
          id="grid"
          style={{
            height: '600px', // true height (grid scrolls internally)
            width: '100%',
          }}
        >
          <AgGridReact
            ref={gridRef}
            theme={themeMaterial.withPart(colorSchemeDarkWarm)}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              resizable: true,
            }}
            onGridReady={onGridReady}
            onBodyScroll={handleScroll}
          />
          {blur && (
            <>
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0"
                style={{
                  height: '100%', // blurred region height
                  backdropFilter: 'blur(8px)',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9))',
                }}
              />

              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center pointer-events-auto">
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg text-sm hover:bg-blue-700 transition"
                  onClick={() => alert('Sign Up clicked!')}
                >
                  Sign Up to Unlock All Rows
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
