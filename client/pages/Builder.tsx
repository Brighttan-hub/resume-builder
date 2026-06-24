import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Legacy route — redirect to the real multi-step resume builder
export default function Builder() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/create-resume", { replace: true });
  }, [navigate]);
  return null;
}
