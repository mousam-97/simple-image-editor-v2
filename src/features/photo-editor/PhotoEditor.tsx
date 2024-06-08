import Dashboard from "../../ui/dashboard/Dashboard";
import PhotoEditorLeftDashboard from "./left-panel/PhotoEditorLeftDashboard";
import PhotoEditorRightDashboard from "./right-panel/PhotoEditorRightDashboard";

type Props = {};

export default function PhotoEditor({}: Props) {
  return (
    <div>
      <Dashboard>
        <PhotoEditorLeftDashboard />
        <PhotoEditorRightDashboard />
      </Dashboard>
    </div>
  );
}
