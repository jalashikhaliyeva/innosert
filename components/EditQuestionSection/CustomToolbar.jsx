// Define a custom toolbar component
const CustomToolbar = () => (
    <div id="toolbar">
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="sub" />
        <button className="ql-script" value="super" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
      </span>
      <span className="ql-formats">
        <button className="ql-undo">Undo</button>
        <button className="ql-redo">Redo</button>
      </span>
      <span className="ql-formats">
        {/* Custom Delete Image Button */}
        <button className="ql-deleteImage">Delete Image</button>
      </span>
    </div>
  );
  
  export default CustomToolbar;