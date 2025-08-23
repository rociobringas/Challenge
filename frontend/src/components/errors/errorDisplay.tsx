import "./ErrorDisplay.css";
import type { ErrorDisplayProps } from "../../types/errorType.ts";

export function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className="error-display">
            <p>{message}</p>
        </div>
    );
}