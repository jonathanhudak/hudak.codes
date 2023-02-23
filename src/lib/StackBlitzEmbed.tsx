export default (props: { src: string }) => {
  return (
    <div>
      <iframe
        src={props.src}
        style={{
          width: "100%",
          height: "500px",
          border: "0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};
