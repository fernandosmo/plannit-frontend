import NewObra from "./dialogs/NewObra";
import NewMaterial from "./dialogs/NewMaterial";

export default function BodyMenu({ newObraHandle }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
      }}
    >
      <NewMaterial />
      <NewObra />
    </div>
  );
}
