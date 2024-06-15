import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Dashboard from "../../ui/dashboard/Dashboard";
import PhotoEditorLeftDashboard from "./left-panel/PhotoEditorLeftDashboard";
import PhotoEditorRightDashboard from "./right-panel/PhotoEditorRightDashboard";
import { fetchRandomImageFromServer } from "./PhotoEditorSlice";

type Props = {};

export default function PhotoEditor({}: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRandomImageFromServer());
  }, []);
  return (
    <div>
      <Dashboard>
        <PhotoEditorLeftDashboard />
        <PhotoEditorRightDashboard />
      </Dashboard>
    </div>
  );
}
