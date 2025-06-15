import * as ResizablePrimitive from "react-resizable-panels";
declare const ResizablePanelGroup: ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => import("react/jsx-runtime").JSX.Element;
declare const ResizablePanel: import('react').ForwardRefExoticComponent<Omit<import('react').HTMLAttributes<HTMLButtonElement | HTMLElement | HTMLTextAreaElement | HTMLDivElement | HTMLCanvasElement | HTMLSpanElement | HTMLOListElement | HTMLObjectElement | HTMLLinkElement | HTMLFormElement | HTMLSlotElement | HTMLStyleElement | HTMLTitleElement | HTMLDialogElement | HTMLImageElement | HTMLOptionElement | HTMLTableElement | HTMLAudioElement | HTMLAnchorElement | HTMLHeadingElement | HTMLInputElement | HTMLLabelElement | HTMLLIElement | HTMLParagraphElement | HTMLUListElement | HTMLAreaElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLegendElement | HTMLMapElement | HTMLMetaElement | HTMLMeterElement | HTMLOptGroupElement | HTMLOutputElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSourceElement | HTMLTemplateElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTimeElement | HTMLTableRowElement | HTMLTrackElement | HTMLVideoElement | HTMLTableCaptionElement | HTMLMenuElement | HTMLPictureElement>, "id" | "onResize"> & {
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: ResizablePrimitive.PanelOnCollapse | undefined;
    onExpand?: ResizablePrimitive.PanelOnExpand | undefined;
    onResize?: ResizablePrimitive.PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: import('react').ReactNode;
} & import('react').RefAttributes<ResizablePrimitive.ImperativePanelHandle>>;
declare const ResizableHandle: ({ withHandle, className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
//# sourceMappingURL=resizable.d.ts.map