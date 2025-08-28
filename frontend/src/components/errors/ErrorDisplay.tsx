
import type { ErrorDisplayProps } from "../../types/ErrorType";
import "./ErrorDisplay.css";

export function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className="error-display">
            <p>{message}</p>
        </div>
    );
}